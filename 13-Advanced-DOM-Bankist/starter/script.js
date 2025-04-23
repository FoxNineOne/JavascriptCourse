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

// Scroll to click event
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  // with what is returned.. "top" is ALWAYS same as "y"
  // "left is also always the same as "x"

  // Deprecated
  //console.log('Current scroll X/Y', window.pageXOffset, pageYOffset);
  //scrollx and scrolly are the future!
  console.log('Current scroll X/Y', window.scrollX, window.scrollY);
  // When clicked, the Y returned  measures the total distance from the current viewport and the top of the page.

  // Return back the height and width of the viewport
  console.log(
    'height/width of viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //Scrolling
  // first argument is the left position
  // second is the top
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );
  //This will stutter and move as the s1coords are relative to viewport
  // By adding the PageyOffset, the position passed is relative to the document, the entire page.

  //We can make the movement smoother
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  //more modern! less code only works in modern browsers.
  section1.scrollIntoView({ behavior: 'smooth' });

  //It was introduced in 2001, but the behavior argument is 2017 onwards

  //I'd assume it'd be rare to see someone rocking a pre-2017 browser now
});

////////////////////////////////////////////////
//                  LECTURES
////////////////////////////////////////////////
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
/*
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
//logo.className = 'Jiji';
*/

/*

Codewars break!

Your job is to write a simple password validation function, as seen on many websites.

The rules for a valid password are as follows:

There needs to be at least 1 uppercase letter.
There needs to be at least 1 lowercase letter.
There needs to be at least 1 number.
The password needs to be at least 8 characters long.
Your function takes a string argument and returns whether it is a valid password, as a boolean. 


function password(str) {
  const chars = [...str];
  //validate password
  // There needs to be at least 1 uppercase letter.
  const hasUpper = chars.some(c => c >= 'A' && c <= 'Z');
  // There needs to be at least 1 lowercase letter.
  const hasLower = chars.some(c => c >= 'a' && c <= 'z');
  // There needs to be at least 1 number.
  const hasDigit = chars.some(c => c >= '0' && c <= '9');
  // The password needs to be at least 8 characters long.
  return str.length >= 8 && hasUpper && hasLower && hasDigit;
}

*/
//EVENT THINGS
/*
// An event is basically a signal by a specific DOM node
let h1Limit = 1;
const h1 = document.querySelector('h1');
const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading!');
  if (h1Limit >= 3) {
    // We can remove the event listener
    h1.removeEventListener('mouseenter', alertH1);
  }
  h1Limit++;
  console.log(h1Limit);
};
h1.addEventListener('mouseenter', alertH1);
*/
// Old skool way , modern way is addEventListener
// h1.onmouseenter = function (e) {
//   if (h1Limit < 3) {
//     alert('addEventListener: Great! You are reading the heading!');
//   }
//   h1Limit++;
// };

// addEventListener because of reasons
// one being, we can add and remove multiple event listeners to the same event
// we

//Check Line 46 of index.html
//  <h1 onclick="alert('HTML alert!')">
// This will trigger on click of h1 class elements

// Event Propragation : Bubbling and Capturing

// CAPTURING PHASE STARTS   from Document down through , HTML, BODY, SECTGION, Paragraph , Img, Link
// to  the TARGET, and we hit TARGET PHASE
// BUBBLING goes in reverse from TARGET, through parent elements to DOCUMENT
// It does not pass through sibling elements

// Bubbling and Capturing are the two phases of propagation. In their simplest definitions, bubbling travels from the target to the root,
// and capturing travels from the root to the target.

// Important to know because basically it's as ig the event happened in each of the parent elements

// If we attach swame event listener to a and section element, we'd get same alert window from both.
// This behaviour will allow us to make impressive patterns

//By default, events can only be handled in the target, or the bubbling phase
// However, we can set up event listeners in a way that they listen to events in the capturing phase instead

// Not all types of events have a capture/bubble phase. some are created right on the target element.

// Events propogate
// Propagation refers to how events travel through the
//  Document Object Model (DOM) tree.

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColour = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

//console.log(randomColour(0, 255));

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColour(0, 255);
  console.log('Link', e.target, e.currentTarget);
  // console.log(e.currentTarget === this); // e.target is same as "this"

  // Stop propogation
  //e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColour(0, 255);
  console.log('Container', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColour(0, 255);
    console.log('Nav', e.target, e.currentTarget); //Where the event originated, where it first happened
  } //,  true
);

// The reason teh same e.target is returned is because all three events trigger from teh same target
// the target bubbles up through the parents triggering all the events.

// Current target will show the current target (i.e where the eventListener triggers from)

//We can stop event propogation with   e.stopPropagation();
// This will stop the bubbling up to parent elements.

// In practise, not usually a good idea.

// Events are captured when they come down from Document root, to Target
// event handlers are not picking up events during capture phase
// add event listener is for bubbling phase - by default

// Whereas Bubbling is useful for event delegation
// Capturing is usually irrelevant, not much use

// If we really want to catch events during the capture phase
// we can define a third parameter in addEventListener function (boolean)

//The above example's behaviour looks the same, but if you check the log when event fires, you'll see the parent console log is returned first, then the next child, and so on until root.
// This is in reverse.. or morese in the Capture order, compared to the default (Bubbling)

//This is because the Nav Event is now listening for the event as it travels from teh DOM, but the other two are listening as the event travels back up (bubbling)
// Therefore, NAV is first to show up! 🏁
