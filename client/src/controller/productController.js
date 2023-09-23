const getProducts = (response, categories) => {
  if (!response.target?.response) {
    return;
  }

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

const getUpdateProductResponse = (response) => {
  refetchProducts();
};

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

const openAddProductPopUp = () => {
  fetch("../view/addProduct.html")
    .then((response) => response.text())
    .then((data) => {
      const popUp = document.getElementById("pop-up");
      popUp.innerHTML = data;
      setCategoryOnCategoryId(document.getElementById("add-categories"));
    });
};
