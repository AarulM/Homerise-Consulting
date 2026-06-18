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

  it('embeds the booking calendar iframe', () => {
    renderAt(<Book />, { route: '/book' })
    const iframe = screen.getByTitle(/book a strategy call/i)
    expect(iframe).toBeInTheDocument()
    expect(iframe.getAttribute('src')).toMatch(/leadconnectorhq\.com\/widget\/booking/)
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
