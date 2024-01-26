// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  //get existing Data from localStorage.  If it doesn't exist yet, make an empty array
  let existingData = getLocalStorage(key) || [];
  //append the new data to the existingData
  existingData.push(data);
  //save to localStorage
  localStorage.setItem(key, JSON.stringify(existingData));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

//week2
export function getParams(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  return product;
}

//used by ProductList
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear=false){
  const htmlStrings = list.map(templateFn);
  //use clear to wipe the element before loading with the template
  if (clear){
    parentElement.innerHTML = '';
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}


//Week3
export function renderWithTemplate(templateFn, parentElement, data, callback, position = "afterbegin"){
  //No idea what this is for...
  if(callback) {
    callback(data)
  }
  //insert the template data at the beginning of the element.
  parentElement.insertAdjacentHTML(position, templateFn);
}

export async function loadHeaderFooter(){
  //grab header/footer elements
  const header = document.getElementById('main-header');
  const footer = document.getElementById('main-footer');
  //grab the template data
  const headerTemplate = await loadTemplate('../public/partials/header.html');
  const footerTemplate = await loadTemplate('../public/partials/footer.html');
  renderWithTemplate(headerTemplate, header);
  renderWithTemplate(footerTemplate, footer);
  //moved renderCartCount into here so it's loaded after the Header/Footer is created since that is an async function.
  renderCartCount()
}
//fetch the template info
//note this is generic so could be reused if needed.
export async function loadTemplate(path) {
  const response = await fetch(path);
  const template = await response.text();
  return template
}

/* 
   _____          _____ _______    _____ ____  _    _ _   _ _______ ______ _____  
  / ____|   /\   |  __ \__   __|  / ____/ __ \| |  | | \ | |__   __|  ____|  __ \ 
 | |       /  \  | |__) | | |    | |   | |  | | |  | |  \| |  | |  | |__  | |__) |
 | |      / /\ \ |  _  /  | |    | |   | |  | | |  | | . ` |  | |  |  __| |  _  / 
 | |____ / ____ \| | \ \  | |    | |___| |__| | |__| | |\  |  | |  | |____| | \ \ 
  \_____/_/    \_\_|  \_\ |_|     \_____\____/ \____/|_| \_|  |_|  |______|_|  \_\
*/
//cart superscript
export function renderCartCount(){
  const cartCounter = document.getElementById('cart-count');
  const cartCount = getCartCount();
  //check if cart has items to toggle visibility
  if (cartCount>0){
    showElement(cartCounter);
  }
  else{
    hideElement(cartCounter);
  }
  //populate the div w/ the count
  cartCounter.innerText = cartCount;
}
//Toggle visibility of the cart depending on if something is in it
//default is hidden
export function showElement(element) {
  element.classList.add('visible');
  element.classList.remove('hidden');
}
export function hideElement(element) {
  element.classList.add('hidden');
  element.classList.remove('visible');
}
export function getCartCount() {
  const cart = getLocalStorage('so-cart');
  let cartCount = 0;
  if (cart !== null && cart !== undefined) {
    cartCount = cart.length;
  }
  return cartCount;
}

//remove dashes and capitalize a word used for category in a couple places
export function capitalizeWord(word) {
  word = word.replace(/-/g, ' ');
  const words = word.split(' ');
  const capitalizedWords = words.map(w => w.charAt(0).toUpperCase() + w.slice(1));
  return capitalizedWords.join(' ');
}

