//used to populate cart/index.html data
import {
  getLocalStorage,
  hideElement,
  showElement,
  getCartCount,
} from './utils.mjs';

//SHOPPING CART CLASS
export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }
  //RENDER CART CONTENTS
  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    if (cartItems != null && cartItems.length>0){
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      document.querySelector(this.parentSelector).innerHTML = htmlItems.join('');
       };
  }
  //DELETE CART ITEMS
  removeItem(id) {
    var cartItems = getLocalStorage('so-cart');
    if (cartItems) {
      //if carItems isn't empty
      const itemIndex = cartItems.findIndex((item) => item.Id === id); //find the index with the first id
      if (itemIndex !== -1) {
        // if you find the item, delete it from the array
        cartItems.splice(itemIndex, 1);
        //localStorage.clear(cartItems); //delete the previous so-cart in localStorage
        localStorage.setItem('so-cart', JSON.stringify(cartItems)); //save the new object cart in localStorage and make it json object.
      }
    }
    const itemToDelete = document.getElementById(id); //grab the element using the productId that's passed in
    itemToDelete.remove(); //directly remove the element
    this.calculateTotal();
  }

  //CALCULATE TOTAL
  calculateTotal() {
    var cartCount = getCartCount();
    const element = document.getElementById('cart-footer');
    const totalElement = document.getElementById('cart-total');
    let subTotal = 0;
    let mult = 0;
    if (cartCount > 0) {
      showElement(element);
      const cartItems = getLocalStorage(this.key);
      for (let i = 0; i < cartItems.length; i++) {
        let obj = cartItems[i];
          mult = obj.Q
          subTotal = mult * obj.FinalPrice + subTotal;
        };
      // Rounding to the nearest hundredth decimal place
      subTotal = subTotal.toFixed(2);
      totalElement.innerText = `Total : $${subTotal}`;
    } else {
      hideElement(element);
    }
  }
}


//CART ITEM TEMPLATE LITERAL
function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider' id='${item.Id}'>
  <button class='close-btn' data-id='${item.Id}'>X</button>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Images.PrimaryMedium}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <input id="qty-textbox" min="1" name="quantity" class='cart-card__quantity' type="number" value="${item.Q}">
  <p class='cart-card__price'>$${item.FinalPrice}</p>
</li>`;

  return newItem;
}
