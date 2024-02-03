//Feeds into product.js which feeds the product_pages/index.html
//contain code to dynamically produce the product details
//also contains the addToCart method
import {setLocalStorage, renderCartCount, capitalizeWord, alertMessage, removeAllAlerts, startAnimateCartIcon, stopAnimateCartIcon, getLocalStorage} from './utils.mjs';


//template literal to populate the detail information for the given product
function productDetailsTemplate(product) {
    return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
      <h2 class="divider">${product.NameWithoutBrand}</h2>
      <img
        class="divider"
        src="${product.Images.PrimaryLarge}"
        alt="${product.NameWithoutBrand}"
      />
      <p class="product-card__price">$${product.FinalPrice}</p>
      <p class="product__color">${product.Colors[0].ColorName}</p>
      <p class="product__description">
      ${product.DescriptionHtmlSimple}
      </p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div></section>`;
}

//ProductDetail class.  Data is dynamically pulled from json file based on id
//dataSource input determine the path to the json file.  So this decides what category (tent vs backpack, etc)
//initialization actually grabs the data for the id, then calls the renderProductDetails and contains the event listener for the addToCart
export default class ProductDetail {
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init() {
        // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        this.product = await this.dataSource.findProductById(this.productId);
        // once we have the product details we can render out the HTML
        this.renderProductDetails("main");
        // once the HTML is rendered we can add a listener to Add to Cart button
        // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
        document.getElementById('addToCart')
          .addEventListener('click', this.addToCart.bind(this));
        this.renderBreadCrumb(this.product.Category);
    }
    //simply adds the product info to the local storage.
    addToCart(){
        let cart = getLocalStorage('so-cart');

          if (cart){

              if(cart.some(cart=> cart.Id === this.product.Id )){
                cart.forEach(element => {
                if (this.product.Id === element.Id){
                  element.Q++
                };
                localStorage.setItem('so-cart', JSON.stringify(cart));
                });
              }else{
                   this.addItem(this.product);
                 };

            } else {
              this.addItem(this.product);
             };
            //added here to update cart counter each time you add an item
            renderCartCount();
            removeAllAlerts('add-to-cart-message');
            alertMessage(`${this.product.NameWithoutBrand} Added To Cart`, true, 'add-to-cart-message')
            setTimeout(() => {removeAllAlerts('add-to-cart-message', true)}, 2500);
            startAnimateCartIcon();
            setTimeout(() => {stopAnimateCartIcon()}, 500);
    };
    //populates the details on the product page using the template
    //selector determines what element to attach the details to
    renderProductDetails(selector){
        //method to generate HTML to display our product
        const element = document.querySelector(selector);
        element.insertAdjacentHTML(
            "afterBegin",
            productDetailsTemplate(this.product)
        )
    } 
    renderBreadCrumb(category){
      const breadcrumbElement = document.getElementById('breadcrumb-category');
      breadcrumbElement.innerHTML = `${capitalizeWord(category)}`;
      breadcrumbElement.setAttribute('href',`../product-listing/index.html?category=${category}`);
    } 
    addItem(product){
      this.product["Q"] = 1;
      setLocalStorage('so-cart', this.product); 
    }
}