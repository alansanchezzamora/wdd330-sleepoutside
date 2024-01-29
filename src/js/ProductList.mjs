//purpose is to generate a list of product cards in HTML from an array
//Will feed into the main html page
    //create a template to populate product card details
    //class to handle productListing info.
    //filter out bad id's for tents.  May need a diff way to filter later?

import { renderListWithTemplate, capitalizeWord} from "./utils.mjs";

//Template literal for product cards on main page
function productCardTemplate(product){
    return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name} ">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
    </li>`
}


//Product List class used on main page to list out products from json, 
//calls renderList to actually display the info from the ProductList class using the template
//filter is used to manually filter out broken products in the json file.  
//TODO - I'd like to move the filter IDs into a JSON and pull from that dynamically.  So an admin could just keep the filter.json file updated on what products they don't want displayed.  
export default class ProductList{
    constructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = document.querySelector(".product-list");
        this.productCount = 0;
    }
    async init(){
        const productList = await this.dataSource.getData(this.category);
        this.renderList(productList)
        this.counter(productList)
        this.renderBreadCrumb(productList)
    }
    renderList(productList){
        //filter out bad products before sending to render
        this.filter(productList);
        renderListWithTemplate(productCardTemplate, this.listElement, productList, 'afterbegin', false);
    }
    //passes the info into the html for breadcrumb
    renderBreadCrumb(productList){
        const breadcrumbCountElement = document.getElementById('breadcrumb-count');
        //passing into breadcrumb
        breadcrumbCountElement.innerHTML = `${capitalizeWord(this.category)}: ${this.productCount} Items`;
    }
    //counts number of items in the list for the breadcrumb. 
    counter(productList){
        Object.keys(productList).forEach(key => {
            this.productCount += 1;
        });
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
