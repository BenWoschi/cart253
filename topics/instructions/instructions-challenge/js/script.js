/**
 * Instructions Challenge
 * Ben Woschitz
 * 
 * Drawing a landscape on a canvas
 */

"use strict";

/**
 * Sets up the canvas
*/
function setup() {
    createCanvas(1920, 1080);
}


/**
 * Background
*/
function draw() {
    // The Sky and background
    background("#604d6c");

    //The Sand
    drawSand();

    //Sky Gradient
    drawGradient();

    //Background Sand
    drawLightsand();

    //Distant Sand
    drawDistantsand();

    //Sun Red
    drawSunred();

    //Sun Light
    drawSunlight();
}

function drawSand() {
    //Rectangle
    push();
    noStroke();
    fill("#473c36");
    rect(0, 525, 1920, 575);
    pop();
}

function drawGradient() {
    push();
    noStroke();
    fill(117, 75, 98, 50);
    rect(0, 0, 1920, 200);
    pop();
}

function drawLightsand() {
    push();
    noStroke();
    fill(67, 60, 56, 120);
    rect(0, 650, 1920, 550);
    pop();
}

function drawDistantsand() {
    push();
    noStroke();
    fill(59, 60, 56, 175);
    rect(0, 515, 1920, 10);
    pop();
}

function drawSunred() {
    push();
    noStroke();
    fill("#fd3c2c")
    ellipse(1500, 450, 75, 75);
    pop();
}

function drawSunlight() {
    push();
    stroke(163,78,99,100);
    strokeWeight(5);
    fill("#fad5dc");
    ellipse(1350, 275, 75, 75);
    pop();
}
