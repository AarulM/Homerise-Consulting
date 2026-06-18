import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
})

// jsdom doesn't implement IntersectionObserver — the Reveal/Counter components use it.
class IO {
  constructor(cb) {
    this.cb = cb
  }
  observe(el) {
    // Immediately report the element as visible so revealed content renders in tests.
    this.cb([{ isIntersecting: true, target: el }])
  }
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal('IntersectionObserver', IO)

// jsdom doesn't implement scrollTo / scrollIntoView
window.scrollTo = vi.fn()
Element.prototype.scrollIntoView = vi.fn()

// matchMedia (used by some libs / safe to stub)
window.matchMedia =
  window.matchMedia ||
  function () {
    return { matches: false, addListener: vi.fn(), removeListener: vi.fn(), addEventListener: vi.fn(), removeEventListener: vi.fn() }
  }
