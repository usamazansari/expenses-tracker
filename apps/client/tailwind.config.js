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
      'et-accent': '#58A6FF',
      'et-accent-bg': '#388BFD26',
      'et-accent-emphasis': '#1f6feb',
      'et-border': '#F0F6FC1A',
      'et-border-hover': '#8B949E1A',
      'et-green': '#3FB950',
      'et-layer-alternate': '#161B22',
      'et-layer': '#0D1117',
      'et-danger': '#F85149',
      'et-danger-bg': '#FD443A26',
      'et-select': '#F78166',
      'et-text': '#C9D1D9',
      'et-text-bg': '#21262D',
      'et-text-bg-hover': '#30363D',
      'et-violet': '#A371F7',
      'et-yellow': '#F1E05a',
      'et-white': '#ffffff',
      'et-muted': '#8b949e'
    }
  }
};
