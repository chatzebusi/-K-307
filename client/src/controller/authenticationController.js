const checkCookie = () => {
  const token = getCookie("token");
  if (token) {
    return;
  }
  fetch("../view/login.html")
    .then((response) => response.text())
    .then((data) => {
      const dashboard = document.getElementById("dashboard");
      dashboard.innerHTML = data;
    });
};

const login = (event) => {
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  // TODO send this to the server to authenticate
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
};

window.onload = checkCookie();
