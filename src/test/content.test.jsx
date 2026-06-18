import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderAt } from './utils.jsx'
import Home from '../pages/Home.jsx'
import Terms from '../pages/Terms.jsx'
import Privacy from '../pages/Privacy.jsx'
import Typewriter from '../components/Typewriter.jsx'

describe('Home content & conversion elements', () => {
  it('states the price and the core offer', () => {
    renderAt(<Home />)
    expect(screen.getAllByText(/\$3,000/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/guarantee/i).length).toBeGreaterThan(0)
  })

  it('has section titles for each navbar-linked section', () => {
    renderAt(<Home />)
    expect(screen.getByText('How It Works')).toBeInTheDocument()
    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('Pricing')).toBeInTheDocument()
    expect(screen.getByText('FAQ')).toBeInTheDocument()
  })

  it('shows the stacked risk-reversal guarantees (replaces social proof)', () => {
    renderAt(<Home />)
    expect(screen.getByText(/risk-free/i)).toBeInTheDocument()
    expect(screen.getByText('You own your ad account')).toBeInTheDocument()
    expect(screen.getByText('No long-term contract')).toBeInTheDocument()
    expect(screen.getByText('Cancel anytime')).toBeInTheDocument()
  })

  it('shows a founder/trust section (authenticity over testimonials)', () => {
    renderAt(<Home />)
    expect(screen.getByText(/who you're working with/i)).toBeInTheDocument()
    expect(screen.getByText(/founder-led/i)).toBeInTheDocument()
    expect(screen.getByText(/You work directly with the founder/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /book a call with aarul/i })).toHaveAttribute('href', '/book')
  })

  it('has at least one Book CTA on the home page', () => {
    renderAt(<Home />)
    const ctas = screen.getAllByRole('link', { name: /book a strategy call/i })
    expect(ctas.length).toBeGreaterThan(0)
    ctas.forEach((c) => expect(c).toHaveAttribute('href', '/book'))
  })

  it('FAQ items expand on click', async () => {
    const { default: userEvent } = await import('@testing-library/user-event')
    const user = userEvent.setup()
    renderAt(<Home />)
    const faqButton = screen.getByRole('button', { name: /burned by marketing agencies/i })
    expect(faqButton).toHaveAttribute('aria-expanded', 'true') // first one open by default
    await user.click(faqButton)
    expect(faqButton).toHaveAttribute('aria-expanded', 'false')
  })
})

describe('Typewriter', () => {
  it('renders the cursor and is accessible (aria-live)', () => {
    const { container } = renderAt(<Typewriter />)
    expect(container.querySelector('[aria-live="polite"]')).toBeInTheDocument()
    expect(screen.getByText('|')).toBeInTheDocument()
  })
})

describe('Legal pages', () => {
  it('Terms shows the gmail contact', () => {
    renderAt(<Terms />)
    const link = screen.getByRole('link', { name: /homeriseconsulting@gmail\.com/i })
    expect(link).toHaveAttribute('href', 'mailto:homeriseconsulting@gmail.com')
  })

  it('Privacy shows the gmail contact', () => {
    renderAt(<Privacy />)
    const link = screen.getByRole('link', { name: /homeriseconsulting@gmail\.com/i })
    expect(link).toHaveAttribute('href', 'mailto:homeriseconsulting@gmail.com')
  })
})
