//used to populate cart/index.html data

import { loadHeaderFooter, renderCartCount } from './utils.mjs';
import ShoppingCart from './ShoppingCart.mjs';

loadHeaderFooter(); //load the header/footer templates

const cart = new ShoppingCart('so-cart', '.product-list'); //Create new instance of Shopping Cart
cart.renderCartContents(); //pull cart contents from local storage
cart.calculateTotal(); //
//EVENT LISTENDER FOR CART DELETE BUTTONS
const deleteButtons = document.querySelectorAll('.close-btn'); //Grab all class .close-btn
deleteButtons.forEach((button) => {
    //create an event listender for each
    button.addEventListener('click', function () {
        cart.removeItem(button.getAttribute('data-id')); //call the cart method removeItem.  passing the data-id of the item to delete
        renderCartCount(); //recall the renderCartCount to update backpack icon
    });
});
