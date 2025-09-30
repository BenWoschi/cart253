/**
 * Art Jam
 * Ben Woschitz
 * 
 * Abstract representation of myself
 */

"use strict";
const coreLight = {
    size: 75,
    fill: "#f7fccc"
}

let innerGradient = {
    fill: "#f7fccc"
}

let outerGradient = {
    fill: "#bbbe9fff"
    
}

let lightRadius = {
    size: 150
}

const flowerMiddle = {
    size: 100,
    fill: "#120613"
    };

let petals = {
    width: 60,
    height: 150,
    fill: "#120613"
    };
    
let petalsAmount = 9;
let petalsAngle = TWO_PI / petalsAmount;

/**
 * Creates Canvas
*/
function setup() {
    createCanvas(windowWidth, windowHeight);
    noCursor();
}

/**
 * Draws the flower along with cursor "light"
*/
function draw() {
    background("#120d1c");

    //Flower
    drawFlowerMiddle();
    drawPetals();

    //Light on Cursor
    drawLight();
    lightGradient();
}

function drawFlowerMiddle() {
    push();
    noStroke();
    fill(flowerMiddle.fill);
    ellipse(width / 2, height / 2, flowerMiddle.size);
    pop();
}

function drawPetals() {
    push();
    translate(width / 2, height / 2);
    noStroke();
    fill(petals.fill);
    //Petals rotate around center
    for (let i = 0; i < petalsAmount; i++) {
        rotate(TWO_PI / petalsAmount);
        ellipse(0, flowerMiddle.size / 3 + petals.height / 4, petals.width, petals.height);
    }
    pop();
}

function drawLight() {
    push();
    noStroke();
    fill(coreLight.fill);
    ellipse(mouseX, mouseY, coreLight.size);
}

function lightGradient() {
    for (let r = lightRadius.size; r > 0; r--) {
        let m = map(r, 0, lightRadius.size, 0, 1);
        let c = lerpColor(innerGradient.fill, outerGradient.fill, m);
        let a = map(r, lightRadius.size, 0, 0, 15);
        fill(c.levels[0], c.levels[1], c.levels[2], a);
        ellipse(mouseX, mouseY, r * 1.5, r * 1.5);
    }
}