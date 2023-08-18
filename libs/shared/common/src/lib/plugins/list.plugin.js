module.exports = function ({ addComponents }) {
  const ulList = {
    '.et-ul-list': {
      '@apply p-2 my-0 list-none': {}
    }
  };
  const ulListItem = {
    '.et-ul-list-item': {
      '@apply relative p-2 pl-3 transition-colors duration-200 border-2 rounded-md cursor-pointer hover:bg-color-action-list-item-default-hover-bg lg:w-60 border-color-transparent':
        {}
    }
  };

  const ulListItemActive = {
    '.et-ul-list-item-active': {
      '@apply bg-color-action-list-item-default-selected-bg border-l-color-primer-border-active': {}
    }
  };

  addComponents(ulList);
  addComponents(ulListItem);
  addComponents(ulListItemActive);
};
