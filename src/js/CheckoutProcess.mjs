import {getLocalStorage, alertMessage, removeAllAlerts} from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';

const services = new ExternalServices();

function formDataToJSON(formElement){
    const formData = new FormData(formElement),
    convertedJSON = {};

    formData.forEach(function (value,key){
        convertedJSON[key] = value;
    })

    return convertedJSON;
}
function packageItems(items){
    const newItems = items.map((product) => {
        return{
            id: product.Id,
            price: product.FinalPrice,
            name: product.Name,
            quantity: 1,
        };
    });
    return newItems;
}

export default class CheckoutProcess {
    constructor(key){
        this.key = key;
        this.list = [];
        this.count = 0;
        this.subTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.total = 0;
    }
    init(){
        //moved this up here so we can have some logic off the start to not calculate things if cart is empty...
        this.list = getLocalStorage(this.key);
        //only update this.count if it's not empty, else leave at 0
        if (this.list){
            this.count = this.list.length;
        }
        // only calculate things if cart isn't empty and there's something in it
        if (this.count > 0 && this.list){
            this.calculateSubTotal();
            this.calculateTotals();
        }
    }
    calculateSubTotal() {
        //moved these to init.  see msg up there.
        //this.list = getLocalStorage(this.key);
        //this.count = this.list.length;
        for (let i = 0; i < this.count; i++) {
            let obj = this.list[i];
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
    async checkout (){
        const formElement =  document.forms["checkout"];
        const json = formDataToJSON(formElement);

        json.orderDate = new Date();
        json.orderTotal = parseFloat(this.total);
        json.tax = parseFloat(this.tax);
        json.shipping = parseFloat(this.shipping);
        json.items = packageItems(this.list);

        //cleanup any left over error message:
        removeAllAlerts('checkout-messages')
        //catch errors, do things based on that
        try {
            const res = await services.checkout(json);
            if (res.message == 'Order Placed'){
                location.assign('../checkout/success.html');
                localStorage.removeItem('so-cart');
            }
            console.log(res);
        } catch (err) {
            console.log(err);
            for(let message in err.message)
            alertMessage(err.message[message], true, 'checkout-messages')
        }

    }
}