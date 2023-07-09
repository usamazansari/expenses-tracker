module.exports = function ({ addComponents }) {
  const loadingOverlay = {
    '.et-loading-overlay': {
      '@apply absolute top-0 bottom-0 left-0 right-0 z-10 bg-color-canvas-overlay': {}
    }
  };

  addComponents(loadingOverlay);
};
