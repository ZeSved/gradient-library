"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movingGradient = void 0;
function movingGradient(gradient) {
    let isActive = false;
    let deg = 90;
    let intervalId;
    const { animation, colors, mountedOn, optional } = gradient;
    const percentage = 100 / (colors.length - 1);
    const arr = [];
    const movementSpeed = animation !== 'none' ?
        (optional?.speed === 'fast' ? 1 :
            optional?.speed === 'medium' ? 10 :
                optional?.speed === 'slow' ? 100 : 10) : 0;
    for (let i = 0; i < colors.length; i++) {
        arr.push({ color: colors[i], position: percentage * i, hasBeenDuped: false });
    }
    mountedOn.addEventListener('mouseover', () => {
        if (isActive)
            return;
        isActive = true;
        if (animation === 'rotate-z') {
            const color = colorsToGradient(colors, percentage);
            intervalId = setInterval(() => {
                deg === 360 ? deg = 1 : deg += 1;
                mountedOn.style.background = `linear-gradient(${deg}deg, ${color.join('')})`;
            }, movementSpeed);
        }
        if (animation === 'rotate-y' || animation === 'rotate-x') {
            intervalId = setInterval(() => {
                mountedOn.style.background = `linear-gradient(${animation === 'rotate-x' ? 0 : 90}deg, ${rotateXYZ(arr, percentage).join('')})`;
            }, movementSpeed);
        }
        if (animation === 'rotate-xyz') {
            intervalId = setInterval(() => {
                const colorArr = rotateXYZ(arr, percentage);
                deg === 360 ? deg = 1 : deg += 1;
                mountedOn.style.background = `linear-gradient(${deg}deg, ${colorArr.join('')})`;
            }, movementSpeed);
        }
    });
    mountedOn.addEventListener('mouseout', () => {
        if (isActive) {
            isActive = false;
            clearInterval(intervalId);
        }
        else
            return;
    });
    const children = mountedOn.children[0];
    optional?.className && mountedOn.classList.add(optional.className);
    mountedOn.style.padding = optional?.padding ? optional.padding.toString() + 'px' : '32px';
    mountedOn.style.borderRadius = optional?.border ? optional.border.toString() + 'px' : `${children.style.borderRadius + mountedOn.style.padding}`;
    function rotateXYZ(arr, percentage) {
        const newArr = [];
        arr.forEach(c => {
            if (!c.hasBeenDuped && c.position >= 101 + percentage) {
                arr.unshift({ color: c.color, position: arr[0].position - percentage * 3, hasBeenDuped: false });
                c.hasBeenDuped = true;
            }
            if (c.position >= 300 + percentage) {
                arr.splice(arr.length - 1, 1);
            }
            c.position += 1;
            newArr.push(c.color + ` ${c.position}%${arr.indexOf(c) !== arr.length - 1 ? ', ' : ''}`);
        });
        return newArr;
    }
    function colorsToGradient(colors, percentage) {
        const newArr = [];
        for (let i = 0; i < colors.length; i++) {
            newArr.push(colors[i] + ` ${percentage * i}%${i !== colors.length - 1 ? ', ' : ''}`);
            console.log(newArr);
        }
        return newArr;
    }
}
exports.movingGradient = movingGradient;
module.exports = movingGradient;
