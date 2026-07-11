import { useEffect, useRef } from 'react'

export const CALENDLY_URL = 'https://calendly.com/homeriseconsulting/30min'
const SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js'

let scriptPromise = null

function loadCalendlyScript() {
  if (window.Calendly) return Promise.resolve()
  if (scriptPromise) return scriptPromise
  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`)
    if (existing) {
      existing.addEventListener('load', resolve)
      existing.addEventListener('error', reject)
      return
    }
    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.onload = resolve
    script.onerror = reject
    document.body.appendChild(script)
  })
  return scriptPromise
}

/**
 * Inline Calendly widget.
 * Fires onScheduled(payload) when Calendly posts calendly.event_scheduled.
 */
export default function CalendlyEmbed({
  email = '',
  customAnswers = null,
  height = 700,
  onScheduled,
  className = '',
}) {
  const containerRef = useRef(null)
  const onScheduledRef = useRef(onScheduled)
  onScheduledRef.current = onScheduled
  // Serialize so the effect only re-runs when the answers actually change
  const answersKey = customAnswers ? JSON.stringify(customAnswers) : ''

  useEffect(() => {
    let cancelled = false
    const el = containerRef.current

    loadCalendlyScript()
      .then(() => {
        if (cancelled || !el || !window.Calendly) return
        el.innerHTML = ''
        window.Calendly.initInlineWidget({
          url: `${CALENDLY_URL}?hide_gdpr_banner=1&primary_color=2563eb`,
          parentElement: el,
          prefill: {
            email,
            ...(answersKey ? { customAnswers: JSON.parse(answersKey) } : {}),
          },
        })
      })
      .catch(() => {})

    return () => {
      cancelled = true
      if (el) el.innerHTML = ''
    }
  }, [email, answersKey])

  useEffect(() => {
    function onMessage(e) {
      if (e.origin !== 'https://calendly.com') return
      if (e.data?.event === 'calendly.event_scheduled') {
        onScheduledRef.current?.(e.data.payload)
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return (
    <div
      ref={containerRef}
      data-testid="calendly-embed"
      className={className}
      style={{ minWidth: '300px', height, width: '100%' }}
    />
  )
}
