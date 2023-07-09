module.exports = function ({ addComponents }) {
  const buttonBase = {
    '.et-button': {
      '@apply border duration-200 flex gap-2 items-center justify-center py-3 px-6 rounded-lg self-center transition-colors bg-color-btn-bg border-color-btn-border hover:bg-color-btn-hover-bg hover:border-color-btn-hover-border text-color-btn-text':
        {}
    }
  };

  const buttonPrimary = {
    '.et-button-primary': {
      '@apply bg-color-btn-primary-bg border-color-btn-primary-border hover:bg-color-btn-primary-hover-bg hover:border-color-btn-primary-hover-border text-color-btn-primary-text':
        {}
    }
  };

  const buttonDanger = {
    '.et-button-danger': {
      '@apply hover:bg-color-btn-danger-hover-bg hover:border-color-btn-danger-hover-border hover:text-color-btn-danger-hover-text text-color-btn-danger-text':
        {}
    }
  };

  addComponents(buttonBase);
  addComponents(buttonPrimary);
  addComponents(buttonDanger);
};
