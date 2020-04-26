//Random Range of Vales
function randomRange(min, max) {
  return Math.floor(Math.random() * Math.floor(max-(min-1))) + Math.floor(min);
}

//Declare Globals
let sw = process.stdout.columns //screen width
let output= '' //declare string holder for ASCII
let w = 0 //pos (width)
let setNum = ''
let getChar = ''
let state_swtich=0
let count = 0 // count prints
let count_trig = randomRange(3000, 6000); //threshold to trig new state


//Function to ensure values never leave screen bounds
function screen_clip (val, sw) {
  if (val < 0) {return 0}
  else if (val > sw) {return sw}
  else {return val}
}

//Micro Character Weights
const w1=randomRange(1, 50)
const w2=randomRange(1, 50)
const w3=randomRange(1, 50)
const w4=randomRange(1, 50)
const w5=randomRange(1, 50)
const w6=randomRange(1, 50)
const w7=randomRange(1, 50)
const w8=randomRange(1, 50)
const w9=randomRange(1, 50)
const w10=randomRange(1, 50)

//Macro Character Weights
let mw0=60
let mw1=randomRange(10, 50)
let mw2=randomRange(10, 50)
let mw3=randomRange(10, 50)
let mw4=randomRange(10, 50)

// Time weights
let tw_fast=80
let tw_med=60
let tw_slow=40
let tw_slower=30
let tw_steady = 20

//Collection of times and their weights
let TIME_WEIGHTS = {
  'low':
  [  //["char",      weight]
      [1,  tw_fast],
      [10,  tw_med],
      [150,  tw_slow],
      [300,  tw_slower],
      [500,  tw_steady]
  ],
  'high':
  [  //["char",      weight]
      [10,  tw_fast],
      [100,  tw_med],
      [300,  tw_slow],
      [1001,  tw_slower],
      [500,  tw_steady]
  ]
  };

//Collection of chars colletions
let CHAR_COL_WEIGHTS = {
  '0':
  [  //["char",      weight]
      ['0',  mw0],
      ['1',  mw1],
      ['2',  mw2],
      ['3',  mw3],
      ['4',  mw1]
  ]
  };

//Collection of chars with weights
let CHARS = {
  '0':
  [[' ', w1], ['  ', w2],['   ', w3],['    ', w4],['     ', w5],
   ['      ', w6],['       ', w7],['        ', w8],['         ', w9],
   ['          ', w10],
  ['                          ', 30]],

  '1':
  [['▖', w1],['▗', w2],['▘', w3],['▙', w4],['▚', w5],['▛', w6],
   ['▜', w7],['▝', w8],['▞', w9],['▟', w10]],

  '2':
  [['─', w1],['│', w2],['┄', w3],['┆', w4],['┌', w5],['┐', w6],['└', w7],
   ['┘', w8],['├', w9],['┤', w10]],

  '3':
  [['═', w1],['║', w2],['╒ ', w3],['╓',  w4],['╔', w5],['╕', w6],['╖', w7],
   ['╜', w8],['╧', w9],['╪' , w10]],

  '4':
  [['░', w1],['▒', w2],['▓', w3],['█', w4],['╱', w5],['╲ ', w6],['╳', w7],
   ['╭', w8],['╮', w9],['H', w10]]
  };

//Takes collections and returns the set
//based on its weight.
function weightedSet(set) {
  //Declare Vars
  const char_set = set;
  let charTotalWeight = 0, char_indiv_Weight = 0, i;

  //Iterate thru array to get total weights
  for (i = 0; i < char_set.length; i++) charTotalWeight += char_set[i][1];

  //Random number between 0 and charTotalWeight
  let r = Math.floor(Math.random() * charTotalWeight);

  //Return character based on its weight
  for (i = 0; i < char_set.length; i++) {
      char_indiv_Weight += char_set[i][1];
      if (r < char_indiv_Weight) return(char_set[i][0])
      }
  }

function draw () {
  //delay
  setTimeout(
    draw,
    randomRange(weightedSet(TIME_WEIGHTS['low']),
    weightedSet(TIME_WEIGHTS['high']))
  )
  //Reset count_trig and pos when w > sw/2
  if (w > sw - 1) {count_trig = randomRange(3000, 6000); w=randomRange(0, sw-10)}
  if (randomRange(0, 1) === 0) {w = w + 1} else{w = w - 1}

   //clip pos
   w = screen_clip(w, sw)

  let output= '' //clear output to avoid doubling string length
  for (let i = 0; i < w ; i++) {
  output += weightedSet(CHARS[weightedSet(CHAR_COL_WEIGHTS['0'])])
  if (count < count_trig) {count = count + 1} else{count=0}
  console.log(output) // log after for-loop
}
}

draw()
