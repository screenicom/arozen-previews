
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        arozen: {
          black: '#000000',
          dark: '#1A1A1A',
          gold: '#B59869',
          'gold-light': '#C9AD82',
          green: '#84A86A',
          'green-light': '#9FBE85',
          white: '#FFFFFF',
          grey: '#F8F7F5',
          danger: '#C45B5B',
        }
      },
      fontFamily: {
        heading: ['"General Sans"', 'sans-serif'],
        body: ['"General Sans"', 'sans-serif'],
        logo: ['"Glory"', 'sans-serif'],
      },
    },
  },
}
