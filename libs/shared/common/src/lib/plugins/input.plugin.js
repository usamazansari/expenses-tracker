module.exports = function ({ addComponents }) {
  const input = {
    '.et-input': {
      '@apply p-3 transition-colors duration-200 border rounded-md bg-color-canvas-inset text-color-fg-default border-color-border-default focus:border-color-accent-fg focus:outline-none focus:bg-color-canvas-default disabled:text-color-primer-fg-disabled disabled:bg-color-input-disabled-bg disabled:border-color-border-default disabled:cursor-not-allowed':
        {}
    }
  };

  const inputErrorMessage = {
    '.et-input-error-message': {
      '@apply absolute left-0 p-1 top-full text-color-danger-fg': {}
    }
  };

  addComponents(input);
  addComponents(inputErrorMessage);
};
