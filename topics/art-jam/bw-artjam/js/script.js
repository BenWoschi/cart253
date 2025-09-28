/**
 * Art Jam
 * Ben Woschitz
 * 
 * Abstract representation of myself
 */

"use strict";
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
}


/**
 * Draws the flower along with cursor "light"
*/
function draw() {
    background("#120d1c");

//Flower
    drawFlowerMiddle();
    drawPetals();
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