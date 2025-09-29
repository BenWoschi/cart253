/**
 * Art Jam
 * Ben Woschitz
 * 
 * Abstract representation of myself
 */

"use strict";
let light = {
    size: 75,
    fill: "#f7fccc"
}

const flowerMiddle = {
    size: 100,
    fill: "#090309ff"
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
    fill(light.fill);
    ellipse(mouseX, mouseY, light.size);
}