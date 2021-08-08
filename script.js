'use strict';

const body = document.querySelector('body');

const spans = document.getElementsByTagName('span');
const colourNames = ['rgb(0, 255, 0)', 'rgb(255, 0, 0)', 'rgb(0, 0, 255)'];

const screensaverContainer = document.querySelector('.screensaver--container');
const screensaverClock = document.querySelector('.screensaver--clock');

const main = document.getElementsByTagName('main');

const imgContainer = document.querySelectorAll('.img--container');

const pageTitle = document.querySelector('title');

const arr = Array.from(document.getElementsByTagName('section'));

arr.forEach((section, index) => {
  section.addEventListener('click', function (e) {
    if (index < 3) {
      arr[index + 1].scrollIntoView({ behavior: 'smooth' });
    } else {
      arr[0].scrollIntoView({ behavior: 'smooth' });
    }
  });
});
// Returns a random positive whole number between two values (min, max)
// Used throughout to select random array elements
function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Return random colour name from colourNames array using randomNumber()
function randomColour() {
  return colourNames[randomNumber(0, colourNames.length - 1)];
}

// eslint-disable-next-line no-restricted-syntax
for (let item of spans) {
  item.style.color = randomColour();
}

// 04 - Time screensaver

const showScreensaver = function () {
  screensaverContainer.style.opacity = 1;
  screensaverContainer.style.visibility = 'visible';
  main[0].classList.add('blur');
};

const hideScreensaver = function () {
  screensaverContainer.style.opacity = 0;
  // Timeout used to hide screenSaverContainer after opacity had transitioned to 0
  // If no Timeout then opacity transition is overridden by visibily changing to hidden
  setTimeout(() => (screensaverContainer.style.visibility = 'hidden'), 10);
};

function timeNow() {
  // Time in format of AM / PM (eg. 1:35 PM, 10:23 AM)
  // This format is 'friendlier' and fits this site better than 24 hour clock
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

//  Refresh time and border-colour every second, to match the ticking of a clock
const getTime = function () {
  setInterval(() => {
    screensaverClock.textContent = timeNow();
    screensaverClock.style.borderColor = randomColour();
  }, 1000);
};

getTime();

let idleTime = 0;

// Increment idleTime by 1 sec until idleTime >= 12 seconds
// then show screensaver and change page-title to current time
function checkIfIdle() {
  idleTime += 1000;
  if (idleTime >= 12000) {
    showScreensaver();
    pageTitle.textContent = `⌚ ${timeNow()} ⌚`;
  }
}

//  Reset idleTime to 0, hidescreensaver and return page-title to default
function resetIdleTime() {
  idleTime = 0;
  hideScreensaver();
  main[0].classList.remove('blur');
  pageTitle.textContent = `😊`;
}

// Execute checkIfIdle every 1 sec
setInterval(checkIfIdle, 1000);

// resetIdleTime if the user movesmouse, scrolls, or presses a key
document.addEventListener('mousemove', resetIdleTime);
document.addEventListener('scroll', resetIdleTime);
document.addEventListener('keydown', resetIdleTime);

// 07 - Image hover

function mouseImgOver(e) {
  if (e.target.dataset.id != undefined) {
    /* Loop through img--container and change the opacity of the img and z-index
     * of the link with the same dataset-id as the e.target (link hovered/clicked) */
    imgContainer.forEach((value) => {
      value.children.item(e.target.dataset.id - 1).style.opacity = 1;
      e.target.style.zIndex = '20';
    });
  }
}

function mouseImgLeave(e) {
  if (e.target.dataset.id != undefined) {
    // When the mouse leaves do the reverse of mouseImgOver()
    imgContainer.forEach((value) => {
      value.children.item(e.target.dataset.id - 1).style.opacity = 0;
      e.target.style.zIndex = '3';
    });
  }
}

document.querySelector('main').addEventListener('mouseover', mouseImgOver);
document.querySelector('main').addEventListener('mouseout', mouseImgLeave);
