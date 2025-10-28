/**
 * Modjam
 * Originally created by Pippin Barr
 * Modifications by Ben Woschitz
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// Our frog
const frog = {
    // The frog's body has a position
    body: {
        x: 320,
        y: 420,
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3
};

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);

    // Give the fly its first random position
    resetFly();
}

function draw() {
    background("#87ceeb");
    moveFly();
    drawFly();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#d98998ff");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#d98998ff");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#32af5cff");
    noStroke();
    beginShape();
    curveVertex(frog.body.x - 105, frog.body.y + 60);  // curve start
    curveVertex(frog.body.x - 115, frog.body.y + 60);  // bottom-left hip
    curveVertex(frog.body.x - 95, frog.body.y - 10);   // left side bulge
    curveVertex(frog.body.x - 55, frog.body.y - 60);   // upper-left shoulder
    curveVertex(frog.body.x, frog.body.y - 100);        // top center (head area)    
    curveVertex(frog.body.x + 55, frog.body.y - 60);   // upper-right shoulder
    curveVertex(frog.body.x + 95, frog.body.y - 10);   // right side bulge
    curveVertex(frog.body.x + 115, frog.body.y + 60);  // bottom-right hip
    curveVertex(frog.body.x + 105, frog.body.y + 60);  // curve end
    endShape(CLOSE);
    pop();

    // Draw the frog's body highlights
    push();
    fill("#94e5afff");
    noStroke();
    beginShape();
    curveVertex(frog.body.x - 100, frog.body.y + 60);  // duplicate for curve start
    curveVertex(frog.body.x - 115, frog.body.y + 60);  // bottom-left hip
    curveVertex(frog.body.x - 70, frog.body.y + 10);   // left side bulge
    curveVertex(frog.body.x - 60, frog.body.y - 40);   // upper-left shoulder
    curveVertex(frog.body.x, frog.body.y - 85);        // top center (head area)    
    curveVertex(frog.body.x + 60, frog.body.y - 40);   // upper-right shoulder
    curveVertex(frog.body.x + 70, frog.body.y + 10);   // right side bulge
    curveVertex(frog.body.x + 115, frog.body.y + 60);  // bottom-right hip
    curveVertex(frog.body.x + 100, frog.body.y + 60);  // duplicate for curve end
    endShape(CLOSE);
    pop();

    //Draw the left eyeball
    push();
    fill("#000000ff");
    noStroke();
    translate(frog.body.x - 80, frog.body.y);
    rotate(6.8);
    ellipse(0, 0, 50, 70);
    pop();

    //Draw the left eyeball highlight
    push();
    fill("#ffffffff");
    noStroke();
    translate(frog.body.x - 100, frog.body.y);
    rotate(6.6);
    ellipse(0, 0, 5, 10);
    pop();

    //Draw the right eyeball
    push();
    fill("#000000ff");
    noStroke();
    translate(frog.body.x + 80, frog.body.y);
    rotate(8.9 );
    ellipse(0, 0, 50, 70);
    pop();

    //Draw the right eyeball highlight
    push();
    fill("#ffffffff");
    noStroke();
    translate(frog.body.x + 100, frog.body.y);
    rotate(9.1);
    ellipse(0, 0, 5, 10);
    pop();

    // Draw the left eyelid
    push();
    fill("#2c9950ff");
    noStroke();
    beginShape();
    curveVertex(frog.body.x - 90, frog.body.y + 20);  // curve start
    curveVertex(frog.body.x - 113, frog.body.y + 50);  // bottom-left corner
    curveVertex(frog.body.x - 40, frog.body.y + 10);   // left side
    curveVertex(frog.body.x - 60, frog.body.y - 45);   // upper-left corner 
    endShape(CLOSE);
    pop();

    // Draw the right eyelid
    push();
    fill("#2c9950ff");
    noStroke();
    beginShape();
    curveVertex(frog.body.x + 90, frog.body.y + 20);  // curve start
    curveVertex(frog.body.x + 113, frog.body.y + 50);  // bottom-right corner
    curveVertex(frog.body.x + 40, frog.body.y + 10);   // right side
    curveVertex(frog.body.x + 60, frog.body.y - 45);   // upper-right corner 
    endShape(CLOSE);
    pop();

    // Draw the frog's body spine shadow
    push();
    fill("#2c9950ff");
    noStroke();
    beginShape();
    curveVertex(frog.body.x - 10, frog.body.y + 90);  // duplicate for curve start
    curveVertex(frog.body.x - 5, frog.body.y + 40);   // left side bulge
    curveVertex(frog.body.x, frog.body.y + 20);        // top center (head area)
    curveVertex(frog.body.x + 5, frog.body.y + 40);   // right side bulge
    curveVertex(frog.body.x + 10, frog.body.y + 90);  // duplicate for curve end
    endShape(CLOSE);
    pop();

    //Draw the left toe (hand? paw?)
    push();
    fill("#ce8c46ff");
    noStroke();
    beginShape();
    curveVertex(frog.body.x - 250, frog.body.y + 90); // bottom left start point
    curveVertex(frog.body.x - 265, frog.body.y + 40); // left-most toe bean
    curveVertex(frog.body.x - 238, frog.body.y + 43); // left and middle webbing
    curveVertex(frog.body.x - 220, frog.body.y + 5); // middle toe bean
    curveVertex(frog.body.x - 195, frog.body.y + 40); // right and middle webbing
    curveVertex(frog.body.x - 170, frog.body.y + 20); // right toe bean
    curveVertex(frog.body.x - 195, frog.body.y + 90); // bottom left start point
    endShape(CLOSE);
    pop();

    //Draw the left toe beans
    push();
    fill("#ce8c46ff");
    noStroke();
    ellipse(frog.body.x - 173, frog.body.y + 25, 24);
    ellipse(frog.body.x - 221, frog.body.y + 2, 24);
    ellipse(frog.body.x - 267, frog.body.y + 36, 24);
    pop();

    //Draw the right toe (hand? paw?)
    push();
    fill("#ce8c46ff");
    noStroke();
    beginShape();
    curveVertex(frog.body.x + 250, frog.body.y + 90); // bottom left start point
    curveVertex(frog.body.x + 265, frog.body.y + 40); // left-most toe bean
    curveVertex(frog.body.x + 238, frog.body.y + 43); // left and middle webbing
    curveVertex(frog.body.x + 220, frog.body.y + 5); // middle toe bean
    curveVertex(frog.body.x + 195, frog.body.y + 40); // right and middle webbing
    curveVertex(frog.body.x + 170, frog.body.y + 20); // right toe bean
    curveVertex(frog.body.x + 195, frog.body.y + 90); // bottom left start point
    endShape(CLOSE);
    pop();

    //Draw the right toe beans
    push();
    fill("#ce8c46ff");
    noStroke();
    ellipse(frog.body.x + 173, frog.body.y + 25, 24);
    ellipse(frog.body.x + 221, frog.body.y + 2, 24);
    ellipse(frog.body.x + 267, frog.body.y + 36, 24);
    pop();

        //Draw the left toe highlights
    push();
    fill("#ddae7cff");
    noStroke();
    beginShape();
    curveVertex(frog.body.x - 230, frog.body.y + 90); // bottom left start point
    curveVertex(frog.body.x - 265, frog.body.y + 40); // left-most toe bean
    curveVertex(frog.body.x - 228, frog.body.y + 50); // left and middle webbing
    curveVertex(frog.body.x - 220, frog.body.y + 5); // middle toe bean
    curveVertex(frog.body.x - 200, frog.body.y + 43); // right and middle webbing
    curveVertex(frog.body.x - 170, frog.body.y + 20); // right toe bean
    curveVertex(frog.body.x - 200, frog.body.y + 90); // bottom left start point
    endShape(CLOSE);
    pop();

    //Draw the left toe bean highlights
    push();
    fill("#ddae7cff");
    noStroke();
    ellipse(frog.body.x - 174, frog.body.y + 27, 19, 23);
    ellipse(frog.body.x - 218, frog.body.y + 4, 19, 22);
    ellipse(frog.body.x - 265, frog.body.y + 36, 20, 22);
    pop();

        //Draw the right toe highlights
    push();
    fill("#ddae7cff");
    noStroke();
    beginShape();
    curveVertex(frog.body.x + 242, frog.body.y + 90); // bottom left start point
    curveVertex(frog.body.x + 265, frog.body.y + 40); // left-most toe bean
    curveVertex(frog.body.x + 231, frog.body.y + 48); // left and middle webbing
    curveVertex(frog.body.x + 220, frog.body.y + 5); // middle toe bean
    curveVertex(frog.body.x + 200, frog.body.y + 49); // right and middle webbing
    curveVertex(frog.body.x + 170, frog.body.y + 20); // right toe bean
    curveVertex(frog.body.x + 205, frog.body.y + 90); // bottom left start point
    endShape(CLOSE);
    pop();

    //Draw the right toe bean highlights
    push();
    fill("#ddae7cff");
    noStroke();
    ellipse(frog.body.x + 174, frog.body.y + 27, 19, 23);
    ellipse(frog.body.x + 220, frog.body.y + 4, 19, 22);
    ellipse(frog.body.x + 265, frog.body.y + 36, 20, 22);
    pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size/2 + fly.size/2);
    if (eaten) {
        // Reset the fly
        resetFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}