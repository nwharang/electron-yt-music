/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Poppins', 'sans-serif']
    },
    animation: {
      slidein: 'slidein 0.5s ease-out alternate'
    },
    slidein: {
      '0%': {
        transform: 'translateX(-20%)',
        opacity: 0
      },
      '100%': { transform: 'translateX(0%)', opacity: 1 }
    }
  },
  plugins: [require('daisyui')],
  theme: {
    extend: {
      backgroundImage: {
        loading: "url('https://img.freepik.com/free-vector/musical-notes-frame-with-text-space_1017-32857.jpg?w=2000')"
      }
    }
  }
}
