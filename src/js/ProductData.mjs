//used by product.js to populate product details in the product_pages/index.html by passing on the ProductData to ProductDetails
//This class builds the path to the appropriate json file (based on category - e.g. tents)
  //getData will return all the products in the category.  This is used by productDetails.mjs which then uses
    //findProductByID which returns just the details for a given id in the category

    
const baseURL = import.meta.env.VITE_SERVER_URL

//Grabs the Product Info from json
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  async getData(category) {
    //added this to account for our server env missing a trailing /, so add it if it's missing
    //if it gets added later, it'll not impact the code.  
    const adjustedBaseURL = baseURL.endsWith('/') ? baseURL : baseURL + '/';
    const response = await fetch(adjustedBaseURL + `products/search/${category}`);
    //console.table(response);
    const data = await convertToJson(response);
    return data.Result;
  }  
  async findProductById(id) {
    const products = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(products);
    return data.Result;
  }
}

