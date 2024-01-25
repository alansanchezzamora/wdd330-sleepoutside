import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
//js for the main html page
import { loadHeaderFooter, getParams } from './utils.mjs';

//load header/footer wk 3
loadHeaderFooter();

const category = getParams('category');
// first create an instance of our ProductData class.
const dataSource = new ProductData();
// then get the element we want the product list to render in
const listElement = document.querySelector('.product-list');
// then create an instance of our ProductList class and send it the correct information.
const myList = new ProductList(category, dataSource, listElement);

// finally call the init method to show our products
myList.init();
