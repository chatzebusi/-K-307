const addNavigationButtons = () => {
  const logoutBtn = document.getElementsByClassName("btn-logout")[0];
  logoutBtn.style.display = "block";
  const productGroupBtn =
    document.getElementsByClassName("btn-productgroup")[0];
  productGroupBtn.style.display = "block";
  const addProductBtn = document.getElementsByClassName("btn-add-product")[0];
  addProductBtn.style.display = "block";

  addNavbarBtnEventListener(logoutBtn, productGroupBtn, addProductBtn);
};

const addNavbarBtnEventListener = (
  logoutBtn,
  productGroupBtn,
  addProductBtn
) => {
  logoutBtn.addEventListener("click", () => {
    console.log("button is clicked");
  });
  productGroupBtn.addEventListener("click", () => {
    console.log("button is clicked");
  });
  addProductBtn.addEventListener("click", () => openAddProductPopUp());
};

const openAddProductPopUp = () => {
  fetch("../view/addProduct.html")
    .then((response) => response.text())
    .then((data) => {
      const popUp = document.getElementById("pop-up");
      popUp.innerHTML = data;
    });
};
