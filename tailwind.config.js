// eslint-disable-next-line jsdoc/valid-types
/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')


module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      transitionProperty: {
        'opacity': 'opacity',
        'transform': 'transform',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
      transitionTimingFunction: {
        'in': 'cubic-bezier(0.4, 0, 1, 1)',
        'out': 'cubic-bezier(0, 0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      colors: {
        'bg-light': '#FFFFFF',
        'bg-gray': '#F9FAFB',
        'bg-green': '#00C48C',
        'text-light': '#FFFFFF',
        'text-gray': '#98A2B3',
        'text-dark': '#000000',
        'bg-btn-light': '#FFFFFF',
        'bg-btn-blue': '#4464F3',
        'bg-btn-green': '#00C48C',
        'border-gray': '#EAECF0',
        'border-green': '#00C48C',
      },
      fontFamily: {
        display: ['var(--font-sf)', 'system-ui', 'sans-serif'],
        default: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        // Fade up and down
        'fade-up': 'fade-up 0.5s',
        'fade-down': 'fade-down 0.5s',
        // Fade in and out
        'fade-in': 'fade-in 0.5s',
        'fade-out': 'fade-out 0.5s',
        // Tooltip
        'slide-up-fade': 'slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down-fade': 'slide-down-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        // Fade up and down
        'fade-up': {
          '0%': {
            opacity: 0,
            transform: 'translateY(10px)',
          },
          '80%': {
            opacity: 0.6,
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0px)',
          },
        },
        // Fade in and out
        'fade-in': {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
        'fade-out': {
          '0%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0,
          },
        },
        'fade-down': {
          '0%': {
            opacity: 0,
            transform: 'translateY(-10px)',
          },
          '80%': {
            opacity: 0.6,
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0px)',
          },
        },
        // Tooltip
        'slide-up-fade': {
          '0%': {opacity: 0, transform: 'translateY(6px)'},
          '100%': {opacity: 1, transform: 'translateY(0)'},
        },
        'slide-down-fade': {
          '0%': {opacity: 0, transform: 'translateY(-6px)'},
          '100%': {opacity: 1, transform: 'translateY(0)'},
        },
      },
      fontSize: {
        14: '14px',
      },
      fontWeight: {
        600: '600',
        500: '500',
      },
      width: {
        70: '19rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    plugin(({addVariant}) => {
      addVariant('radix-side-top', '&[data-side="top"]')
      addVariant('radix-side-bottom', '&[data-side="bottom"]')
    }),
  ],
}
