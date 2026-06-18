import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

// Render a component tree at a given route.
export function renderAt(ui, { route = '/' } = {}) {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>)
}
