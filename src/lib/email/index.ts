import { getResendClient } from './client'

export type SendEmailParams = {
  to: string
  subject: string
  html: string
  text?: string
}

export type SendEmailResult = {
  success: boolean
  id?: string
  error?: string
}

export async function sendEmail(
  params: SendEmailParams
): Promise<SendEmailResult> {
  const client = getResendClient()
  const from = process.env.RESEND_FROM_EMAIL

  if (!client || !from) {
    console.error('[email] Missing RESEND_API_KEY or RESEND_FROM_EMAIL')
    return { success: false, error: 'Email service not configured' }
  }

  try {
    const { data, error } = await client.emails.send({
      from,
      to: params.to,
      subject: params.subject,
      html: params.html,
      text: params.text,
    })

    if (error) {
      console.error('[email] Send failed:', error.message)
      return { success: false, error: error.message }
    }

    return { success: true, id: data?.id }
  } catch (err) {
    console.error('[email] Unexpected error:', err)
    return { success: false, error: 'Failed to send email' }
  }
}

export async function sendWelcomeEmail(
  to: string,
  handle: string
): Promise<SendEmailResult> {
  const appName = 'Bookmarks App'

  return sendEmail({
    to,
    subject: `Welcome to ${appName}`,
    html: `
      <h1>Welcome, @${handle}!</h1>
      <p>Thanks for signing up for ${appName}.</p>
      <p>You can start saving bookmarks from your dashboard, and share public ones on your profile page.</p>
    `,
    text: `Welcome, @${handle}! Thanks for signing up for ${appName}. You can start saving bookmarks from your dashboard, and share public ones on your profile page.`,
  })
}
