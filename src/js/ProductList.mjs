//purpose is to generate a list of product cards in HTML from an array
//Will feed into the main html page
    //create a template to populate product card details
    //class to handle productListing info.
    //filter out bad id's for tents.  May need a diff way to filter later?

import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product){
    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img src="${product.Image}" alt="${product.Name} ">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`
}


export default class ProductList{
    constructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = document.querySelector(listElement);
    }
    async init(){
        const productList = await this.dataSource.getData();
        this.renderList(productList)
    }
    
    renderList(productList){
        //filter out bad products before sending to render
        this.filter(productList);
        renderListWithTemplate(productCardTemplate, this.listElement, productList, 'afterbegin', false);
    }

    filter(productList){
        //filtering out by hardcoded id.  feels brute force but not seeing another way to filter?
        const idFilters = ["880RT", "989CG"];
        Object.keys(productList).forEach(key => {
            const product = productList[key];
            if (idFilters.includes(product.Id)) {
                delete productList[key];
            }
        });
    }

}