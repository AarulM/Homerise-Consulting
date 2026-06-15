import { useEffect, useState } from 'react'

const WORDS = [
  'Consulting',
  'Digital Ads',
  'Lead Generation',
  'AI Automation',
  'Booked Appointments',
  'Growth',
]

export default function Typewriter({ className = '' }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const full = WORDS[index]
    const atFull = !deleting && text === full
    const atEmpty = deleting && text === ''

    let delay = deleting ? 45 : 90
    if (atFull) delay = 1500 // pause on the complete word
    if (atEmpty) delay = 300 // pause before next word

    const t = setTimeout(() => {
      if (atFull) {
        setDeleting(true)
        return
      }
      if (atEmpty) {
        setDeleting(false)
        setIndex((i) => (i + 1) % WORDS.length)
        return
      }
      setText((cur) => (deleting ? full.slice(0, cur.length - 1) : full.slice(0, cur.length + 1)))
    }, delay)

    return () => clearTimeout(t)
  }, [text, deleting, index])

  return (
    <span className={className} aria-live="polite">
      <span>{text}</span>
      <span className="animate-blink ml-px font-normal">|</span>
    </span>
  )
}
