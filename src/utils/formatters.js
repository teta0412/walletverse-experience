export const formatValue = (value) => {
    return Number.isInteger(value) ? value : value.toFixed(2);
  };
  