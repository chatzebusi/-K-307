const checkCookie = () => {
  const token = getCookie("token");
  if (token) {
    addNavigationButtons();
    useGetCategories();
    return;
  }

  fetch("../view/login.html")
    .then((response) => response.text())
    .then((data) => {
      const popUp = document.getElementById("pop-up");
      popUp.innerHTML = data;
    });
};

const getToken = (response) => {
  if (response.target.status !== 200) {
    const errorWrong = document.getElementsByClassName("error-wrong")[0];
    errorWrong.style.display = "block";
    return;
  }

  const login = document.getElementById("login");
  login.style.display = "none";

  addNavigationButtons();

  useGetCategories();
};

const login = () => {
  /* const username = document.getElementById("username").value;
  const password = document.getElementById("password").value; */

  //! remove this lines
  const username = "root";
  const password = "sUP3R53CR3T#";

  if (!validateLogin(username, password)) {
    return;
  }

  useAuthenticate(username, password);
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
};

const getCategories = (response) => {
  useGetProducts(JSON.parse(response.target.response));
};

const onMounted = () => {
  checkCookie();
};
