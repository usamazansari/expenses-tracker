module.exports = function ({ addComponents }) {
  const listItem = {
    '.et-list-item': {
      '@apply relative p-2 pl-3 transition-colors duration-200 border-2 rounded-md cursor-pointer hover:bg-color-action-list-item-default-hover-bg lg:w-60 border-color-transparent':
        {}
    }
  };

  const listItemActive = {
    '.et-list-item-active': {
      '@apply bg-color-action-list-item-default-selected-bg border-l-color-primer-border-active': {}
    }
  };

  addComponents(listItem);
  addComponents(listItemActive);
};
