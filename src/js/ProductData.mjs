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
  constructor(category) {
    //removed for wk3 activity, using API
    //this.category = category;
    //this.path = `../json/${this.category}.json`;

  }
  async getData(category) {
    //wk 3 change, switching to use API
    //return fetch(this.path)
    //  .then(convertToJson)
    //  .then((data) => data);
      const response = await fetch(baseURL + `products/search/${category}`);
      const data = await convertToJson(response);
      return data.Result;
  }
  async findProductById(id) {
    //wk change, switching to API
    //const products = await this.getData();
    //return products.find((item) => item.Id === id);
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;

  }
}
