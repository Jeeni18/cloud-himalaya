'use client'

import { useActionState, useEffect, useId, useRef } from 'react'

import { submitEnquiry } from '../../actions/submitEnquiry'
import type { SubmitEnquiryState, EnquiryFieldValues } from '../../actions/submitEnquiry'
import { form, serviceOptions, topics } from '../../content/contact'
import type { ServiceValue, TopicValue } from '../../content/contact'

type ContactFormProps = {
  initialTopic: TopicValue
  initialServices: ServiceValue[]
  initialMessage: string
  sourcePage: string
}

// The form, part of section 2 of /contact-us (docs/design/contact-us/).
// Topic and services are real radio/checkbox inputs, visually hidden
// (not display:none, so they stay in the tab order and screen-reader
// list) with the pill look applied to their <label>, driven by
// peer-checked -- text color is set explicitly for both the checked and
// unchecked state, since leaving one to inherit was the bug on the
// Services page this task's spec calls out.
export function ContactForm({
  initialTopic,
  initialServices,
  initialMessage,
  sourcePage,
}: ContactFormProps) {
  const [state, formAction, isPending] = useActionState<SubmitEnquiryState, FormData>(
    submitEnquiry,
    {
      status: 'idle',
      values: {
        topic: initialTopic,
        fullName: '',
        company: '',
        email: '',
        phone: '',
        services: initialServices,
        message: initialMessage,
      },
    },
  )
  const baseId = useId()
  const fieldRefs = useRef<Partial<Record<keyof EnquiryFieldValues, HTMLElement | null>>>({})

  useEffect(() => {
    if (!state.fieldErrors) return
    const firstErrorKey = Object.keys(state.fieldErrors)[0] as keyof EnquiryFieldValues | undefined
    if (firstErrorKey) fieldRefs.current[firstErrorKey]?.focus()
  }, [state.fieldErrors])

  const values = state.values ?? {
    topic: initialTopic,
    fullName: '',
    company: '',
    email: '',
    phone: '',
    services: initialServices,
    message: initialMessage,
  }

  if (state.status === 'success') {
    return (
      <div className="rounded-2xl border border-content-card-border bg-content-card-bg p-8 text-center">
        <p className="text-lg font-semibold text-content-head">{form.successMessage(4)}</p>
      </div>
    )
  }

  return (
    <form
      action={formAction}
      className="rounded-2xl border border-content-card-border bg-content-card-bg p-6 sm:p-8"
      noValidate
    >
      {/* Honeypot: hidden from real visitors (off-screen, not display:none,
          so it's still reachable by naive bots that ignore CSS), never
          filled in by a human. See submitEnquiry.ts for the check. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${baseId}-company-website`}>Company Website</label>
        <input
          autoComplete="off"
          id={`${baseId}-company-website`}
          name="company_website"
          tabIndex={-1}
          type="text"
        />
      </div>

      <input name="sourcePage" type="hidden" value={sourcePage} />

      <fieldset>
        <legend className="text-sm font-medium text-content-label">{form.topicLabel}</legend>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {topics.map((topic) => {
            const inputId = `${baseId}-topic-${topic.value}`
            return (
              <div key={topic.value}>
                <input
                  className="peer sr-only"
                  defaultChecked={values.topic === topic.value}
                  id={inputId}
                  name="topic"
                  ref={(el) => {
                    if (topic.value === values.topic) fieldRefs.current.topic = el
                  }}
                  type="radio"
                  value={topic.value}
                />
                <label
                  className="flex min-h-11 cursor-pointer items-center rounded-full border border-content-card-border bg-section-insights-card px-4 text-[15px] font-medium text-content-head peer-checked:border-transparent peer-checked:bg-content-selected-bg peer-checked:text-content-selected-text peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2"
                  htmlFor={inputId}
                >
                  {topic.label}
                </label>
              </div>
            )
          })}
        </div>
        {state.fieldErrors?.topic && (
          <p className="mt-1.5 text-sm text-contact-down-text">{state.fieldErrors.topic}</p>
        )}
      </fieldset>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          error={state.fieldErrors?.fullName}
          fieldRef={(el) => {
            fieldRefs.current.fullName = el
          }}
          id={`${baseId}-fullName`}
          label={form.fullNameLabel}
          name="fullName"
          placeholder="Your name"
          required
        >
          {(props) => <input {...props} defaultValue={values.fullName} type="text" />}
        </Field>

        <Field
          id={`${baseId}-company`}
          label={form.companyLabel}
          name="company"
          placeholder="Company name"
        >
          {(props) => <input {...props} defaultValue={values.company} type="text" />}
        </Field>

        <Field
          error={state.fieldErrors?.email}
          fieldRef={(el) => {
            fieldRefs.current.email = el
          }}
          id={`${baseId}-email`}
          label={form.emailLabel}
          name="email"
          placeholder="you@company.com"
          required
        >
          {(props) => <input {...props} defaultValue={values.email} type="email" />}
        </Field>

        <Field
          id={`${baseId}-phone`}
          label={form.phoneLabel}
          name="phone"
          placeholder={form.phonePlaceholder}
        >
          {(props) => <input {...props} defaultValue={values.phone} type="tel" />}
        </Field>
      </div>

      <fieldset className="mt-5">
        <legend className="text-sm font-medium text-content-label">{form.servicesLabel}</legend>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {serviceOptions.map((service) => {
            const inputId = `${baseId}-service-${service.value}`
            return (
              <div key={service.value}>
                <input
                  className="peer sr-only"
                  defaultChecked={values.services.includes(service.value)}
                  id={inputId}
                  name="services"
                  type="checkbox"
                  value={service.value}
                />
                <label
                  className="flex min-h-11 cursor-pointer items-center rounded-full border border-content-card-border bg-section-insights-card px-3.5 text-sm font-medium text-content-head peer-checked:border-transparent peer-checked:bg-content-selected-bg peer-checked:text-content-selected-text peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2"
                  htmlFor={inputId}
                >
                  {service.label}
                </label>
              </div>
            )
          })}
        </div>
      </fieldset>

      <div className="mt-5">
        <label className="text-sm font-medium text-content-label" htmlFor={`${baseId}-message`}>
          {form.messageLabel}
        </label>
        <textarea
          className="mt-2 min-h-[110px] w-full rounded-lg border border-content-card-border bg-contact-input-bg px-4 py-3 text-[16px] text-content-head placeholder:text-content-label"
          defaultValue={values.message}
          id={`${baseId}-message`}
          maxLength={2000}
          name="message"
          placeholder={form.messagePlaceholder}
        />
        {state.fieldErrors?.message && (
          <p className="mt-1.5 text-sm text-contact-down-text">{state.fieldErrors.message}</p>
        )}
      </div>

      {state.status === 'error' && (
        <p aria-live="polite" className="mt-4 text-sm text-contact-down-text" role="alert">
          {state.message}
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-5">
        <p className="text-[13px] text-content-secondary">
          {form.privacyText}{' '}
          <a className="underline" href={form.privacyHref}>
            {form.privacyLinkLabel}
          </a>
          .
        </p>
        <button
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-content-selected-bg px-6 text-[15px] font-semibold text-content-selected-text hover:opacity-90 disabled:opacity-60"
          disabled={isPending}
          type="submit"
        >
          {form.submitLabel} <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  )
}

type FieldProps = {
  id: string
  name: string
  label: string
  placeholder?: string
  required?: boolean
  error?: string
  fieldRef?: (el: HTMLInputElement | null) => void
  children: (props: {
    id: string
    name: string
    placeholder: string | undefined
    required: boolean | undefined
    className: string
    'aria-invalid': boolean | undefined
    'aria-describedby': string | undefined
    ref: (el: HTMLInputElement | null) => void
  }) => React.ReactNode
}

function Field({ id, name, label, placeholder, required, error, fieldRef, children }: FieldProps) {
  const errorId = `${id}-error`
  return (
    <div>
      <label className="text-sm font-medium text-content-label" htmlFor={id}>
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <div className="mt-2">
        {children({
          id,
          name,
          placeholder,
          required,
          className:
            'min-h-11 w-full rounded-lg border border-content-card-border bg-contact-input-bg px-4 text-[16px] text-content-head placeholder:text-content-label',
          'aria-invalid': error ? true : undefined,
          'aria-describedby': error ? errorId : undefined,
          ref: fieldRef ?? (() => {}),
        })}
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-contact-down-text" id={errorId}>
          {error}
        </p>
      )}
    </div>
  )
}
