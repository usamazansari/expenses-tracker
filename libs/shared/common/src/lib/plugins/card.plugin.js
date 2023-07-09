module.exports = function ({ addComponents }) {
  const card = {
    '.et-card': {
      '@apply p-4 border rounded-lg border-color-border-default': {}
    }
  };

  addComponents(card);
};
