"use strict";
const div = document.getElementById('main');
rotatingGradient(div);
let isActive = false;
let deg = 0;
let intervalId;
div.style.background = `linear-gradient(90deg, red 0%, blue 100%)`;
function rotatingGradient(div) {
    div.addEventListener('mouseover', () => {
        if (!isActive) {
            isActive = true;
            intervalId = setInterval(() => {
                deg += 1;
                div.style.background = `linear-gradient(90deg, red ${deg}%, blue ${deg}%)`;
            }, 1);
        }
        else
            return;
    });
    div.addEventListener('mouseout', () => {
        if (isActive) {
            isActive = false;
            clearInterval(intervalId);
        }
        else
            return;
    });
}
