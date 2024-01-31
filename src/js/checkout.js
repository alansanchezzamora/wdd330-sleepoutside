//used to populate checkout/index.html data
import CheckoutProcess from './CheckoutProcess.mjs';
import { loadHeaderFooter } from './utils.mjs';

//Loads in the Header/Footer Templates
loadHeaderFooter();

const checkout = new CheckoutProcess('so-cart');
checkout.init();
//checkout.calculateSubTotal();

