const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [],
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname)
  ],
  darkMode: 'class',
  theme: {
    colors: {
      // Named Colors
      /**
       * accent emphasis color
       */
      'et-color-accent-emphasis': '#1f6feb',

      /**
       * done color
       */
      'et-color-done': '#a371f7',

      /**
       * layer bg color
       */
      'et-layer-alternate': '#161B22',

      /**
       * layer alternate bg color
       */
      'et-layer': '#0D1117',

      /**
       * overlay color
       */
      'et-color-overlay': '#6e768166',

      // Borders
      /**
       * default border color
       */
      'et-color-border-default': '#30363d',

      /**
       * default border color
       */
      'et-color-border-active': '#f78166',

      // Text
      /**
       * default text color
       */
      'et-color-fg-default': '#c9d1d9',

      /**
       * accent text color
       */
      'et-color-fg-accent': '#58a6ff',

      /**
       * accent text color
       */
      'et-color-bg-accent': '#388bfd26',

      /**
       * accent text color
       */
      'et-color-bg-accent-muted': '#388bfd66',

      /**
       * attention text color
       */
      'et-color-fg-attention': '#d29922',

      /**
       * attention text color
       */
      'et-color-bg-attention': '#bb800926',

      /**
       * attention text color
       */
      'et-color-bg-attention-muted': '#bb800966',

      /**
       * success text color
       */
      'et-color-fg-success': '#3fb950',

      /**
       * success text color
       */
      'et-color-bg-success': '#2ea04326',

      /**
       * success text color
       */
      'et-color-fg-danger': '#f85149',

      /**
       * success text color
       */
      'et-color-bg-danger': '#f8514926',

      /**
       * text for emphasized bg color
       */
      'et-color-fg-on-accent-emphasis': '#ffffff',

      /**
       * muted text color
       */
      'et-color-fg-muted': '#8b949e',

      // Miscellaneous
      /**
       * code block bg color
       */
      'et-color-subtle-canvas': '#161b22',

      // Button
      /**
       * default button text color
       */
      'et-color-button-default': '#c9d1d9',

      /**
       * default button bg color
       */
      'et-color-button-default-bg': '#21262d',

      /**
       * default button border color
       */
      'et-color-button-default-border': '#f0f6fc1a',

      /**
       * default button text color
       */
      'et-color-button-disabled': '#484f58',

      /**
       * default button bg color
       */
      'et-color-button-disabled-bg': '#21262d',

      /**
       * default button border color
       */
      'et-color-button-disabled-border': '#f0f6fc1a',

      /**
       * primary button text color
       */
      'et-color-button-primary': '#ffffff',

      /**
       * primary button bg color
       */
      'et-color-button-primary-bg': '#3fb950',

      /**
       * primary button border color
       */
      'et-color-button-primary-border': '#00000000',

      /**
       * primary disabled button text color
       */
      'et-color-button-primary-disabled': '#23863699',

      /**
       * primary disabled button bg color
       */
      'et-color-button-primary-disabled-bg': '#ffffff80',

      /**
       * primary disabled button border color
       */
      'et-color-button-primary-disabled-border': '#f0f6fc1a',

      /**
       * primary disabled button text color
       */
      'et-color-button-attention': '#dbab0a',

      /**
       * primary disabled button bg color
       */
      'et-color-button-attention-bg': '#bb800926',

      /**
       * primary disabled button border color
       */
      'et-color-button-attention-border': '#bb800966',

      /**
       * primary disabled button text color
       */
      'et-color-button-accent': '#58a6ff',

      /**
       * primary disabled button bg color
       */
      'et-color-button-accent-bg': '#388bfd26',

      /**
       * primary disabled button border color
       */
      'et-color-button-accent-border': '#388bfd66',

      /**
       * primary disabled button text color
       */
      'et-color-button-danger': '#f85149',

      /**
       * primary disabled button bg color
       */
      'et-color-button-danger-bg': '#f8514926',

      /**
       * primary disabled button border color
       */
      'et-color-button-danger-border': '#f8514966',

      // Badge
      /**
       * badge text color
       */
      'et-color-badge-fg': '#c9d1d9',

      /**
       * badge bg color
       */
      'et-color-badge-bg': '#30363d',

      /**
       * badge border color
       */
      'et-color-badge-border': '#00000000'
    }
  }
};
