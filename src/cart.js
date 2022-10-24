let basket = JSON.parse(localStorage.getItem("data")) || [];
let lable = document.getElementById("lable");
let shoppingCart = document.getElementById("shopping-cart");

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((m) => m.item).reduce((x,y) => x+y,0)
}

calculation();

let generateCartItems = () => {
  if(basket.length !== 0){
    console.log("basket is not empty")
  }
  else{}
}