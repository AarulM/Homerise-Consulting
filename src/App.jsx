import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import BookingPopup from './components/BookingPopup.jsx'
import AiAgent from './components/AiAgent.jsx'
import Home from './pages/Home.jsx'
import Book from './pages/Book.jsx'
import PreCall from './pages/PreCall.jsx'
import Terms from './pages/Terms.jsx'
import Privacy from './pages/Privacy.jsx'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  // Disable browser scroll-restoration so we always control the position
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }))
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<Book />} />
          <Route path="/pre-call" element={<PreCall />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </main>
      <Footer />
      <BookingPopup />
      <AiAgent />
    </div>
  )
}
