import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';
import {getParams } from './utils.mjs';

const productId = getParams('product');
const dataSource = new ProductData('tents');

const product = new ProductDetails(productId, dataSource);
product.init();
