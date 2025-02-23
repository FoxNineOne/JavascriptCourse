// Coding Challenge #1
/* Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an
array with the number of replies for each option. This data is stored in the starter
'poll' object below.
Your tasks:
*/

//Test data for bonus:
// Data 1: [5, 2, 3]
// Data 2: [1, 5, 3, 9, 6, 1]
//Hints: Use many of the tools you learned about in this and the last section �

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer: function () {
    const answer = Number(
      prompt(`${this.question}\n${this.options.join('\n')}`)
    );

    console.log('You have answered:', this.options[answer] || answer);

    if (Number(answer) <= this.options.length - 1 && Number(answer) >= 0) {
      this.answers[answer]++;
      console.log(this.answers);
    } else {
      console.log(
        `Please supply a number between 0 and ${this.options.length - 1}`
      );
    }
    this.displayResults(this.answers);
  },
  displayResults: function (type = 'array') {
    if (type == 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

/*
    //Short circuiting can ahieve this . Both instances have to be true to update array
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;
*/

//poll.displayResults([1, 2, 3, 4]);
//poll.displayResults('1,2,3,4');
//poll.registerNewAnswer();
//poll.registerNewAnswer();
//poll.registerNewAnswer();

/* 1. Create a method called 'registerNewAnswer' on the 'poll' object. The
method does 2 things:

1.1. Display a prompt window for the user to input the number of the
selected option. The prompt should look like this:
What is your favourite programming language?
0: JavaScript
1: Python
2: Rust
3: C++
(Write option number) */

/*1.2. Based on the input number, update the 'answers' array property. 
For example: if the option is 3, 
increase the value at position 3 of the array by 1. 

Make sure to check if the input is a number 
and if the number makes sense (e.g. answer 52 wouldn't make sense, right?)
*/

// 2. Call this method whenever the user clicks the "Answer poll" button.

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));
1;

/* 3. Create a method 'displayResults' which displays the poll results. The
method takes a string as an input (called 'type'), which can be either 'string'
or 'array'. 
If type is 'array', simply display the results array as it is, using
console.log(). 
This should be the default option. 
If type is 'string', display a string like "Poll results are 13, 2, 4, 1".*/

//So array is to be displayed as array, but string is  being joined?

/*4. Run the 'displayResults' method at the end of each
'registerNewAnswer' method call. */

/*5. Bonus: Use the 'displayResults' method to display the 2 arrays in the test
data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll
object! So what should the this keyword look like in this situation?*/

poll.displayResults.call({ answers: [5, 2, 3] });
poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');

// Coding Challenge #2
//  This is more of a thinking challenge than a coding challenge �
// Your tasks:

/* 1. Take the (Immeidately Invoked Function Expeession) IIFE below and at the end of the function, 
attach an event listener that changes the color of the selected h1 element ('header') to blue, 
each time the body element is clicked. Do not select the h1 element again! */

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  //document.body also works.. as we're only interested in body clicks right now.
  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
    setTimeout(function () {
      header.style.color = 'white';
    }, 500);
  });
})();

/* 2. And now explain to yourself (or someone around you) why this worked! Take all
the time you need. Think about when exactly the callback function is executed,
and what that means for the variables involved in this example.

GOOD LUCK 🦊*/

/*
This IIFE works because it is executed immediately. 
As it's an IIFE, it isn't assigned to a variable, so it's scope is private. 
Albeit prviate the IIFE contains a callback function that will changer the header variable's style colour
 to blue when a click is registered on the webpage's body.
 The callback function has closure, as the header is inaccesible and private, but is accessible to the eventListener callback.
 
Immediately after (cos I wanted to) a timeout function is in effect, and after half a second, the text turns white.
*/
