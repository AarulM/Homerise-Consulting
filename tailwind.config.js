/** @type {import('tailwindcss').Config} */

/** Builds a Tailwind color that reads an "R G B" CSS variable, with opacity-modifier support (e.g. bg-paper/50) */
function themedColor(varName) {
  return ({ opacityValue }) =>
    opacityValue === undefined ? `rgb(var(${varName}))` : `rgb(var(${varName}) / ${opacityValue})`
}

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#1E3A5F',
        electric: '#2563EB',
        // Premium dark sections — fixed, does not change with theme
        void: '#09090B',
        // Body text — flips light/dark
        ink: themedColor('--color-ink'),
        // Heading text — flips light/dark
        heading: themedColor('--color-heading'),
        // Secondary surfaces (inputs, transcript backgrounds) — flips light/dark
        subtle: themedColor('--color-subtle'),
        // Page background — flips light/dark
        paper: themedColor('--color-paper'),
        // Raised card/panel background — flips light/dark
        surface: themedColor('--color-surface'),
        // Blue-tinted card surfaces — flips light/dark
        frost: themedColor('--color-frost'),
      },
      fontFamily: {
        sans: [
          'Geist',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 2px 6px rgba(30, 58, 95, 0.06), 0 12px 32px rgba(30, 58, 95, 0.10)',
        'card-hover': '0 8px 18px rgba(30, 58, 95, 0.12), 0 24px 56px rgba(30, 58, 95, 0.18)',
        cta: '0 10px 28px -6px rgba(37, 99, 235, 0.55)',
        header: '0 1px 0 rgba(30, 58, 95, 0.06), 0 8px 30px rgba(30, 58, 95, 0.08)',
        glass: '0 8px 32px rgba(9, 9, 11, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
      },
      maxWidth: {
        content: '1200px',
      },
      // 8px grid additions
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        'accordion-up': 'accordion-up 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
