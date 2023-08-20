const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
const { button, card, colors, form, input, list, overlay } = require('../../libs/shared/common/src/lib/plugins');

/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [button, card, form, input, list, overlay],
  content: [join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'), ...createGlobPatternsForDependencies(__dirname)],
  darkMode: 'class',
  theme: {
    colors: { ...colors }
  }
};
