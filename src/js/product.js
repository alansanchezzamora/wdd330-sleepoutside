//js for the product page
//get the productid from dynamic searchquery (url) using getParams in utils.js
//create product Data class from json using ProductData in ProductData.js
//create a ProductDetails class based on the id and data class.
//initialize productDetails which builds the product page detils

import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';
import { getParams } from './utils.mjs';

const productId = getParams('product');
const dataSource = new ProductData('tents');

const product = new ProductDetails(productId, dataSource);
product.init();
