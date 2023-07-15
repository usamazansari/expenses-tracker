module.exports = function ({ addComponents }) {
  const tooltip = {
    '.et-tooltip': {
      '@apply border duration-200 flex gap-2 items-center justify-center py-2 px-6 rounded-lg self-center transition-colors bg-color-btn-bg border-color-btn-border hover:bg-color-btn-hover-bg hover:border-color-btn-hover-border text-color-btn-text':
        {}
    }
  };

  addComponents(tooltip);
};
