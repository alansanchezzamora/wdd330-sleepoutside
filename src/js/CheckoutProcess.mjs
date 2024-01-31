import {getLocalStorage,hideElement,showElement,getCartCount} from './utils.mjs';

export default class CheckoutProcess {

    constructor(key){
        this.key = key;
        this.count = 0;
        this.subTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.total = 0;
    }

    init(){
        this.calculateSubTotal();
        this.calculateTotals();
    }

    calculateSubTotal() {
        const cartItems = getLocalStorage(this.key);
        this.count = cartItems.length;
        for (let i = 0; i < this.count; i++) {
            let obj = cartItems[i];
            this.subTotal = obj.FinalPrice + this.subTotal;
        }
        // Rounding to the nearest hundredth decimal place
        this.subTotal = parseFloat(this.subTotal.toFixed(2));
    }

    calculateTotals(){
        //calcualte shipping
        if (this.count > 0){
            this.shipping = 10 + (2* (this.count-1));
        }
        this.shipping = this.shipping.toFixed(2);
        //calculate tax
        this.tax = (parseFloat(this.subTotal) * 0.06);
        this.tax = this.tax.toFixed(2);
        //calculate total
        this.total = parseFloat(this.tax) + parseFloat(this.subTotal) + parseFloat(this.shipping);
        this.total = this.total.toFixed(2);

        this.renderTotals();
    }

    renderTotals(){
        const shippingElement = document.getElementById('checkout-shipping');
        const taxElement = document.getElementById('checkout-tax');
        const totalElement = document.getElementById('checkout-total');
        const subTotalElement = document.getElementById('checkout-subtotal');

        subTotalElement.innerText = `Subtotal:  $${this.subTotal}`;
        shippingElement.innerText = `Shipping:  $${this.shipping}`;
        taxElement.innerText = `Tax:  $${this.tax}`;
        totalElement.innerText = `Total:  $${this.total}`;

    }
}