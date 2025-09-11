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

    //Dome
    drawDome();

    //Person
    drawPerson();

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
    fill(67, 60, 56, 140);
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

function drawDome() {
    push();
    noStroke();
    fill(61, 58, 58, 255);
    rect(500, 750, 500, 700, 100);
    pop();
   
    push();
    noStroke();
    fill(65, 62, 62, 255);
    ellipse(150, 1000, 1300, 1300);
    pop();

    push();
    noStroke();
    fill(63, 60, 60, 255);
    rect(180, 770, 350, 700, 120);
    pop();

    push();
    noStroke();
    fill(61, 58, 58, 255);
    rect(230, 790, 300, 700, 100);
    pop();
}

function drawPerson() {
    // Head
    push();
    noStroke();
    fill(35,13,16,255);
    ellipse(1000, 450, 40, 40);
    pop();
   
    // Torso Highlight
    push();
    noStroke();
    fill("#fcd3dc");
    rect(980, 473, 45, 70, 10);
    pop();

    // Torso
    push();
    noStroke();
    fill(35,13,16,255);
    rect(978, 473, 45, 70, 10);
    pop();

    // Neck
    push();
    noStroke();
    fill(34,13,16,255);
    rect(989, 460, 19, 70, 10);
    pop();

}

 
