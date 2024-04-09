import { Resend } from 'resend'

let resend: Resend | null = null

if (process.env.RESEND_KEY) {
  resend = new Resend(process.env.RESEND_KEY)
}

export default resend
