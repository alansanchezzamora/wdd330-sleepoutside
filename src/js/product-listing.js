//js for the product-listing html page
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter } from './utils.mjs';

//create ProductData object
const dataSource = new ProductData('tents');

//create listing object
const listing = new ProductList('tents', dataSource, 'ul');
//initialize listing object
listing.init();

//load header/footer wk 3
loadHeaderFooter();
