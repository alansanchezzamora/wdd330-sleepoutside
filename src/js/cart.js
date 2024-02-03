//used to populate cart/index.html data

import { getLocalStorage, loadHeaderFooter, renderCartCount, setLocalStorage } from './utils.mjs';
import ShoppingCart from './ShoppingCart.mjs';

loadHeaderFooter(); //load the header/footer templates

const cart = new ShoppingCart('so-cart', '.product-list'); //Create new instance of Shopping Cart
cart.renderCartContents(); //pull cart contents from local storage
cart.calculateTotal();
//EVENT LISTENDER FOR CART DELETE BUTTONS
const deleteButtons = document.querySelectorAll('.close-btn'); //Grab all class .close-btn
deleteButtons.forEach((button) => {
    //create an event listener for each
    button.addEventListener('click', function () {
        cart.removeItem(button.getAttribute('data-id')); //call the cart method removeItem.  passing the data-id of the item to delete
        renderCartCount(); //recall the renderCartCount to update backpack icon
    });
});
const updateItemTotals = document.querySelectorAll('#qty-textbox');

updateItemTotals.forEach((input) => {
    //create an event listener for each
    input.addEventListener('change', function (ev) {
        let newKey = input.parentElement.getAttribute('Id');
        let newValue = ev.target.value
        // Get the existing data
        let existing = getLocalStorage('so-cart');

        //Add quantity to existing ID in item-count array
        for (let i = 0; i < existing.length; i++) {
            let obj = existing[i];
            if (newKey === obj.Id){
            obj.Q = newValue;
    
            }
        }
        // Save back to localStorage
        localStorage.setItem('so-cart', JSON.stringify(existing));
        location.reload();
        renderCartCount();
    });
});
