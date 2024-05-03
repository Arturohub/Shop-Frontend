// tailwind.config.js

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: "#cbae9b", 
      },
      fontFamily: {
        'gloria-hallelujah': ['Gloria Hallelujah', 'cursive'],
        'lobster': ['Lobster', 'cursive'],
        'pacifico': ['Pacifico', 'cursive'],
        'permanent-marker': ['Permanent Marker', 'cursive'],
        'roboto': ['Roboto', 'sans-serif'],
        'russo-one': ['Russo One', 'sans-serif'],
        'satisfy': ['Satisfy', 'cursive'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'teko': ['Teko', 'sans-serif'],
        'vt323': ['VT323', 'monospace'],
        'chango': ['Chango', 'sans-serif'],
        'chicle': ['Chicle', 'sans-serif'],
        'diplomata': ['Diplomata', 'sans-serif'],
        'oi': ['Oi', 'sans-serif'],
        'rubik-dirt': ['Rubik Dirt', 'sans-serif'],
        'sigmar': ['Sigmar', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
