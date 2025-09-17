// //exporting module
// console.log(`Exporting module`);

//Blocking Code
console.log('Start Fetching Users');
await fetch('https://jsonplaceholder.typicode.com/users');
console.log('Finished fetching users');

const shippingCost = 10;
export const cart = [];

// export const addToCart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(
//     `${quantity} ${product}${quantity > 1 ? 's' : ''} added to cart!`
//   );
// };

// const totalPrice = 237;
// const totalQuantity = 23;

// //export { totalPrice, totalQuantity };
// export { totalPrice, totalQuantity as tq };

//default export takes the value, not the name/variable
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(
    `${quantity} ${product}${quantity > 1 ? 's' : ''} added to cart!`
  );
}
