const addNavigationButtons = () => {
  const showCategories = document.getElementsByClassName("btn-logout")[0];
  showCategories.style.display = "block";
  const productGroupBtn =
    document.getElementsByClassName("btn-productgroup")[0];
  productGroupBtn.style.display = "block";
  const addProductBtn = document.getElementsByClassName("btn-add-product")[0];
  addProductBtn.style.display = "block";

  addNavbarBtnEventListener(showCategories, productGroupBtn, addProductBtn);
};

const addNavbarBtnEventListener = (
  showCategories,
  productGroupBtn,
  addProductBtn
) => {
  showCategories.addEventListener("click", () => openShowAllCategoriesPopUp());
  productGroupBtn.addEventListener("click", () => openAddCategoryPopUp());
  addProductBtn.addEventListener("click", () => openAddProductPopUp());
};
