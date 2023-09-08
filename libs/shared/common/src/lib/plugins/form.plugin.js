module.exports = function ({ addComponents }) {
  const formFieldWrapper = {
    '.et-form-field-wrapper': {
      '@apply flex flex-col gap-2 pb-8': {}
    }
  };

  const formFieldInputWrapper = {
    '.et-form-field-input-wrapper': {
      '@apply relative flex flex-col justify-center flex-grow': {}
    }
  };

  const formFieldInputErrorMessage = {
    '.et-form-field-input-error-message': {
      '@apply absolute left-0 p-1 top-full text-color-danger-fg': {}
    }
  };

  addComponents(formFieldWrapper);
  addComponents(formFieldInputWrapper);
  addComponents(formFieldInputErrorMessage);
};
