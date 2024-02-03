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
/*
░█▀▀░█▀▀░▀█▀░░█▀█░█▀█░█▀▄░█▀█░█▄█░█▀▀
░█░█░█▀▀░░█░░░█▀▀░█▀█░█▀▄░█▀█░█░█░▀▀█
░▀▀▀░▀▀▀░░▀░░░▀░░░▀░▀░▀░▀░▀░▀░▀░▀░▀▀▀
*/
//week2
export function getParams(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  return product;
}

/* 
░█▀▄░█▀▀░█▀█░█▀▄░█▀▀░█▀▄░░█░░░▀█▀░█▀▀░▀█▀░░░▀█▀░█▀▀░█▄█░█▀█░█░░░█▀█░▀█▀░█▀▀
░█▀▄░█▀▀░█░█░█░█░█▀▀░█▀▄░░█░░░░█░░▀▀█░░█░░░░░█░░█▀▀░█░█░█▀▀░█░░░█▀█░░█░░█▀▀
░▀░▀░▀▀▀░▀░▀░▀▀░░▀▀▀░▀░▀░░▀▀▀░▀▀▀░▀▀▀░░▀░░░░░▀░░▀▀▀░▀░▀░▀░░░▀▀▀░▀░▀░░▀░░▀▀▀
*/
//used by ProductList
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear=false){
  const htmlStrings = list.map(templateFn);
  //use clear to wipe the element before loading with the template
  if (clear){
    parentElement.innerHTML = '';
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}
/*
░█▀▄░█▀▀░█▀█░█▀▄░█▀▀░█▀▄░░▀█▀░█▀▀░█▄█░█▀█░█░░░█▀█░▀█▀░█▀▀
░█▀▄░█▀▀░█░█░█░█░█▀▀░█▀▄░░░█░░█▀▀░█░█░█▀▀░█░░░█▀█░░█░░█▀▀
░▀░▀░▀▀▀░▀░▀░▀▀░░▀▀▀░▀░▀░░░▀░░▀▀▀░▀░▀░▀░░░▀▀▀░▀░▀░░▀░░▀▀▀
*/
export function renderWithTemplate(templateFn, parentElement, data, callback, position = "afterbegin"){
  //No idea what this is for...
  if(callback) {
    callback(data)
  }
  //insert the template data at the beginning of the element.
  parentElement.insertAdjacentHTML(position, templateFn);
}

/* 
░█░░░█▀█░█▀█░█▀▄░░█░█░█▀▀░█▀█░█▀▄░█▀▀░█▀▄░░░█░█▀▀░█▀█░█▀█░▀█▀░█▀▀░█▀▄
░█░░░█░█░█▀█░█░█░░█▀█░█▀▀░█▀█░█░█░█▀▀░█▀▄░▄▀░░█▀▀░█░█░█░█░░█░░█▀▀░█▀▄
░▀▀▀░▀▀▀░▀░▀░▀▀░░░▀░▀░▀▀▀░▀░▀░▀▀░░▀▀▀░▀░▀░▀░░░▀░░░▀▀▀░▀▀▀░░▀░░▀▀▀░▀░▀
*/
export async function loadHeaderFooter(){
  //grab header/footer elements
  const header = document.getElementById('main-header');
  const footer = document.getElementById('main-footer');
  //grab the template data
  const headerTemplate = await loadTemplate('../partials/header.html');
  const footerTemplate = await loadTemplate('../partials/footer.html');
  renderWithTemplate(headerTemplate, header);
  renderWithTemplate(footerTemplate, footer);
  renderCartCount(); //recall the renderCartCount to update backpack icon
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
░█▀▀░█▀█░█▀▄░▀█▀░░█▀▀░█▀█░█░█░█▀█░▀█▀░█▀▀░█▀▄
░█░░░█▀█░█▀▄░░█░░░█░░░█░█░█░█░█░█░░█░░█▀▀░█▀▄
░▀▀▀░▀░▀░▀░▀░░▀░░░▀▀▀░▀▀▀░▀▀▀░▀░▀░░▀░░▀▀▀░▀░▀
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

/* 
░█░█░▀█▀░█▀▄░█▀▀░░█▀▀░█░░░█▀▀░█▄█░█▀▀░█▀█░▀█▀
░█▀█░░█░░█░█░█▀▀░░█▀▀░█░░░█▀▀░█░█░█▀▀░█░█░░█░
░▀░▀░▀▀▀░▀▀░░▀▀▀░░▀▀▀░▀▀▀░▀▀▀░▀░▀░▀▀▀░▀░▀░░▀░
*/
//Toggle visibility of the cart counter depending on if something is in it
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

/* 
░█▀▀░█▀█░█▀▄░▀█▀░░█▀█░█▀█░▀█▀░█▄█░█▀█░▀█▀░▀█▀░█▀█░█▀█
░█░░░█▀█░█▀▄░░█░░░█▀█░█░█░░█░░█░█░█▀█░░█░░░█░░█░█░█░█
░▀▀▀░▀░▀░▀░▀░░▀░░░▀░▀░▀░▀░▀▀▀░▀░▀░▀░▀░░▀░░▀▀▀░▀▀▀░▀░▀
*/

export function startAnimateCartIcon() {
  const cart = document.querySelector('.cart');
  cart.classList.add('animate');
}

export function stopAnimateCartIcon() {
  const cart = document.querySelector('.cart');
  cart.classList.remove('animate');
}


/* 
░█▀▀░█░░░█▀▀░█▀█░█▀█░░░░░░░█▀▀░█▀█░█▀█░▀█▀░▀█▀░█▀█░█░░░▀█▀░▀▀█░█▀▀
░█░░░█░░░█▀▀░█▀█░█░█░░▄█▄░░█░░░█▀█░█▀▀░░█░░░█░░█▀█░█░░░░█░░▄▀░░█▀▀
░▀▀▀░▀▀▀░▀▀▀░▀░▀░▀░▀░░░▀░░░▀▀▀░▀░▀░▀░░░▀▀▀░░▀░░▀░▀░▀▀▀░▀▀▀░▀▀▀░▀▀▀
*/
//remove dashes and capitalize a word used for category in a couple places
export function capitalizeWord(word) {
  if (word !== null) {
  word = word.replace(/-/g, ' ');
  const words = word.split(' ');
  const capitalizedWords = words.map(w => w.charAt(0).toUpperCase() + w.slice(1));
  return capitalizedWords.join(' ');}
}


/* 
░█▀█░█▀█░█▀█░░░░░█░█░█▀█░░█▄█░█▀▀░█▀▀░█▀▀░█▀█░█▀▀░█▀▀
░█▀▀░█░█░█▀▀░▄▄▄░█░█░█▀▀░░█░█░█▀▀░▀▀█░▀▀█░█▀█░█░█░█▀▀
░▀░░░▀▀▀░▀░░░░░░░▀▀▀░▀░░░░▀░▀░▀▀▀░▀▀▀░▀▀▀░▀░▀░▀▀▀░▀▀▀
*/
//Checkout Error Messaging
export function alertMessage(message, scroll=true, element){
  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.innerHTML = `<p>${message}</p><span>X</span>`
  //remove a message if its clicked on
  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      myElement.removeChild(this);
    }
  });
  //add to the element doc
  const myElement = document.getElementById(element);
  myElement.prepend(alert);
  //scroll to top
  if(scroll){
    window.scrollTo(0,0);
  } 
}

/* 
░█▀▄░█▀▀░█▄█░█▀█░█░█░█▀▀░░█▄█░█▀▀░█▀▀░█▀▀░█▀█░█▀▀░█▀▀
░█▀▄░█▀▀░█░█░█░█░▀▄▀░█▀▀░░█░█░█▀▀░▀▀█░▀▀█░█▀█░█░█░█▀▀
░▀░▀░▀▀▀░▀░▀░▀▀▀░░▀░░▀▀▀░░▀░▀░▀▀▀░▀▀▀░▀▀▀░▀░▀░▀▀▀░▀▀▀
*/
export function removeAllAlerts(element, fade=false){
  //if fade=true, it'll apply the fade-out class which animates a fadeout, then it removes the element
  //else, it just removes the element (cause it was clicked)
  const alerts = document.querySelectorAll('.alert');
  if (fade!=false){
    alerts.forEach((alert) => {
      alert.classList.add('fade-out');
      alert.addEventListener('animationend', () => {
        alerts.forEach((alert)=> document.getElementById(element).removeChild(alert));
      });
    });
  }
  else{
    alerts.forEach((alert)=> document.getElementById(element).removeChild(alert));
  }
}