module.exports = function ({ addComponents }) {
  const ulList = {
    '.et-ul-list': {
      '@apply list-none my-0 p-2': {}
    }
  };

  const ulListItem = {
    '.et-ul-list-item': {
      '@apply p-2 pl-3 transition-colors duration-200 border-2 rounded-md cursor-pointer border-color-transparent lg:w-60 text-color-fg-muted hover:bg-color-action-list-item-default-hover-bg hover:text-color-fg-default':
        {}
    }
  };

  const ulListItemActive = {
    '.et-ul-list-item-active': {
      '@apply bg-color-action-list-item-default-selected-bg border-l-color-primer-border-active text-color-fg-default':
        {}
    }
  };

  addComponents(ulList);
  addComponents(ulListItem);
  addComponents(ulListItemActive);
};
