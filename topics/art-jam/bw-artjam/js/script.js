/**
 * Art Jam
 * Ben Woschitz
 * 
 * Abstract representation of a part of myself
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

//Flower center
function drawFlowerMiddle() {
    noStroke();
    fill(flowerMiddle.fill);
    ellipse(width / 2, height / 2, flowerMiddle.size);
}

//Surrounding Petals
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

//Mapping inner light gradient
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

//Mapping outer light gradient
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

//Utilizing constrain and distance to change the colour of the flower
//in proximity to the light source (mouse x and y)
function revealColour() {
    let d = dist(mouseX, mouseY, width / 2, height / 2);
    let flowerRadius = flowerMiddle.size / 2 + petals.height * 1.25;
    let m = constrain(map(d, 0, flowerRadius, 0, 1), 0, 1);
    let c = lerpColor(color(petals.fills.overlap), color(petals.fills.noOverlap), m);
    
    petals.fill = c;
}