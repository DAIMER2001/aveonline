export const minNumberValidator = ({ value, customArgs }) => {
    const succeeded = isNaN(value) || value <= customArgs.min;
    return {
      succeeded,
      message: succeeded ? "" : `Should be smaller than ${customArgs.min}`,
      type: "MIN_NUMBER"
    };
  };
  