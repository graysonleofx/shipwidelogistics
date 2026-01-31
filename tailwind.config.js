const config = {
  content: ["./{app,components,libs,pages,hooks}/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#020202',
        secondary: '#04471C',
        accent: '#058C42',
        background: '#16DB65',
      },
    },
  },
  plugins: [],
}

export default config;