'use server'

import { headers } from 'next/headers'
import { z } from 'zod'

import type { ServiceValue, TopicValue } from '../content/contact'
import { form, serviceOptions, topics } from '../content/contact'
import { getPayloadClient } from '../lib/getPayloadClient'
import { isRateLimited } from '../lib/rateLimit'

const topicValues = topics.map((t) => t.value) as [TopicValue, ...TopicValue[]]
const serviceValues = serviceOptions.map((s) => s.value) as [ServiceValue, ...ServiceValue[]]

const schema = z.object({
  topic: z.enum(topicValues, { message: 'Choose what this is about.' }),
  fullName: z.string().trim().min(1, 'Enter your full name.'),
  company: z.string().trim().optional(),
  email: z
    .string()
    .trim()
    .min(1, 'Enter your email address.')
    .email('Enter a valid email address.'),
  phone: z.string().trim().optional(),
  services: z.array(z.enum(serviceValues)).optional(),
  message: z.string().trim().max(2000, 'Keep this under 2,000 characters.').optional(),
  sourcePage: z.string().trim().optional(),
})

export type EnquiryFieldValues = {
  topic: string
  fullName: string
  company: string
  email: string
  phone: string
  services: string[]
  message: string
}

export type SubmitEnquiryState = {
  status: 'idle' | 'success' | 'invalid' | 'error'
  message?: string
  fieldErrors?: Partial<Record<keyof EnquiryFieldValues, string>>
  values?: EnquiryFieldValues
}

function readValues(formData: FormData): EnquiryFieldValues {
  return {
    topic: String(formData.get('topic') ?? ''),
    fullName: String(formData.get('fullName') ?? ''),
    company: String(formData.get('company') ?? ''),
    email: String(formData.get('email') ?? ''),
    phone: String(formData.get('phone') ?? ''),
    services: formData.getAll('services').map(String),
    message: String(formData.get('message') ?? ''),
  }
}

// /contact-us's form handler (docs/design/contact-us/). Validates with
// zod, checks the honeypot and a simple per-IP rate limit, then saves to
// the Enquiries collection. Only reports success once the save has
// actually happened -- never a faked confirmation.
//
// TODO: no email notification is sent to the team yet. To finish this,
// we need: (1) an email-sending choice (SMTP credentials, or a service
// like Resend/Postmark/SES), and (2) which address should receive new
// enquiries. Once decided, send that email right after the
// payload.create() below succeeds.
export async function submitEnquiry(
  _prevState: SubmitEnquiryState,
  formData: FormData,
): Promise<SubmitEnquiryState> {
  const values = readValues(formData)

  // Honeypot: real visitors never see or fill this field (see
  // ContactForm.tsx for how it's hidden). Anything filling it in is a
  // bot -- pretend success so it doesn't learn to avoid the field, but
  // don't actually save anything.
  const honeypot = String(formData.get('company_website') ?? '')
  if (honeypot) {
    return { status: 'success' }
  }

  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (isRateLimited(ip)) {
    return { status: 'error', message: form.rateLimitedMessage, values }
  }

  const parsed = schema.safeParse({
    topic: values.topic,
    fullName: values.fullName,
    company: values.company || undefined,
    email: values.email,
    phone: values.phone || undefined,
    services: values.services,
    message: values.message || undefined,
    sourcePage: String(formData.get('sourcePage') ?? ''),
  })

  if (!parsed.success) {
    const fieldErrors: SubmitEnquiryState['fieldErrors'] = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof EnquiryFieldValues
      if (!fieldErrors[key]) fieldErrors[key] = issue.message
    }
    return { status: 'invalid', fieldErrors, values }
  }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'enquiries',
      overrideAccess: false,
      data: {
        topic: parsed.data.topic,
        fullName: parsed.data.fullName,
        company: parsed.data.company,
        email: parsed.data.email,
        phone: parsed.data.phone,
        services: parsed.data.services,
        message: parsed.data.message,
        sourcePage: parsed.data.sourcePage,
        status: 'new',
      },
    })
  } catch (err) {
    console.error('Failed to save enquiry:', err)
    return { status: 'error', message: form.errorMessage, values }
  }

  return { status: 'success' }
}
