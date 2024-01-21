//used to populate cart/index.html data

import { getLocalStorage, renderCartCount } from './utils.mjs';

//gets local storage, maps it to the template then populates the htm using the template literal
function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  if (cartItems != null) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
    
    //eventlistener for the close btn 
    const deleteButtons = document.querySelectorAll('.close-btn');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', function() {
        deleteItem(button.getAttribute('data-id'));
      });
    });
  }
  
}

//template literal
function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
  <button class='close-btn' data-id='${item.Id}'>X</button>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: 1</p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
</li>`;

  return newItem;
}
//populate the cart info on cart page
renderCartContents();
//gets the Cart Count for the backpack superscript
renderCartCount();

function deleteItem(id) {
  // Lógica para eliminar un elemento
  var cartItems = getLocalStorage('so-cart');

  if (cartItems) {
    //find the index with the first id
    const itemIndex = cartItems.findIndex(item => item.Id === id);

    // if you find the item, delete it from the array
    if (itemIndex !== -1) {
      cartItems.splice(itemIndex, 1);

      //delete the previous so-cart in localStorage 
      localStorage.clear();

      //save the new object cart in localStorage and make it json object.
      localStorage.setItem('so-cart', JSON.stringify(cartItems))

      //populate the cart info on cart page again
      renderCartContents();
      renderCartCount();
    }
  }
}