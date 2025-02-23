"use strict-mode";

//Inside variable
const readline = require("readline");

const notes = ["C", "D", "E", "F", "G", "A", "B"];
const majMin = [true, false];

let noteIndex = 0;
let chordIndex = 0;
let chordMode = false;

// Using an asynce await function for an wait before exit timer
async function delayedExit() {
  await new Promise((resolve) => setTimeout(resolve, 5000)); //waits for 5 seconds (5k milliseconds)
  process.exit(0);
}

const newChord = function () {
  let nextChordIndex = Math.trunc(Math.random() * 7) + 1;
  for (
    nextChordIndex === noteIndex;
    nextChordIndex === noteIndex;
    nextChordIndex++
  ) {
    // console.log(`dupe detected`);
  }
  noteNumber = nextChordIndex;
  chordIndex = Math.trunc(Math.random() * 2);

  if (majMin[chordIndex]) {
    chordMode = `major`;
  } else {
    chordMode = `minor`;
  }

  console.log(`${notes[noteNumber - 1]} ${chordMode}`);
};

//console.log(noteNumber, majMinNumber);

//Add a switch to say if you want set Minor, Major, or Generate

//Add a response to regenerate

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let exitCounter = 0;

const promptForChord = function () {
  rl.question(`Press Y to regenerate | E to exit: `, function (answer) {
    if (answer.toUpperCase() === `Y`) {
      newChord();
      promptForChord(); // Recursive call to keep prompting
    } else if (answer.toUpperCase() === `E`) {
      rl.close(); // Close the readline interface
      console.log(`Exiting. Listen to Zorro Sombre.`);
      delayedExit();
    } else {
      console.log(`Invalid input. Please try again.
      Press Y to regenerate | E to exit:`);
      exitCounter++;
      if (exitCounter < 2) {
        promptForChord(); // Prompt again if counter < 2
      } else {
        rl.close(); // Close the readline interface if counter reaches 2
        console.log(`Exiting. Listen to Zorro Sombre.`);
        delayedExit();
      }
    }
  });
};

// Initial call to start prompting
newChord();
promptForChord();
