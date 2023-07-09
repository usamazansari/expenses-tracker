module.exports = function ({ addComponents }) {
  const card = {
    '.et-card': {
      '@apply p-4 border rounded-lg w-96 border-color-border-default': {}
    }
  };

  addComponents(card);
};
