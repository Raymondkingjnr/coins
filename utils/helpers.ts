export const formatCurrency = (value: string) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD", // Change this based on your currency preference
  });
  return formatter.format(value);
};

export const numberFormatter = (num: number | string): string => {
  // Convert num to a number if it's a string
  const numericValue: number = typeof num === "string" ? parseFloat(num) : num;

  if (numericValue >= 10000000) {
    return (numericValue / 1000000).toFixed(1) + "T";
  } else if (numericValue >= 100000) {
    return (numericValue / 100000).toFixed(1) + "M";
  }

  return numericValue.toString();
};

export const formatAmount = (value: string): string => {
  // Remove the dollar sign and commas
  const numericValue = parseFloat(value?.replace(/\$|,/g, ""));

  // Define thresholds and suffixes
  const billion = 1e9;
  const million = 1e6;
  const thousand = 1e3;

  let formattedValue: string;

  if (numericValue >= billion) {
    formattedValue = `$${(numericValue / billion)?.toFixed(2)}B`;
  } else if (numericValue >= million) {
    formattedValue = `$${(numericValue / million)?.toFixed(2)}M`;
  } else if (numericValue >= thousand) {
    formattedValue = `$${(numericValue / thousand)?.toFixed(2)}T`;
  } else {
    formattedValue = `$${numericValue.toFixed(2)}`;
  }

  return formattedValue;
};
