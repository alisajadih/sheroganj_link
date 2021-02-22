export const toFaNumber = (number) => {
  return new Intl.NumberFormat("fa-IR").format(number);
};
