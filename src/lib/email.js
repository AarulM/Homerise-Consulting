import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export const BOOKING_KEY = 'homerise_booking'

const HOUR = 60 * 60 * 1000
const DAY = 24 * HOUR

export function sendEmail(toEmail, message) {
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    { to_email: toEmail, email: toEmail, message },
    { publicKey: PUBLIC_KEY },
  )
}

export function getBooking() {
  try {
    return JSON.parse(localStorage.getItem(BOOKING_KEY) || 'null')
  } catch {
    return null
  }
}

export function saveBooking(booking) {
  localStorage.setItem(BOOKING_KEY, JSON.stringify(booking))
}

export function clearBooking() {
  localStorage.removeItem(BOOKING_KEY)
}

/**
 * Store a confirmed Calendly booking and fire the confirmation email.
 * Calendly's postMessage doesn't expose the call's date/time (that needs
 * their API), so reminder timing keys off `bookedAt`.
 */
export async function confirmBooking(email, source = 'book_page') {
  const booking = {
    email,
    source,
    bookedAt: Date.now(),
    confirmationSent: false,
    reminder24Sent: false,
    reminder1Sent: false,
  }
  saveBooking(booking)

  const message = `Your strategy call with HomeRise Consulting is confirmed — check your inbox for the Calendly invite with the exact time and meeting link.

What to expect: 30 minutes, no pitch, just a clear plan for 6–8 more booked roofing jobs a month.

Questions before the call? Just reply to this email or visit homeriseconsulting.com.`

  try {
    await sendEmail(email, message)
    saveBooking({ ...booking, confirmationSent: true })
  } catch {
    // Booking is still stored; confirmation retries on next page load
  }
  return booking
}

/**
 * Called on page load — sends the 24h and 1h reminders when due.
 * Timing is relative to when the booking was made (see confirmBooking).
 */
export async function runReminderChecks() {
  const booking = getBooking()
  if (!booking?.email) return

  let updated = { ...booking }
  let dirty = false
  const elapsed = Date.now() - booking.bookedAt

  if (!updated.confirmationSent) {
    try {
      await sendEmail(
        updated.email,
        'Your strategy call with HomeRise Consulting is confirmed — check your inbox for the Calendly invite with the exact time and meeting link.',
      )
      updated.confirmationSent = true
      dirty = true
    } catch {}
  }

  if (!updated.reminder24Sent && elapsed >= DAY) {
    try {
      await sendEmail(
        updated.email,
        "Reminder: your strategy call with HomeRise Consulting is coming up. We're looking forward to mapping out a plan for 6–8 more booked jobs a month. See you soon.",
      )
      updated.reminder24Sent = true
      dirty = true
    } catch {}
  }

  if (!updated.reminder1Sent && elapsed >= DAY + 23 * HOUR) {
    try {
      await sendEmail(
        updated.email,
        'Your strategy call with HomeRise Consulting is almost here. Grab your notes on where your leads come from today — see you on the call.',
      )
      updated.reminder1Sent = true
      dirty = true
    } catch {}
  }

  if (dirty) saveBooking(updated)
}
