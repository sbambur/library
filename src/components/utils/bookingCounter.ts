export const getBookingBook = (quantity = 0) => {
  const string = quantity.toString();
  const lastChar = string.charAt(string.length - 1);

  switch (true) {
    case lastChar === '1' && !(quantity === 11):
      return `${quantity} книга`;
    case lastChar === '2' && !(quantity === 12):
    case lastChar === '3' && !(quantity === 13):
    case lastChar === '4' && !(quantity === 14):
      return `${quantity} книги`;

    default:
      return `${quantity} книг`;
  }
};
