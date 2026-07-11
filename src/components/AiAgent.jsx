import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Send, Sun, Moon, CalendarCheck2 } from 'lucide-react'
import CalendlyEmbed from './CalendlyEmbed.jsx'
import { confirmBooking } from '../lib/email.js'
import { getStoredTheme, applyTheme } from '../lib/theme.js'

const GEMINI_STREAM_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent'

const SYSTEM_PROMPT = `You are Rise, the AI assistant for HomeRise Consulting (founded by Aarul). Direct, confident, conversational — not salesy or robotic. You genuinely understand the roofing industry. Keep replies to 1-2 sentences. No emojis. The UI renders clickable quick-reply buttons from your quickReplies array — do NOT list options in your text.

Qualification goal: find out (1) are they a roofing contractor, (2) revenue, (3) how they get leads, (4) their market, (5) their email address so we can confirm the booking. Once you have all five and they qualify ($500K+ revenue, roofing contractor), set showBooking: true — the UI then shows a live calendar right here in the chat. Never tell them to visit a URL; the calendar appears in this conversation.

After they book (you'll see a system note saying the booking succeeded), congratulate them briefly and answer any remaining questions.

HomeRise: $3,000/month flat. Done-for-you Facebook ads, lead qualification funnels, Google Ads, SEO, Google Business Profile, AI voice agents, social media. Guarantee: 6–8 booked jobs/month or we work free. No long-term contracts. One contractor per market.

quickReplies rules:
- Include 2–4 short options whenever asking a question with predictable answers
- Revenue options: ["Under $250K","$250K–$500K","$500K–$1M","$1M+"]
- Lead source options: ["Mainly referrals","Running ads already","Door-to-door / events","Not getting enough leads"]
- Yes/no confirmation: ["Yes, I'm a roofer","No, different trade"]
- Empty array [] for open-ended follow-ups, free-text answers, or when asking for their email

showBooking: set true ONLY once user has confirmed roofing + $500K+ revenue + given their email. Once true, keep true in all future replies.`

const RESPONSE_SCHEMA = {
  type: 'OBJECT',
  properties: {
    text: { type: 'STRING' },
    quickReplies: { type: 'ARRAY', items: { type: 'STRING' } },
    showBooking: { type: 'BOOLEAN' },
  },
  required: ['text', 'quickReplies', 'showBooking'],
}

const FIRST_GREETING = {
  role: 'model',
  text: "Hey — I'm Rise, HomeRise's AI assistant. Are you a roofing contractor looking to grow your business?",
  quickReplies: ["Yes, I'm a roofer", 'No, different trade'],
  showBooking: false,
}

const RETURN_GREETING = {
  role: 'model',
  text: 'Welcome back. Still thinking about adding more booked jobs? Happy to pick up where we left off.',
  quickReplies: ["Yes, let's talk", 'Just checking in'],
  showBooking: false,
}

export const VISITED_KEY = 'homerise_visited'
const MESSAGES_KEY = 'homerise_chat_messages'
const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/

function now() {
  return Date.now()
}

function formatTime(ts) {
  if (!ts) return ''
  return new Date(ts).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

function getInitialMessages() {
  try {
    const stored = JSON.parse(localStorage.getItem(MESSAGES_KEY) || 'null')
    if (Array.isArray(stored) && stored.length > 0) return stored
  } catch {}
  const greeting = localStorage.getItem(VISITED_KEY) ? RETURN_GREETING : FIRST_GREETING
  return [{ ...greeting, ts: now() }]
}

/**
 * Pull the partial value of the "text" field out of an incomplete JSON
 * string so streamed structured output can render word by word.
 */
function extractPartialText(raw) {
  const m = raw.match(/"text"\s*:\s*"/)
  if (!m) return ''
  let out = ''
  for (let i = m.index + m[0].length; i < raw.length; i++) {
    const c = raw[i]
    if (c === '\\') {
      const n = raw[i + 1]
      if (n === undefined) break
      if (n === 'n') out += '\n'
      else if (n === 't') out += '\t'
      else if (n === 'u') {
        const hex = raw.slice(i + 2, i + 6)
        if (hex.length < 4) break
        out += String.fromCharCode(parseInt(hex, 16))
        i += 4
      } else out += n
      i++
    } else if (c === '"') {
      break
    } else {
      out += c
    }
  }
  return out
}

/** Soft two-tone pop via WebAudio — no asset needed */
function playReceiveSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.setValueAtTime(660, ctx.currentTime)
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.08)
    gain.gain.setValueAtTime(0.06, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22)
    osc.start()
    osc.stop(ctx.currentTime + 0.24)
    osc.onended = () => ctx.close()
  } catch {}
}

export default function AiAgent() {
  const isReturning = !!localStorage.getItem(VISITED_KEY)

  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(getInitialMessages)
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [streamText, setStreamText] = useState('')
  const [showBubble, setShowBubble] = useState(false)
  const [theme, setTheme] = useState(getStoredTheme)
  const scrollRef = useRef(null)
  const bookedRef = useRef(false)

  useEffect(() => {
    localStorage.setItem(VISITED_KEY, '1')
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setShowBubble(true), 4500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    document.body.dataset.chatOpen = open ? 'true' : 'false'
    if (open) setShowBubble(false)
    return () => {
      delete document.body.dataset.chatOpen
    }
  }, [open])

  useEffect(() => {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages))
  }, [messages])

  function toggleTheme() {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      applyTheme(next)
      return next
    })
  }

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, sending, streamText, open])

  const lastMsg = messages[messages.length - 1]
  const activeQuickReplies =
    !sending && lastMsg?.role === 'model' && lastMsg?.quickReplies?.length
      ? lastMsg.quickReplies
      : []

  function userEmail() {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role !== 'user') continue
      const m = messages[i].text?.match(EMAIL_RE)
      if (m) return m[0]
    }
    return ''
  }

  async function sendText(text, { hidden = false } = {}) {
    const trimmed = text.trim()
    if (!trimmed || sending) return

    const apiHistory = messages
      .filter((m) => m.role === 'model' || m.role === 'user')
      .concat({ role: 'user', text: trimmed })

    if (!hidden) {
      setMessages((prev) => [...prev, { role: 'user', text: trimmed, ts: now() }])
    }
    setInput('')
    setSending(true)
    setStreamText('')

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY
      const res = await fetch(`${GEMINI_STREAM_URL}?alt=sse&key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: apiHistory.map((m) => ({
            role: m.role === 'model' ? 'model' : 'user',
            parts: [{ text: m.text }],
          })),
          generationConfig: {
            responseMimeType: 'application/json',
            responseSchema: RESPONSE_SCHEMA,
          },
        }),
      })

      if (!res.ok || !res.body) throw new Error(`${res.status}`)

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let raw = ''
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''
        for (const line of lines) {
          if (!line.startsWith('data:')) continue
          const data = line.slice(5).trim()
          if (!data || data === '[DONE]') continue
          try {
            const chunk = JSON.parse(data)
            const part = chunk?.candidates?.[0]?.content?.parts
              ?.map((p) => p.text)
              .join('')
            if (part) {
              raw += part
              setStreamText(extractPartialText(raw))
            }
          } catch {}
        }
      }

      let parsed
      try {
        parsed = JSON.parse(raw)
      } catch {
        parsed = { text: extractPartialText(raw) }
      }

      const botMsg = {
        role: 'model',
        text: parsed.text || 'Let me know more about your business — what market are you in?',
        quickReplies: Array.isArray(parsed.quickReplies) ? parsed.quickReplies : [],
        showBooking: !!parsed.showBooking,
        ts: now(),
      }

      setMessages((prev) => {
        const hasCalendar = prev.some((m) => m.role === 'calendly')
        const next = [...prev, botMsg]
        if (botMsg.showBooking && !hasCalendar && !bookedRef.current) {
          next.push({ role: 'calendly', ts: now() })
        }
        return next
      })
      playReceiveSound()
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: 'Having a connection issue — what market are you based in?',
          quickReplies: [],
          showBooking: false,
          ts: now(),
        },
      ])
    } finally {
      setSending(false)
      setStreamText('')
    }
  }

  async function handleScheduled() {
    if (bookedRef.current) return
    bookedRef.current = true
    const email = userEmail()
    const bookedAtTs = now()

    // Swap the calendar for a confirmation card
    setMessages((prev) =>
      prev
        .filter((m) => m.role !== 'calendly')
        .concat({ role: 'confirmation', email, ts: bookedAtTs }),
    )

    if (email) {
      confirmBooking(email, 'chat').catch(() => {})
    }

    // Let the agent know so it can congratulate + keep helping
    sendText(
      'SYSTEM NOTE: The user just successfully booked their strategy call through the calendar. Confirm it briefly and ask if they have any other questions.',
      { hidden: true },
    )
  }

  function onKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendText(input)
    }
  }

  const bubbleText = isReturning ? 'Welcome back — still interested?' : "Curious if we're a fit for you?"

  return (
    <>
      {/* Bubble notification */}
      <AnimatePresence>
        {showBubble && !open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-5 z-[60] flex flex-col items-end gap-1"
          >
            <div className="relative rounded-2xl bg-void px-4 py-3 shadow-card-hover" style={{ maxWidth: '220px' }}>
              <p className="text-sm font-semibold leading-snug text-white">{bubbleText}</p>
              <p className="mt-0.5 text-[11px] text-white/55">Tap to chat — takes 2 min</p>
              <span
                className="absolute -bottom-2.5 right-5"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderTop: '10px solid #09090B',
                }}
              />
              <button
                type="button"
                onClick={() => setShowBubble(false)}
                aria-label="Dismiss"
                className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-void text-white/70 shadow-card ring-2 ring-white hover:text-white"
              >
                <X className="h-3 w-3" strokeWidth={3} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Chat with Rise, HomeRise AI"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className={`fixed bottom-5 right-5 z-[60] flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-electric shadow-card-hover ring-[3px] ring-white transition-opacity duration-300 ${
          open ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <img src="/chat-icon.png" alt="" className="h-full w-full object-cover" />
      </motion.button>

      {/* Right-side panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Chat with Rise, HomeRise AI"
            initial={{ x: '110%' }}
            animate={{ x: 0 }}
            exit={{ x: '110%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full flex-col overflow-hidden border-l border-white/10 bg-paper shadow-card-hover sm:w-[440px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-void px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-full bg-electric">
                  <img src="/chat-icon.png" alt="" className="h-full w-full object-cover" />
                </div>
                <div className="leading-tight text-white">
                  <p className="text-sm font-bold tracking-tight">Rise — HomeRise AI</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Transcript */}
            <div ref={scrollRef} className="flex flex-1 flex-col gap-3 overflow-y-auto bg-subtle px-4 py-4">
              {messages.map((m, i) => {
                if (m.role === 'calendly') {
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="overflow-hidden rounded-2xl border border-navy/10 bg-surface shadow-card"
                    >
                      <div className="bg-void px-4 py-3">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-electric">
                          Pick your time
                        </p>
                        <p className="mt-0.5 text-sm font-bold text-white">
                          Book your free strategy call — right here
                        </p>
                      </div>
                      <CalendlyEmbed email={userEmail()} height={440} onScheduled={handleScheduled} />
                    </motion.div>
                  )
                }

                if (m.role === 'confirmation') {
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                      className="overflow-hidden rounded-2xl border border-green-500/25 bg-surface shadow-card"
                    >
                      <div className="flex items-center gap-3 bg-green-500/10 px-4 py-3">
                        <CalendarCheck2 className="h-5 w-5 flex-none text-green-600" />
                        <p className="text-sm font-bold text-heading">You're booked!</p>
                      </div>
                      <div className="px-4 py-3 text-xs leading-relaxed text-ink/70">
                        <p>
                          Your 30-minute strategy call is confirmed. A calendar invite
                          {m.email ? ` and confirmation email are on their way to ${m.email}` : ' is on its way to your inbox'}
                          .
                        </p>
                        <p className="mt-1.5 text-ink/50">Booked {formatTime(m.ts)}</p>
                      </div>
                    </motion.div>
                  )
                }

                if (m.role !== 'user' && m.role !== 'model') return null

                return (
                  <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`flex items-end gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      {m.role === 'model' && (
                        <div className="mb-0.5 flex h-6 w-6 flex-none items-center justify-center overflow-hidden rounded-full bg-electric shadow-card">
                          <img src="/chat-icon.png" alt="" className="h-full w-full object-cover" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                          m.role === 'user'
                            ? 'rounded-br-sm bg-electric text-white'
                            : 'rounded-bl-sm bg-surface text-ink shadow-card'
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                    {m.ts && (
                      <span className={`mt-1 text-[10px] text-ink/35 ${m.role === 'user' ? 'mr-1' : 'ml-9'}`}>
                        {formatTime(m.ts)}
                      </span>
                    )}
                  </div>
                )
              })}

              {/* Streaming text / typing dots */}
              {sending && (
                <div className="flex items-end gap-2">
                  <div className="mb-0.5 flex h-6 w-6 flex-none items-center justify-center overflow-hidden rounded-full bg-electric shadow-card">
                    <img src="/chat-icon.png" alt="" className="h-full w-full object-cover" />
                  </div>
                  {streamText ? (
                    <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-surface px-3.5 py-2.5 text-sm leading-relaxed text-ink shadow-card">
                      {streamText}
                      <span className="animate-blink ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 bg-electric" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-surface px-4 py-3 shadow-card">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-ink/40 [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-ink/40 [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-ink/40" />
                    </div>
                  )}
                </div>
              )}

              {/* Quick replies */}
              {activeQuickReplies.length > 0 && (
                <div className="flex flex-wrap gap-2 pl-8">
                  {activeQuickReplies.map((qr, i) => (
                    <motion.button
                      key={i}
                      type="button"
                      onClick={() => sendText(qr)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-full border border-navy/20 bg-surface px-3.5 py-1.5 text-xs font-semibold text-heading shadow-card transition-colors hover:border-electric hover:bg-electric hover:text-white"
                    >
                      {qr}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Composer */}
            <div className="flex items-end gap-2 border-t border-navy/10 bg-surface p-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                rows={1}
                placeholder="Message Rise…"
                aria-label="Message"
                className="max-h-28 flex-1 resize-none rounded-xl border border-navy/15 bg-subtle px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-electric"
              />
              <button
                type="button"
                onClick={() => sendText(input)}
                disabled={sending || !input.trim()}
                aria-label="Send"
                className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-electric text-white transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
