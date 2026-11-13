/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        condensed: ['"Big Shoulders Display"', 'sans-serif'],
        comic: ['"Gasoek One"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        'mono-code': ['"JetBrains Mono"', 'monospace'],
        mono: ['"JetBrains Mono"', 'monospace'],
        /* Legacy aliases preserved so existing components compile cleanly during migration */
        franie: ['"Plus Jakarta Sans"', 'sans-serif'],
        conthic: ['"Big Shoulders Display"', 'sans-serif'],
        grift: ['"Big Shoulders Display"', 'sans-serif'],
        soge: ['"JetBrains Mono"', 'monospace'],
        matrix: ['"Big Shoulders Display"', 'sans-serif'],
        display: ['"Big Shoulders Display"', 'sans-serif'],
        editorial: ['"Big Shoulders Display"', 'sans-serif'],
      },
      colors: {
        ink: '#0A0A0A',
        ground: '#FFFFFF',
        muted: '#4A4A52',
        cobalt: '#2B47FF',
        orange: {
          DEFAULT: '#FF4D00',
          500: '#FF4D00',
          400: '#FF6A2B',
        },
        gold: '#FFAE00',
        studio: {
          950: '#0A0A0A',
          900: '#111111',
          850: '#161616',
          800: '#1F1F1F',
          700: '#2A2A2A',
          400: '#4A4A52',
          200: '#E2E2E8',
          50: '#FFFFFF',
        },
        accent: {
          orange: '#FF4D00',
          cobalt: '#2B47FF',
          gold: '#FFAE00',
          cyan: '#00F0FF',
          purple: '#9B51E0',
        },
      },
    },
  },
  plugins: [],
};
