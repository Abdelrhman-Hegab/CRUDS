// get total
// create product
// save local storage
// clear  inputs
// read
// count
// delete
// update
// search
// clean data

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mode = "create";
let searchMode = "title";
let tmp;

function getTotal() {
  if (
    price.value != "" &&
    taxes.value != "" &&
    ads.value != "" &&
    discount.value != ""
  ) {
    let totalValue = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = totalValue;
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#790000";
  }
}

let dataProduct;
if (localStorage.getItem("product") != null) {
  dataProduct = JSON.parse(localStorage.getItem("product"));
} else {
  dataProduct = [];
}

submit.onclick = function () {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (
    newProduct.title != "" &&
    newProduct.price != "" &&
    newProduct.taxes != "" &&
    newProduct.category != "" &&
    newProduct.count < 100
  ) {
    if (mode === "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          dataProduct.push(newProduct);
        }
      } else {
        dataProduct.push(newProduct);
      }
    } else {
      dataProduct[tmp] = newProduct;
      mode = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
  } else {
    alert("Please Fill All Inputs And Count Must Be Less Than 100");
  }
  // save localstorage

  localStorage.setItem("product", JSON.stringify(dataProduct));
  clearInputs();
  read();
};

//  clear inputs
function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

function read() {
  getTotal();
  let table = "";

  for (let i = 0; i < dataProduct.length; i++) {
    table += `<tr>
        <td>${i + 1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick="updateProduct(${i})" id ="update">Update</button></td>
        <td><button onclick="deleteProduct(${i})" id ="delete">Delete</button></td>
        </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  let deleteAll = document.getElementById("deleteAll");
  if (dataProduct.length > 0) {
    deleteAll.innerHTML = `<button onclick="DeleteAllData()" >Delete All (${dataProduct.length})</button>`;
  } else {
    deleteAll.innerHTML = "";
  }
}
read();

// delete

function deleteProduct(index) {
  dataProduct.splice(index, 1);
  localStorage.setItem("product", JSON.stringify(dataProduct));
  read();
}

// update

function updateProduct(index) {
  title.value = dataProduct[index].title;
  price.value = dataProduct[index].price;
  taxes.value = dataProduct[index].taxes;
  ads.value = dataProduct[index].ads;
  discount.value = dataProduct[index].discount;
  total.innerHTML = dataProduct[index].total;
  count.style.display = "none";
  category.value = dataProduct[index].category;
  submit.innerHTML = "Update";
  localStorage.setItem("product", JSON.stringify(dataProduct));
  read();
  total.style.backgroundColor = "green";
  mode = "update";
  tmp = index;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// delete All Data

function DeleteAllData() {
  localStorage.clear();
  dataProduct = [];
  read();
}

// search

function getSearchMode(id) {
  let search = document.getElementById("search");

  if (id === "searchTitle") {
    searchMode = "title";
  } else {
    searchMode = "category";
  }
  search.placeholder = "Search by " + searchMode;
  search.focus();
  search.value = "";
  read();
  search.placeholder.style.textTransform = "capitalize";
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    if (searchMode == "title") {
      if (dataProduct[i].title.includes(value.toLowerCase())) {
        table += `<tr>
        <td>${i + 1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick="updateProduct(${i})" id ="update">Update</button></td>
        <td><button onclick="deleteProduct(${i})" id ="delete">Delete</button></td>
        </tr>`;
      }
    } else {
      if (dataProduct[i].category.includes(value)) {
        table += `<tr>
        <td>${i + 1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick="updateProduct(${i})" id ="update">Update</button></td>
        <td><button onclick="deleteProduct(${i})" id ="delete">Delete</button></td>
        </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

// clean data
