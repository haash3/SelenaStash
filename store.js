const cartIcon = document.querySelector(".fa-cart-shopping");
const body = document.body;
const closeCart = document.querySelector(".close");
let listProductHTML = document.querySelector(".product-list");

// ----------DOM ELEMENTS END----------
// ---------Create Elements------------
let listProducts = [];
// ---------Create Elements------------

// ----------Event Listeners------------
cartIcon.addEventListener("click", () => {
  body.classList.add("showCart");
});
closeCart.addEventListener("click", () => {
  body.classList.remove("showCart");
});

// ----------Event Listeners------------

// -------Create FUNCTIONS----------
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
            <div class="item_price">${product.price}</div>
            <button class="addCart">Add To Cart</button>`;
      listProductHTML.appendChild(newProduct);
    });
  }
}
listProductHTML.addEventListener('click', (e) =>{
    let positionClick = e.target;
    if(positionClick.classList.contains('addCart')){
        let product_id = positionClick.parentElement.dataset.id;
        console.log(product_id);
    }else{
        console.log("doesn't contain class")
    }
})
//function to fetch products list from the json file.
async function getProducts() {
  try {
    const response = await fetch("product.json");
    const data = await response.json();
    listProducts = data;
    addDataToHTML();
    console.log(listProducts);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
getProducts();

// -------Create FUNCTIONS----------
