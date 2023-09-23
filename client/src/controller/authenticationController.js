/**
 * checks the token on initial page load
 * @returns {undefined}
 * @author Alessio Englert
 */
const checkCookie = () => {
  const token = getCookie("token");
  if (token) {
    addNavigationButtons();
    useGetCategories();
    return;
  }

  // user is not authenticated, show login page.
  fetch("../view/login.html")
    .then((response) => response.text())
    .then((data) => {
      const popUp = document.getElementById("pop-up");
      popUp.innerHTML = data;
    });
};

/**
 * gets the token from the server and checks the response
 * @param {*} response
 * @returns {undefined}
 * @author Alessio Englert
 */
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

/**
 * validates the user input from login page
 * @returns {undefined}
 * @author Alessio Englert
 */
const login = () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!validateLogin(username, password)) {
    return;
  }

  useAuthenticate(username, password);
};
/**
 * returns the token
 * @param {String} name
 * @returns {String} token
 */
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
};

/**
 * gets the response from category api
 * @param {*} response
 * @author Alessio Englert
 */
const getCategories = (response) => {
  useGetProducts(JSON.parse(response.target.response));
};

/**
 * gets trigger if page is loaded
 * @author Alessio Englert
 */
const onMounted = () => {
  checkCookie();
};
