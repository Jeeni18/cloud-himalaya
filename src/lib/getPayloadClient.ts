import { getPayload } from 'payload'

import config from '../payload.config'

// Shared by every server component/route that needs the Payload Local API,
// so the config-resolution boilerplate isn't repeated at each call site.
export async function getPayloadClient() {
  const payloadConfig = await config
  return getPayload({ config: payloadConfig })
}
