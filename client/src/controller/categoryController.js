// reactive category object
const refCategories = {
  categories: {},

  set setCategories(value) {
    this.categories = value;
  },

  get getCategories() {
    return this.categories;
  },
};
/**
 * open the add new category popup
 * @author Alessio Englert
 */
const openAddCategoryPopUp = () => {
  fetch("../view/addCategory.html")
    .then((response) => response.text())
    .then((data) => {
      const popUp = document.getElementById("pop-up");
      popUp.innerHTML = data;
    });
};

/**
 * open the all category popup
 * @author Alessio Englert
 */
const openShowAllCategoriesPopUp = () => {
  fetch("../view/allCategories.html")
    .then((response) => response.text())
    .then((data) => {
      const popUp = document.getElementById("pop-up");
      popUp.innerHTML = data;
      setAllCategoryOnCategoryId(document.getElementById("all-categories"));
    });
};

/**
 * validate user input and saved the new added category
 * @returns {undefined}
 * @author Alessio Englert
 */
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

/**
 * checks if the edited category should be deleted or be updated
 * @author Alessio Englert
 */
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
