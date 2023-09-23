// reactive object
const refCategories = {
  categories: {},

  set setCategories(value) {
    this.categories = value;
  },

  get getCategories() {
    return this.categories;
  },
};

const openAddCategoryPopUp = () => {
  fetch("../view/addCategory.html")
    .then((response) => response.text())
    .then((data) => {
      const popUp = document.getElementById("pop-up");
      popUp.innerHTML = data;
    });
};

const openShowAllCategoriesPopUp = () => {
  fetch("../view/allCategories.html")
    .then((response) => response.text())
    .then((data) => {
      const popUp = document.getElementById("pop-up");
      popUp.innerHTML = data;
      setCategoryOnCategoryId(document.getElementById("all-categories"));
    });
};

const saveAddCategory = () => {
  const nameInputElement = document.getElementById("add-name");
  const activeInputElement = document.getElementById("add-active");
  const isError = validateNewCategoryInput(nameInputElement.value);

  if (isError) {
    return;
  }

  useAddCategory({
    name: nameInputElement.value,
    active: activeInputElement.checked === true ? 1 : 0,
  });

  closePopup();
};

const addCategoryChanges = () => {
  const activeInputElement = document.getElementById("all-active");
  const deleteInputElement = document.getElementById("all-delete");
  const selectedCategory = document.getElementById("all-categories");
  if (deleteInputElement.checked === true) {
    useDeleteSelectedCategory(selectedCategory.value);
    closePopup();
  } else {
    useUpdateCategory({
      categoryId: selectedCategory.value,
      active: activeInputElement.checked === true ? 1 : 0,
    });
    closePopup();
  }
};
