let basket = JSON.parse(localStorage.getItem("data")) || [];
let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((m) => m.item).reduce((x,y) => x+y,0)
}

calculation();

let generateCartItems = () => {
  if(basket.length !== 0){
    return shoppingCart.innerHTML = basket.map((c) => {
      return `
      <div class="cart-item">hello</div>
      `
    })
  }
  else{
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>The cart is empty</h2>
    <a href="index.html">
    <button class="HomeBtn">Back to store</button>
    </a>
    `;
  }
};

generateCartItems();