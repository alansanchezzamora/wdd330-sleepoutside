//js for the product-listing html page
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParams, capitalizeWord } from './utils.mjs';

//wk3 remove and replace w/ generic category method
//create ProductData object
//const dataSource = new ProductData('tents');
////create listing object
//const listing = new ProductList('tents', dataSource, 'ul');
////initialize listing object
//listing.init();

//Gets the category, creates a new dataSource object based on the category (grabs the json), then creates a new listing object and renders it under .product-list
const category = getParams('category');
const dataSource = new ProductData();
const listing = new ProductList(category, dataSource, '.product-list');
listing.init();
//add category name to Top Products on html page & breadcrumb
const categoryElement = document.getElementById('category-name');
//passing into inner html and capitalizing the first letter.  why js..why?
//categoryElement.innerHTML = `${category
//  .charAt(0)
//  .toUpperCase()}${category.slice(1)}`;
categoryElement.innerHTML = capitalizeWord(category);

//load header/footer wk 3
loadHeaderFooter();
