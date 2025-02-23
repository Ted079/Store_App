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