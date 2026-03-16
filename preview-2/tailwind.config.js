
export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        aaa: {
          charcoal: '#1A1A2E',
          'charcoal-light': '#252540',
          sage: '#7C9A8E',
          'sage-light': '#9AB5A8',
          cream: '#F5F0EB',
          gold: '#C4A87C',
          white: '#FAFAF8',
          danger: '#C45B5B',
        }
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
}
