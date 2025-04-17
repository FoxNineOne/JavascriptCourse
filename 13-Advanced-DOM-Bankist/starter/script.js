'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////////////
//LECTURES

// The DOM (Document Object Model) is the interface between js and the Browser
// We can write Javascript to create, modify and delete HTML elements
// We can set styles, classess, atrributes
// We can listen and repsond to events

// DOM tree is generated from an HTML document, which we can then interact with

// DOM is a very complex API that contains lots of methods and properties
// to interact with the DOM tree
/*
 Every single node of the DOM tree is of type Node
 Each Node is represented by an object
 This object gets access to special node methods and properties
 such as .textContent, .childNodes, .parentNodes, .cloneNode()

There are different types of nodes.. how are these represented?
Node type can have child trytpes

Element type
  Element  
  text type // <p> I like jam </p>
  comment type // <!-- Comment --> 
  document type


Each Element will be represented internally as an object
The Element type has internally, a HTML child type
And that element itself, has exactly one child type for each HTML element that exists in HTML
A special type for buttons, for images, for links etc.

Because of each of these HTML element can have different properties (i.e img has src attribute, links have href etc)


What makes all of this work is "inheritance"
Inheritance means that all the child types will be able to access the methods and properties of all of their parent node types

a html element will get everything from the element type (innerHTML, classlist)
it will also get from the Node grandparent 


Document is in fact just another type of node.
It contains methods such as Query Selector, create Element, get ElementbyID
Query selector is available on Element and Document types.


The DOM API needs a way of allowing all the node types to listen to events
We usually do this by ".addEventListener()" why does this work?

There is a special eventType called EventTarget, which is a parent of both the Node type
and the Window Node Type.

Thanks to inheritance,  we can addEventListened on every single type of node in the DOM API
because all elements will inherit this method.

We never manuall create an Event Target.

MDN documentation will explain more.. (youtube might be easier)
*/

// How to select, create and delete elements with Javascript!

// SELECTING ELEMENTS

// document is not enough, we need .documentElement
// document is not the real DOM element
// if we want to affect css styling , we need .documentElement
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

// Will retrieve the first that matches the selector
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');

// If we want to select multiple, use ALL
// Returns NodeList
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
//Return all buttons, returns HTML collectio9n
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);
// HTML collection is a "live collection"
// If the DOM changes, this collection is automatically updated also

// This does not happen with a nodelist
// If you remove any elements from nodeList.. the list will not update automatically.

console.log(document.getElementsByClassName('btn'));

// CREATING AND INSERTING ELEMENTS
// We can create HTML using .insertAdjacentHTML

//
const message = document.createElement('div'); //returns a DOM element
// This element is not yet anywhere in our DOM, but is a DOM element
//Add class
message.classList.add('cookie-message');

//Add text
// message.textContent = `We use cookies for improved functionality, analytics, and to watch you bathe in our recreational hours.`;
message.innerHTML = `We use cookies for improved functionality, analytics, and to watch you bathe during our recreational hours. <button class="btn btn--close-cookie">Got it! 👍🏽</button>`;

//Add message above header, at the top of the page!
//header.prepend(message);
// Or at the bottom of the current page view
//header.append(message);
//It is now in the DOM!

//It is only inserted once it's in a live element.
// It went from being first child of header (prepend) to last (append)

// DOM elements are unique, can only exist as one place at a time

// What if we  wanted multiple instances of same element?

//COPY!
// header.append(message.cloneNode(true)); //true means all child elements will be copied.

//before and after

header.before(message); //before Header but as a sibling
//header.after(message); // after Header but as a simbling

// DELETE ELEMENTS!
document
  .querySelector('.btn--close-cookie') //have to add the dot!!
  .addEventListener('click', function () {
    message.remove(); //This is new! before this we can only remove child eleemnts from the parent level

    //This is how amish web devs used to do it - DOM Traversing!
    //message.parentElement.removeChild(message);
  });

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

//these styles are inline - set directly in the DOM
console.log(message.style.width); // this will return the value, as we've previously set it from the js script
console.log(message.style.height); //this weill return nothing, as we haven't set it

//if we want styles we can use getComputedStyle function

console.log(getComputedStyle(message));
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

//root in css
document.documentElement.style.setProperty('--color-primary', 'purple');

// Attributes
const logo = document.querySelector('.nav__logo');
//logo.src =   'https://images.seeklogo.com/logo-png/37/1/elmo-logo-png_seeklogo-379479.png';
logo.alt = 'Beautiful minimalist logo';
console.log(logo.alt);
//return class
console.log(logo.className);

//Non-standard
//console.log(logo.designer); // will not return
console.log(logo.getAttribute('designer')); // use getAttribute to return value
console.log(logo.alt);

//Set Attribute
console.log(logo.setAttribute('company', 'Bankist'));
console.log(logo.getAttribute('company'));

//This pulls the relative (local) URL to the logo image
console.log(logo.getAttribute('src'));

// This pulls the absolute (full http) url of the logo image
console.log(logo.src);

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data atrributes --camel casing
console.log(logo.dataset.versionNumber);

// Classes LEARN WHAT THESE DO
logo.classList.add('c', 'c1', 'c2');
logo.classList.remove('c');
logo.classList.toggle('c1');
logo.classList.contains('c2'); //contains for this, includes for Arrays

// Don't use as it'll overwrite ALL existing classes, the above are less destructive
logo.className = 'Jiji';
