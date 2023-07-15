const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
const { button, card, input, colors, overlay, form, tooltip } = require('../../libs/shared/common/src/lib/plugins');

/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [button, card, input, overlay, form, tooltip],
  content: [join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'), ...createGlobPatternsForDependencies(__dirname)],
  darkMode: 'class',
  theme: {
    colors: { ...colors }
  }
};
