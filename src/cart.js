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
    return (shoppingCart.innerHTML = basket.map((c) => {
      let {id, item } = c;
      let search = shopItemsData.find((y) => y.id === id) || [];
      let {img, name, price} = search;
      return `
      <div class="cart-item">
        <img width="100" src=${img} alt="">
        <div class="details">
          <div class="title-price-x">
            <h4 class="title-price">
              <p>${name}</p>
              <p class="cart-item-price">$${price}</p>
            </h4>
            <i onclick="removeItem(${id})" class="bi bi-bag-x"></i>       
            </div>
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
            <h3>$${(Math.round((item * price) * 100) / 100).toFixed(2)}</h3>
          </div>
        </div>
      `
    }).join(""));
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


let increment = (id) => {
  let selectedItem = id;
  let search = basket.find( (s) => s.id === selectedItem.id);

  if(search === undefined){
     basket.push({
    id: selectedItem.id,
    item: 1, 
  });
  }
  else{
    search.item += 1;
  }
  update(selectedItem.id);
  generateCartItems();
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find( (s) => s.id === selectedItem.id);

  if(search === undefined) return;
  else if(search.item === 0) return;
  else{
    search.item -= 1;
  }
  update(selectedItem.id);
  generateCartItems();
};

let update = (id) => {
  let search = basket.find((s)=> s.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totalAmout();
  basket = basket.filter((f) => f.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
};

let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
  generateCartItems();
  totalAmout();
  calculation();
}

let totalAmout = () => {
  if(basket.length !== 0){
    let amount = basket.map((b) => {
      let {item, id} = b;
      let search = shopItemsData.find((y) => y.id === id) || [];
      return item * search.price}).reduce((x,y) => x+y, 0);
    label.innerHTML = `
    <h2>Tax : $${(Math.round((amount * .06) * 100) / 100).toFixed(2)}</h2>
    <h2>Total : $${(Math.round((amount * 1.06) * 100) / 100).toFixed(2)}</h2>
    <button onclick="checkOut()" class="checkout">Checkout</button>
    <button onclick="clearCart()" class="removeAll">Clear cart</button>
    `
  }else return;
}

let clearCart = () => {
  basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
}

let checkOut = () => {
  let amount = basket.map((b) => {
    let {item, id} = b;
    let search = shopItemsData.find((y) => y.id === id) || [];
    return item * search.price;}).reduce((x,y) => x+y, 0);
  alert("Thank you for pretending to shop with us.\nYour total with tax comes to $" + (Math.round((amount * 1.06) * 100) / 100).toFixed(2));
  clearCart();
}

totalAmout();