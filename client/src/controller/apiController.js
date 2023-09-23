const request = new XMLHttpRequest();

/**
 * this send a authentication request to the server to authenticate the user
 * @param {String} username
 * @param {String} password
 * @author Alessio Englert
 */
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

/**
 * get all products from the server
 * @param {Array} categories
 * @author Alessio Englert
 */
const useGetProducts = (categories) => {
  request.onload = (response) => getProducts(response, categories);
  request.open(
    "GET",
    "https://campus.csbe.ch/sollberger-manuel/uek307/Products",
    true
  );

  request.send();
};

/**
 * delete the product by product sku
 * @param {String} sku
 * @author Alessio Englert
 */
const useDeleteProduct = (sku) => {
  request.onload = refetchProducts;
  request.open(
    "DELETE",
    `https://campus.csbe.ch/sollberger-manuel/uek307/Product/${sku}`,
    true
  );

  request.send();
};

/**
 * returns all categories who is active
 * @author Alessio Englert
 */
const useGetCategories = () => {
  request.onload = getCategories;
  request.open(
    "GET",
    "https://campus.csbe.ch/sollberger-manuel/uek307/Categories",
    true
  );

  request.send();
};

/**
 * updates a product by product sku with the given properties
 * @param {Object} options
 * @author Alessio Englert
 */
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

/**
 * creates a new product withe the given properties
 * @param {Object} options
 * @author Alessio Englert
 */
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

/**
 * add a new category with the given properties
 * @param {Object} options
 * @author Alessio Englert
 */
const useAddCategory = (options) => {
  request.onload = getUpdateProductResponse;
  request.open(
    "POST",
    `https://campus.csbe.ch/sollberger-manuel/uek307/Category`,
    true
  );

  request.send(
    JSON.stringify({
      active: options.active,
      name: options.name,
    })
  );
};

/**
 * updates a category bi category id with the given properties
 * @param {Object} options
 * @author Alessio Englert
 */
const useUpdateCategory = (options) => {
  request.open(
    "PUT",
    `https://campus.csbe.ch/sollberger-manuel/uek307/Category/${options.categoryId}`,
    true
  );

  request.send(
    JSON.stringify({
      active: options.active,
    })
  );
};

/**
 * delete a category bi category id
 * @param {String} id
 * @author Alessio Englert
 */
const useDeleteSelectedCategory = (id) => {
  request.open(
    "DELETE",
    `https://campus.csbe.ch/sollberger-manuel/uek307/Category/${id}`,
    true
  );

  request.send();
};
