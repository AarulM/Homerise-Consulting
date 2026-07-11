import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// Node 22+ exposes its own (flag-gated, broken here) localStorage global that
// can shadow jsdom's. Stub a real in-memory implementation for determinism.
class MemoryStorage {
  #store = new Map()
  getItem(k) {
    return this.#store.has(String(k)) ? this.#store.get(String(k)) : null
  }
  setItem(k, v) {
    this.#store.set(String(k), String(v))
  }
  removeItem(k) {
    this.#store.delete(String(k))
  }
  clear() {
    this.#store.clear()
  }
  key(i) {
    return [...this.#store.keys()][i] ?? null
  }
  get length() {
    return this.#store.size
  }
}
vi.stubGlobal('localStorage', new MemoryStorage())

afterEach(() => {
  cleanup()
  localStorage.clear()
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
