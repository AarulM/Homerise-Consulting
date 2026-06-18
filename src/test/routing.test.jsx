import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { Routes, Route } from 'react-router-dom'
import { renderAt } from './utils.jsx'
import Home from '../pages/Home.jsx'
import Book from '../pages/Book.jsx'
import PreCall from '../pages/PreCall.jsx'
import Terms from '../pages/Terms.jsx'
import Privacy from '../pages/Privacy.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book" element={<Book />} />
      <Route path="/pre-call" element={<PreCall />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
    </Routes>
  )
}

describe('routing', () => {
  it('renders the Home hero headline at /', () => {
    renderAt(<AppRoutes />, { route: '/' })
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/more booked roofing jobs/i)
  })

  it('renders the Book page at /book', () => {
    renderAt(<AppRoutes />, { route: '/book' })
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/book your free strategy call/i)
  })

  it('renders the Pre-Call page at /pre-call', () => {
    renderAt(<AppRoutes />, { route: '/pre-call' })
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/watch this before our call/i)
  })

  it('renders Terms at /terms', () => {
    renderAt(<AppRoutes />, { route: '/terms' })
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/terms of service/i)
  })

  it('renders Privacy at /privacy', () => {
    renderAt(<AppRoutes />, { route: '/privacy' })
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/privacy policy/i)
  })
})
