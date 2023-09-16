const getButtonStyles = (product) => {
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const buttonWrapper = document.createElement("div");

  editButton.style.cursor = "pointer";
  deleteButton.style.cursor = "pointer";
  editButton.innerText = "Edit";
  deleteButton.innerText = "Delete";
  editButton.style.justifyContent = "center";
  deleteButton.style.justifyContent = "center";

  editButton.style.borderRadius = "10px";
  editButton.style.backgroundColor = "#dc3e26";
  editButton.style.border = "solid white 1px";
  editButton.style.color = "white";

  deleteButton.style.borderRadius = "10px";
  deleteButton.style.backgroundColor = "#dc3e26";
  deleteButton.style.border = "solid white 1px";
  deleteButton.style.color = "white";

  deleteButton.addEventListener("mouseover", () => {
    deleteButton.style.filter = "brightness(85%)";
  });

  deleteButton.addEventListener("mouseout", () => {
    deleteButton.style.filter = "brightness(100%)";
  });

  editButton.addEventListener("mouseover", () => {
    editButton.style.filter = "brightness(85%)";
  });

  editButton.addEventListener("mouseout", () => {
    editButton.style.filter = "brightness(100%)";
  });

  deleteButton.onclick = () => {
    deleteProduct(product.sku);
  };
  editButton.onclick = () => {
    editProduct(product);
  };

  editButton.style.width = "40%";
  deleteButton.style.width = "40%";
  editButton.style.height = "80%";
  deleteButton.style.height = "80%";
  editButton.style.display = "flex";
  deleteButton.style.display = "flex";
  editButton.style.alignItems = "center";
  deleteButton.style.alignItems = "center";

  buttonWrapper.style.display = "flex";
  buttonWrapper.style.justifyContent = "space-between";
  buttonWrapper.style.width = "12.5%";
  buttonWrapper.style.alignItems = "center";
  buttonWrapper.appendChild(editButton);
  buttonWrapper.appendChild(deleteButton);

  return buttonWrapper;
};

const getItemTableStyles = (product, categories) => {
  const name = document.createElement("div");
  const sku = document.createElement("div");
  const description = document.createElement("div");
  const active = document.createElement("div");
  const price = document.createElement("div");
  const stock = document.createElement("div");
  const categoryId = document.createElement("div");

  const buttonWrapper = getButtonStyles(product);

  name.style.width = "12.5%";
  sku.style.width = "12.5%";
  description.style.width = "12.5%";
  active.style.width = "12.5%";
  price.style.width = "12.5%";
  stock.style.width = "12.5%";
  categoryId.style.width = "12.5%";

  name.style.color = "white";
  sku.style.color = "white";
  description.style.color = "white";
  active.style.color = "white";
  price.style.color = "white";
  stock.style.color = "white";
  categoryId.style.color = "white";

  name.style.display = "flex";
  sku.style.display = "flex";
  description.style.display = "flex";
  active.style.display = "flex";
  price.style.display = "flex";
  stock.style.display = "flex";
  categoryId.style.display = "flex";

  name.style.alignItems = "center";
  sku.style.alignItems = "center";
  description.style.alignItems = "center";
  active.style.alignItems = "center";
  price.style.alignItems = "center";
  stock.style.alignItems = "center";
  categoryId.style.alignItems = "center";

  name.style.overflowX = "auto";
  sku.style.overflowX = "auto";
  description.style.overflowX = "auto";
  active.style.overflowX = "auto";
  price.style.overflowX = "auto";
  stock.style.overflowX = "auto";
  categoryId.style.overflowX = "auto";

  name.innerText = product.name;
  sku.innerText = product.sku;
  description.innerText = product.description;
  active.innerText = +product.active === 0 ? "False" : "True";
  price.innerText = product.price;
  stock.innerText = product.stock;

  const productCategory = categories.find(
    (category) => +category.category_id === +product.id_category
  );

  categoryId.innerText = productCategory?.name ?? "";

  return {
    name,
    sku,
    description,
    active,
    price,
    stock,
    categoryId,
    buttonWrapper,
  };
};

const createTable = (allProducts, categories) => {
  const dashboardTable = document.getElementById("dashboard-table");
  document.getElementsByClassName("dashboard-table-header")[0].style.display =
    "flex";
  setDashboardTableStyles(dashboardTable);

  if (dashboardTable.hasChildNodes()) {
    resetDashboardTable(dashboardTable);
  }

  allProducts.forEach((product) => {
    const row = document.createElement("div");
    setRowTableStyles(row);

    const {
      name,
      sku,
      description,
      active,
      price,
      stock,
      categoryId,
      buttonWrapper,
    } = getItemTableStyles(product, categories);

    row.appendChild(name);
    row.appendChild(sku);
    row.appendChild(description);
    row.appendChild(active);
    row.appendChild(price);
    row.appendChild(stock);
    row.appendChild(categoryId);
    row.appendChild(buttonWrapper);

    dashboardTable.appendChild(row);
  });
};

const setDashboardTableStyles = (dashboardTable) => {
  dashboardTable.style.borderLeft = "solid white 1px";
  dashboardTable.style.borderRight = "solid white 1px";
  dashboardTable.style.borderBottom = "solid white 1px";
  dashboardTable.style.borderBottomLeftRadius = "10px";
  dashboardTable.style.borderBottomRightRadius = "10px";
  dashboardTable.style.marginLeft = "0.5em";
  dashboardTable.style.marginRight = "0.5em";
};

const setRowTableStyles = (row) => {
  row.style.height = "3em";
  row.style.borderTop = "solid white 1px";
  row.style.display = "flex";
  row.style.paddingLeft = "0.5em";
  row.style.paddingRight = "0.5em";
};

const resetDashboardTable = (dashboardTable) => {
  let row = dashboardTable.lastChild;
  while (row) {
    dashboardTable.removeChild(row);
    row = dashboardTable.lastChild;
  }
};
