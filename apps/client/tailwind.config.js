const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');
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
    colors: {
      'et-layer': '#0D1117',
      'et-layer-alternate': '#161B22',
      'et-button-primary': '#21262D',
      'et-button-primary-bg': '#C9D1D9',
      'et-button-hover': '#30363D',
      'et-button-accent': '#58a6ff',
      'et-button-accent-bg': '#388bfd26',
      'et-border': '#f0f6fc1a',
      'et-border-hover': '#8B949E',
      'et-select': '#F78166',
      'et-blue': '#58A6FF',
      'et-red': '#F85149',
      'et-green': '#3FB950',
      'et-yellow': '#f1e05a'
    }
  }
};
