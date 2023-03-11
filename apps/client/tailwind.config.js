const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');
const { blue, gray, green, red } = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    plugin(({ addUtilities, theme }) => {
      addUtilities({
        '.gradient-light': {
          '--tw-gradient-stops': `${theme('colors.green.100')}, ${theme(
            'colors.cyan.100'
          )}, ${theme('colors.indigo.100')}`
        },
        '.gradient-dark': {
          '--tw-gradient-stops': `${theme('colors.green.900')}, ${theme(
            'colors.cyan.900'
          )}, ${theme('colors.indigo.900')}`
        }
      });
    })
  ],
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname)
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: blue[700],
        secondary: green[500],
        danger: red[500],
        dark: gray[700],
        light: gray[100],
        'border_color-light': gray[200],
        'border_color-dark': gray[600],
        'disabled-dark': gray[200],
        'disabled-light': gray[400]
      }
    }
  }
};
