import { describe, it, expect, vi } from 'vitest'
import { screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderAt } from './utils.jsx'
import BookingPopup from '../components/BookingPopup.jsx'

describe('BookingPopup', () => {
  it('does not render on the /book page', () => {
    renderAt(<BookingPopup />, { route: '/book' })
    expect(screen.queryByRole('dialog', { name: /book a strategy call/i })).not.toBeInTheDocument()
  })

  it('appears (becomes visible) after the delay on a non-book page', () => {
    vi.useFakeTimers()
    try {
      renderAt(<BookingPopup />, { route: '/' })
      const dialog = screen.getByRole('dialog', { name: /book a strategy call/i })
      // Hidden initially until the timer fires
      expect(dialog.className).toContain('opacity-0')
      act(() => {
        vi.advanceTimersByTime(4100)
      })
      expect(dialog.className).toContain('opacity-100')
    } finally {
      vi.runOnlyPendingTimers()
      vi.useRealTimers()
    }
  })

  it('disappears for good once the X is clicked (and would not return on this view)', async () => {
    const user = userEvent.setup()
    renderAt(<BookingPopup />, { route: '/' })
    // The dialog (and its close button) render immediately, just hidden.
    const closeBtn = screen.getByRole('button', { name: /close/i })
    await user.click(closeBtn)
    expect(screen.queryByRole('dialog', { name: /book a strategy call/i })).not.toBeInTheDocument()
  })

  it('the close button has a large (>=40px) hit area for easy tapping', () => {
    renderAt(<BookingPopup />, { route: '/' })
    const closeBtn = screen.getByRole('button', { name: /close/i })
    expect(closeBtn.className).toMatch(/h-10/)
    expect(closeBtn.className).toMatch(/w-10/)
  })

  it('links to /book in its CTA', () => {
    renderAt(<BookingPopup />, { route: '/' })
    expect(screen.getByRole('link', { name: /book a strategy call/i })).toHaveAttribute('href', '/book')
  })

  it('is a bottom-anchored sheet on mobile and top-right on desktop', () => {
    renderAt(<BookingPopup />, { route: '/' })
    const dialog = screen.getByRole('dialog', { name: /book a strategy call/i })
    // mobile: bottom anchored; desktop override to top
    expect(dialog.className).toMatch(/bottom-5/)
    expect(dialog.className).toMatch(/sm:top-24/)
  })
})
