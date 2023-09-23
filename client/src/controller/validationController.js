const validateLogin = (username, password) => {
  const errorPassword = document.getElementsByClassName("error-password")[0];
  const errorUsername = document.getElementsByClassName("error-username")[0];
  errorPassword.style.display = "none";
  errorUsername.style.display = "none";
  if (username == "" && password == "") {
    errorPassword.style.display = "block";
    errorUsername.style.display = "block";
    return false;
  }

  if (username == "") {
    errorUsername.style.display = "block";
    return false;
  }

  if (password == "") {
    errorPassword.style.display = "block";
    return false;
  }
  return true;
};

const validateProductInput = (sku, name, price, stock) => {
  let isError = false;
  if (sku === "") {
    const errorMessage = document.getElementsByClassName("error-sku")[0];
    errorMessage.style.display = "block";
    isError = true;
  }

  if (name === "") {
    const errorMessage = document.getElementsByClassName("error-name")[0];
    errorMessage.style.display = "block";
    isError = true;
  }

  if (price === "") {
    const errorMessage = document.getElementsByClassName("error-price")[0];
    errorMessage.style.display = "block";
    isError = true;
  }

  if (stock === "") {
    const errorMessage = document.getElementsByClassName("error-stock")[0];
    errorMessage.style.display = "block";
    isError = true;
  }

  return isError;
};

const validateNewCategoryInput = (name) => {
  let isError = false;
  if (name === "") {
    const errorMessage = document.getElementsByClassName("error-name")[0];
    errorMessage.style.display = "block";
    isError = true;
  }
  return isError;
};
