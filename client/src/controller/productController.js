/**
 * received all products from the server
 * @param {*} response
 * @param {*} categories
 * @returns {undefined}
 * @author Alessio Englert
 */
const getProducts = (response, categories) => {
  if (!response.target?.response) {
    return;
  }

  const allProducts = JSON.parse(response.target.response);

  createTable(allProducts, categories);
  refCategories.setCategories = categories;
};

/**
 * delete a product with the given product sku
 * @param {String} sku
 * @author Alessio Englert
 */
const deleteProduct = (sku) => {
  useDeleteProduct(sku);
};

/**
 * open the editProduct popup
 * @param {Object} product
 * @author Alessio Englert
 */
const editProduct = (product) => {
  fetch("../view/editProduct.html")
    .then((response) => response.text())
    .then((data) => {
      const popUp = document.getElementById("pop-up");
      popUp.innerHTML = data;
      setAllProductValues(product);
    });
};

/**
 * refetch function to create the table new with updated values
 * @param {*} response
 * @author Alessio Englert
 */
const refetchProducts = (response) => {
  useGetCategories();
};

/**
 * shows all active categories
 * @param {*} selectCategories
 * @param {*} product
 */
const setCategoryOnCategoryId = (selectCategories, product) => {
  refCategories.getCategories.forEach((category) => {
    if (category.active !== "1") {
      return;
    }

    const option = document.createElement("option");
    option.value = +category.category_id;
    option.innerText = category.name;
    selectCategories.appendChild(option);
  });
  selectCategories.value = +product?.id_category ?? null;
};

/**
 * shows all categories
 * @param {*} selectCategories
 * @param {*} product
 */
const setAllCategoryOnCategoryId = (selectCategories, product) => {
  refCategories.getCategories.forEach((category) => {
    const option = document.createElement("option");
    option.value = +category.category_id;
    option.innerText = category.name;
    selectCategories.appendChild(option);
  });
  selectCategories.value = +product?.id_category ?? null;
};

/**
 * sets the edited product into popup
 * @param {Object} product
 * @author Alessio Englert
 */
const setAllProductValues = (product) => {
  const inputName = document.getElementById("edit-name");
  const inputSku = document.getElementById("edit-sku");
  const inputDescription = document.getElementById("edit-description");
  const inputPrice = document.getElementById("edit-price");
  const inputStock = document.getElementById("edit-stock");
  const switchActive = document.getElementById("edit-active");

  inputName.value = product.name;
  inputSku.value = product.sku;
  inputDescription.value = product.description;
  inputPrice.value = product.price;
  inputStock.value = product.stock;
  switchActive.checked = +product.active;

  setCategoryOnCategoryId(document.getElementById("edit-categories"), product);
};

/**
 * validate the user input and saved the changed properties
 * @returns {undefined}
 * @author Alessio Englert
 */
const saveEditProductChanges = () => {
  const skuInputElement = document.getElementById("edit-sku");
  const nameInputElement = document.getElementById("edit-name");
  const descriptionInputElement = document.getElementById("edit-description");
  const priceInputElement = document.getElementById("edit-price");
  const categoriesSelectElement = document.getElementById("edit-categories");
  const stockInputElement = document.getElementById("edit-stock");
  const activeInputElement = document.getElementById("edit-active");

  const isError = validateProductInput(
    skuInputElement.value,
    nameInputElement.value,
    priceInputElement.value,
    stockInputElement.value
  );

  if (isError) {
    return;
  }

  useUpdateProduct({
    sku: skuInputElement.value,
    name: nameInputElement.value,
    description: descriptionInputElement.value,
    price: priceInputElement.value,
    category: categoriesSelectElement.value,
    stock: stockInputElement.value,
    active: activeInputElement.checked === true ? 1 : 0,
  });

  closePopup();
};

/**
 * refetch products
 * @param {*} response
 * @author Alessio Englert
 */
const getUpdateProductResponse = (response) => {
  refetchProducts();
};

/**
 * validate user input and create a new product
 * @returns {undefined}
 * @author Alessio Englert
 */
const saveAddProduct = () => {
  const skuInputElement = document.getElementById("add-sku");
  const nameInputElement = document.getElementById("add-name");
  const descriptionInputElement = document.getElementById("add-description");
  const priceInputElement = document.getElementById("add-price");
  const categoriesSelectElement = document.getElementById("add-categories");
  const stockInputElement = document.getElementById("add-stock");
  const activeInputElement = document.getElementById("add-active");

  const isError = validateProductInput(
    skuInputElement.value,
    nameInputElement.value,
    priceInputElement.value,
    stockInputElement.value
  );

  if (isError) {
    return;
  }

  useAddProduct({
    sku: skuInputElement.value,
    name: nameInputElement.value,
    description: descriptionInputElement.value,
    price: priceInputElement.value,
    category: categoriesSelectElement.value,
    stock: stockInputElement.value,
    active: activeInputElement.checked === true ? 1 : 0,
  });

  closePopup();
};

/**
 * open add product popup
 * @author Alessio Englert
 */
const openAddProductPopUp = () => {
  fetch("../view/addProduct.html")
    .then((response) => response.text())
    .then((data) => {
      const popUp = document.getElementById("pop-up");
      popUp.innerHTML = data;
      setCategoryOnCategoryId(document.getElementById("add-categories"));
    });
};
