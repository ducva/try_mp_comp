module.exports = {
  // mode: 'jit',     // disable this to make `safelist` work
  purge: {
    content: ['./src/**/*.{js,ts,jsx,tsx}', './safelist.txt'],
    options: {
      safelist: [/^px-.*/]
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
  ],
};
