/**
 * Art Jam
 * Ben Woschitz
 * 
 * Abstract representation about discovering myself
 * 
 * Controls and Objective:
 * Simply move your cursor and find the flower, hovering over the flower reveals it.
 * 
 * Uses and References/Help:
 * This project uses [p5.js](https://p5js.org).
 * Reference on how [for] loops are used (https://p5js.org/reference/p5/for/).
 * Reference on how [lerpColor] is used (https://p5js.org/reference/p5/lerpColor/).
 * Reference used from elishafitra on how to sketch a flower on [canvas] (https://editor.p5js.org/elishafitri/sketches/nbrLz0idJ).
 */

"use strict";

//Define Light/Gradient
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

//Defining the flower
const flowerMiddle = {
    size: 150,
    fill: "#060409ff"
};

let petals = {
    width: 80,
    height: 200,
    fill: "#060409ff",

    fills: {
        noOverlap: "#060409ff", // same colour for no overlap
        overlap: "#b294b3ff" // reveal colour on overlap
}
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
    background("#060409ff");

//Flower
    drawFlowerMiddle();
    drawPetals();

//Light on Cursor
    drawLight();
    lightGradient();

    revealColour();
}

/**
 * Draws the flower center
 */
function drawFlowerMiddle() {
    noStroke();
    fill(flowerMiddle.fill);
    ellipse(width / 1.5, height / 1.5, flowerMiddle.size);
}

/**
 * Draws the surrounding petals
 */
function drawPetals() {
    push();
    translate(width / 1.5, height / 1.5);
    noStroke();
    fill(petals.fill);
//Petals rotate around center
    for (let i = 0; i < petalsAmount; i++) {
        rotate(TWO_PI / petalsAmount);
        ellipse(0, flowerMiddle.size / 3 + petals.height / 4, petals.width, petals.height);
    }
    pop();
}

/**
 * Draws and maps the inner gradient light
 */
function drawLight() {
    push();
    for (let r = coreLight.size; r > 0; r--) {
        let m = map(r, 0, coreLight.size, 0, 1);
        let c = lerpColor(coreLight.fill, outerGradient.fill, m);
        let a = map(r, coreLight.size, 0, 0, 15);
        fill(c.levels[0], c.levels[1], c.levels[2], a);
        ellipse(mouseX, mouseY, r);
    }
    pop();
}

/**
 * Draws and maps the outer light gradient
 */
function lightGradient() {
    push();
    for (let r = lightRadius.size; r > 0; r--) {
        let m = map(r, 0, lightRadius.size, 0, 1);
        let c = lerpColor(innerGradient.fill, outerGradient.fill, m);
        let a = map(r, lightRadius.size, 0, 0, 15);
        fill(c.levels[0], c.levels[1], c.levels[2], a);
        ellipse(mouseX, mouseY, r * 1.5, r * 1.5);
    }
    pop();
}

/**
 * Allows fill change of flower when overlapping with light cursor
 */
function revealColour() {
    let d = dist(mouseX, mouseY, width / 1.5, height / 1.5);
    let flowerRadius = flowerMiddle.size / 2 + petals.height * 1.25;
    let m = constrain(map(d, 0, flowerRadius, 0, 1), 0, 1);
    let c = lerpColor(color(petals.fills.overlap), color(petals.fills.noOverlap), m);
    
    petals.fill = c;
}