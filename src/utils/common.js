export const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

export const validateValues = (name, value) => {
  switch (name) {
    case "name":
      return value.length < 4 ? "Must be 4 or more charecters" : "";
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? ""
        : "Please enter a valid email adress";
    case "password":
      return value.length < 6 || value[0] !== value[0]?.toUpperCase()
        ? "Must be more than 6 letters"
        : "";
    // and the first letter must be capital
    default:
      return;
  }
};

export const urlParams = (url, params) => {
  let urlWithParams = url;

  Object.entries(params).forEach(([key, value], i) => {
    const sign = !i ? "?" : "&";

    urlWithParams += `${sign}${key}=${value}`;
  });

  return urlWithParams;
};

export const sumBy = (arr) => arr.reduce((prev, curr) => prev + curr, 0);

// const addItemTo = (state, payload) => {
//   const exsistingItem = state.cart.find(({ id }) => id === payload.id);

//   if (!exsistingItem) {
//     state.cart.push({ ...payload, quantity: 1 });
//   } else {
//     exsistingItem.quantity = payload.quantity || exsistingItem.quantity + 1;
//     console.log(exsistingItem.quantity);
//   }
//   localStorage.setItem("cart", JSON.stringify(state.cart));
// };
