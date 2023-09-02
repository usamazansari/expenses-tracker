module.exports = function ({ addComponents }) {
  const buttonBase = {
    '.et-button': {
      '@apply\
      bg-color-btn-bg\
      border-color-btn-border\
      border\
      duration-200 \
      flex\
      gap-2\
      disabled:bg-color-btn-outline-disabled-bg\
      disabled:text-color-primer-fg-disabled\
      disabled:hover:border-color-btn-border\
      disabled:cursor-not-allowed\
      hover:bg-color-btn-hover-bg\
      hover:border-color-btn-hover-border\
      items-center\
      justify-center\
      px-6\
      py-2\
      rounded-lg\
      self-center\
      text-color-btn-text\
      transition-colors': {}
    }
  };

  const buttonPrimary = {
    '.et-button-primary': {
      '@apply\
      bg-color-btn-primary-bg\
      border-color-btn-primary-border\
      disabled:bg-color-btn-primary-disabled-bg\
      disabled:text-color-fg-subtle\
      disabled:hover:border-color-btn-primary-disabled-border\
      hover:bg-color-btn-primary-hover-bg\
      hover:border-color-btn-primary-hover-border\
      text-color-btn-primary-text': {}
    }
  };

  const buttonDanger = {
    '.et-button-danger': {
      '@apply\
      disabled:text-color-btn-danger-disabled-text\
      disabled:hover:border-color-btn-danger-disabled-text\
      hover:bg-color-btn-danger-hover-bg\
      hover:border-color-btn-danger-hover-border\
      hover:text-color-btn-danger-hover-text': {}
    }
  };

  addComponents(buttonBase);
  addComponents(buttonPrimary);
  addComponents(buttonDanger);
};
