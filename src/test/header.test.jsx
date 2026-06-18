import { describe, it, expect } from 'vitest'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderAt } from './utils.jsx'
import Header from '../components/Header.jsx'

describe('Header', () => {
  it('shows the brand and all nav links', () => {
    renderAt(<Header />)
    expect(screen.getAllByText(/homerise/i).length).toBeGreaterThan(0)
    for (const label of ['How it Works', 'Services', 'Results', 'FAQ']) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    }
  })

  it('has a primary "Book a Strategy Call" CTA pointing to /book', () => {
    renderAt(<Header />)
    const ctas = screen.getAllByRole('link', { name: /book a strategy call/i })
    expect(ctas.length).toBeGreaterThan(0)
    expect(ctas[0]).toHaveAttribute('href', '/book')
  })

  it('opens and closes the mobile menu', async () => {
    const user = userEvent.setup()
    renderAt(<Header />)
    const toggle = screen.getByRole('button', { name: /toggle menu/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
  })
})
