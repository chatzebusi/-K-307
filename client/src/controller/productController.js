const refCategories = {
  categories: {},

  set setCategories(value) {
    this.categories = value;
  },

  get getCategories() {
    return this.categories;
  },
};

const getProducts = (response, categories) => {
  const allProducts = JSON.parse(response.target.response);

  createTable(allProducts, categories);
  refCategories.setCategories = categories;
};

const deleteProduct = (sku) => {
  useDeleteProduct(sku);
};

const editProduct = (product) => {
  fetch("../view/editProduct.html")
    .then((response) => response.text())
    .then((data) => {
      const popUp = document.getElementById("pop-up");
      popUp.innerHTML = data;
      setAllProductValues(product);
    });
};

const refetchProducts = (response) => {
  useGetCategories();
};

const setCategoryOnCategoryId = (product) => {
  const selectCategories = document.getElementById("edit-categories");
  refCategories.getCategories.forEach((category) => {
    if (category.active !== "1") {
      return;
    }

    const option = document.createElement("option");
    option.value = +category.category_id;
    option.innerText = category.name;
    selectCategories.appendChild(option);
  });
  selectCategories.value = +product.id_category;
};

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

  setCategoryOnCategoryId(product);
};

const closeEditProductPopup = () => {
  const editProductPopup = document.getElementById("edit-product");
  editProductPopup.style.display = "none";
};

const saveEditProductChanges = () => {
  // TODO show loading some way
  // TODO active is not work on updated
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
    active: activeInputElement.value,
  });
};

const getUpdateProductResponse = (response) => {
  refetchProducts();
};

const saveAddProduct = () => {
  // TODO show loading some way
  // TODO description loading don't work
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
    active: activeInputElement.value,
  });
};

const closeAddProductPopup = () => {
  const addProductPopup = document.getElementById("add-product");
  addProductPopup.style.display = "none";
};
