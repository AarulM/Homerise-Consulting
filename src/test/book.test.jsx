import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderAt } from './utils.jsx'
import Book from '../pages/Book.jsx'

describe('Book page', () => {
  it('shows the host name and the policy note', () => {
    renderAt(<Book />, { route: '/book' })
    expect(screen.getAllByText('Aarul').length).toBeGreaterThan(0)
    expect(screen.getByText(/keep our calendar tight/i)).toBeInTheDocument()
  })

  it('shows the pre-qualifying questions and hides the calendar until qualified', () => {
    renderAt(<Book />, { route: '/book' })
    expect(screen.getByText(/are you a roofing contractor\?/i)).toBeInTheDocument()
    expect(screen.queryByTestId('calendly-embed')).not.toBeInTheDocument()
  })

  it('walks through the qualifier and reveals the Calendly embed', async () => {
    const user = userEvent.setup()
    renderAt(<Book />, { route: '/book' })

    await user.click(screen.getByRole('button', { name: /yes, i'm a roofer/i }))
    await user.click(screen.getByRole('button', { name: /\$1M\+/i }))
    await user.click(screen.getByRole('button', { name: /mainly referrals/i }))
    await user.type(screen.getByPlaceholderText(/your city/i), 'Seattle, WA')
    await user.type(screen.getByPlaceholderText(/your@email\.com/i), 'roofer@example.com')
    await user.click(screen.getByRole('button', { name: /see available times/i }))

    expect(screen.getByTestId('calendly-embed')).toBeInTheDocument()
    expect(screen.getByText(/pick a time below/i)).toBeInTheDocument()
  })

  it('disqualifies contractors under $250K revenue', async () => {
    const user = userEvent.setup()
    renderAt(<Book />, { route: '/book' })

    await user.click(screen.getByRole('button', { name: /yes, i'm a roofer/i }))
    await user.click(screen.getByRole('button', { name: /under \$250k/i }))

    expect(screen.getByText(/not quite there yet/i)).toBeInTheDocument()
    expect(screen.queryByTestId('calendly-embed')).not.toBeInTheDocument()
  })

  it('opens the About Aarul modal and shows the bio, then closes it', async () => {
    const user = userEvent.setup()
    renderAt(<Book />, { route: '/book' })

    // Modal not present initially
    expect(screen.queryByText(/University of Washington/i)).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /about aarul/i }))
    expect(screen.getByText(/University of Washington/i)).toBeInTheDocument()

    // Close via the close button
    await user.click(screen.getByRole('button', { name: /^close$/i }))
    expect(screen.queryByText(/University of Washington/i)).not.toBeInTheDocument()
  })

  it('closes the About modal on Escape', async () => {
    const user = userEvent.setup()
    renderAt(<Book />, { route: '/book' })
    await user.click(screen.getByRole('button', { name: /about aarul/i }))
    expect(screen.getByText(/University of Washington/i)).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByText(/University of Washington/i)).not.toBeInTheDocument()
  })
})
