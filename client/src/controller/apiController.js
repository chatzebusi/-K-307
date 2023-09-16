const request = new XMLHttpRequest();

const useAuthenticate = (username, password) => {
  request.onload = getToken;
  request.open(
    "POST",
    "https://campus.csbe.ch/sollberger-manuel/uek307/Authenticate",
    true
  );

  request.send(
    JSON.stringify({
      username: username,
      password: password,
    })
  );
};

const useGetProducts = (categories) => {
  request.onload = (response) => getProducts(response, categories);
  request.open(
    "GET",
    "https://campus.csbe.ch/sollberger-manuel/uek307/Products",
    true
  );

  request.send();
};

const useDeleteProduct = (sku) => {
  request.onload = refetchProducts;
  request.open(
    "DELETE",
    `https://campus.csbe.ch/sollberger-manuel/uek307/Product/${sku}`,
    true
  );

  request.send();
};

const useGetCategories = () => {
  request.onload = getCategories;
  request.open(
    "GET",
    "https://campus.csbe.ch/sollberger-manuel/uek307/Categories",
    true
  );

  request.send();
};

const useUpdateProduct = (options) => {
  request.onload = getUpdateProductResponse;
  request.open(
    "PUT",
    `https://campus.csbe.ch/sollberger-manuel/uek307/Product/${options.sku}`,
    true
  );

  request.send(
    JSON.stringify({
      active: options.active,
      id_category: options.category,
      name: options.name,
      product_image: "",
      description: options.description,
      price: options.price,
      stock: options.stock,
    })
  );
};

const useAddProduct = (options) => {
  request.onload = getUpdateProductResponse;
  request.open(
    "PUT",
    `https://campus.csbe.ch/sollberger-manuel/uek307/Product/${options.sku}`,
    true
  );

  request.send(
    JSON.stringify({
      active: options.active,
      id_category: options.category,
      name: options.name,
      product_image: "",
      description: options.description,
      price: options.price,
      stock: options.stock,
    })
  );
};
