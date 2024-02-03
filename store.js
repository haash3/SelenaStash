const cartIcon = document.querySelector(".fa-cart-shopping");
const body = document.body;
const closeCart = document.querySelector(".close");
let listProductHTML = document.querySelector(".product-list");
let listCartHTML = document.querySelector(".cart-tab_list");
let cartCount = document.querySelector(".cart_count");
// ----------DOM ELEMENTS END----------
// ---------Create Elements------------
let listProducts = [];
let cart = [];
// ---------Create Elements------------

// ----------Event Listeners------------
cartIcon.addEventListener("click", () => {
  body.classList.add("showCart");
});
closeCart.addEventListener("click", () => {
  body.classList.remove("showCart");
});
listCartHTML.addEventListener("click", (e) => {
  let positionClick = e.target;
  if (
    positionClick.classList.contains("minus") ||
    positionClick.classList.contains("plus")
  ) {
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    console.log(product_id);

    let type = "minus";
    if (positionClick.classList.contains("plus")) {
      type = "plus";
    }
    changeQuantity(product_id, type);
  }
});

// ----------Event Listeners------------

// -------Create FUNCTIONS----------
// increments and decrements items in cart
function changeQuantity(product_id, type) {
  let positionItemInCart = cart.findIndex(
    (value) => (value.product_id = product_id)
  );
  if (positionItemInCart >= 0) {
    switch (type) {
      case "plus":
        cart[positionItemInCart].quantity++;
        break;
      default:
        let valueChange = cart[positionItemInCart].quantity - 1;
        if (valueChange > 0) {
          cart[positionItemInCart].quantity = valueChange;
        } else {
          cart.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  addCartToStorage();
  addCartToHtml();
}
// adds the fetched product list to the html file
function addDataToHTML() {
  listProductHTML.innerHTML = "";
  if (listProducts.length > 0) {
    listProducts.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("product_list_item");
      newProduct.dataset.id = product.id;
      newProduct.innerHTML = `<img src="${product.image}" class="item_img" />
            <div class="item_name">${product.name}</div>
            <div class="item_price">₹${product.price}</div>
            <button class="addCart">Add To Cart</button>`;
      listProductHTML.appendChild(newProduct);
    });
  }
}
listProductHTML.addEventListener("click", (e) => {
  let positionClick = e.target;
  if (positionClick.classList.contains("addCart")) {
    let product_id = positionClick.parentElement.dataset.id;
    addToCart(product_id);
  } else {
    console.log("doesn't contain class");
  }
});
// adds items to the shopping cart
function addToCart(product_id) {
  let positionThisProductInCart = cart.findIndex(
    (value) => value.product_id == product_id
  );
  if (cart.length <= 0) {
    cart = [
      {
        product_id: product_id,
        quantity: 1,
      },
    ];
  } else if (positionThisProductInCart < 0) {
    cart.push({
      product_id: product_id,
      quantity: 1,
    });
  } else {
    cart[positionThisProductInCart].quantity++;
  }
  addCartToHtml();
  addCartToStorage();
}
// saves the cart details in local storage
function addCartToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
// displays items in  the shopping cart
function addCartToHtml() {
  listCartHTML.innerHTML = "";
  let totalQuantity = 0;
  if (cart.length > 0) {
    cart.forEach((carts) => {
      totalQuantity = totalQuantity + carts.quantity;

      let newCart = document.createElement("div");
      newCart.classList.add("cart_item");
      newCart.dataset.id = carts.product_id;
      let positionProduct = listProducts.findIndex(
        (value) => value.id == carts.product_id
      );
      let info = listProducts[positionProduct];
      console.log(info);
      newCart.innerHTML = `<div class="image">
        <img src="${info.image}" alt="">
      </div>
      <div class="name">${info.name}</div>
      <div class="price">₹${info.price * carts.quantity}</div>
      <div class="quantity">
        <span class="minus">-</span>
        <span id="cartNum">${carts.quantity}</span>
        <span class="plus">+</span>
      </div>`;
      listCartHTML.appendChild(newCart);
    });
  }
  cartCount.innerText = totalQuantity;
}

//fetch products list from the json file.
async function getProducts() {
  try {
    const response = await fetch("product.json");
    const data = await response.json();
    listProducts = data;
    addDataToHTML();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
    addCartToHtml();
  }
}
getProducts();

// -------Create FUNCTIONS----------
