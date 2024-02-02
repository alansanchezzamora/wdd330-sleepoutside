//used by product.js to populate product details in the product_pages/index.html by passing on the ProductData to ProductDetails
//This class builds the path to the appropriate json file (based on category - e.g. tents)
  //getData will return all the products in the category.  This is used by productDetails.mjs which then uses
    //findProductByID which returns just the details for a given id in the category

    
const baseURL = import.meta.env.VITE_SERVER_URL



//added this to account for our server env missing a trailing /, so add it if it's missing
//if it gets added later, it'll not impact the code.  
//const adjustedBaseURL = baseURL.endsWith('/') ? baseURL : baseURL + '/';

//Grabs the Product Info from json
async function convertToJson(res) {
  //convert reponse to json to collect all the info the server passes back
  const jsonRes = await res.json();
  //console.log('json',JSON.stringify(jsonRes))
  //if check if respone = ok
  if (res.ok) {
    return jsonRes;
  } else {
    //if it's not ok, throw the error the server gives us
    throw {name: "servicesError", message: jsonRes};
  }
}

export default class ExternalServices {
  async getData(category) {

    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }  
  async findProductById(id) {
    const products = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(products);
    return data.Result;
  }
  async checkout(payload) {
    //const checkoutURL = "https://wdd330-backend.onrender.com:3000/";
    //const checkoutURL = "http://server-nodejs.cit.byui.edu:3000/";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }
}

