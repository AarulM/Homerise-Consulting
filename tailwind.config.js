/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#1E3A5F',
        electric: '#2563EB',
        ink: '#1F2937',
        subtle: '#F8F9FA',
      },
      fontFamily: {
        sans: [
          'Inter',
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
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
}
