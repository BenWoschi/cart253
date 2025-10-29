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
        y: 820,
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 880,
        size: 20,
        speed: 45,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 400, // Will be random
    size: 15,
    speed: 6
};

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(1280, 880);

    // Give the fly its first random position
    resetFly();
}

function draw() {
    background("#172110ff");
    drawLeaves(1780, 450, 3, 1.7, -1, 1, "#3b5828ff");
    drawLeaves(550, 1150, 2.1, -0.1, -1, 1, "#3b5828ff");
    drawLeaves(-400, 100, 2.5, 1.1, 1, -1, "#3b5828ff");
    drawLeaves(-250, 150, 2.2, 1.3, 1, -1, "#5e8444ff");
    drawLeaves(-100, 950, 3, 0.9, 1, 1, "#5e8444ff");
    drawLeaves(400, 1000, 1.5, -0.8, 1, 1, "#3b5828ff");
    drawLeaves(490, 1250, 2.7, -0.2, 1, 1, "#96b25fff");
    drawLeaves(370, -150, 1.75, 0.4, 1, -1, "#96b25fff");
    drawLeaves(1280, 1250, 2.6, 2.9, -1, -1, "#5e8444ff");
    drawLeaves(990, 1150, 1.5, -0.1, -1, 1, "#3b5828ff");
    drawLeaves(780, 1400, 3.2, 0, 1, 1, "#5e8444ff");
    drawLeaves(1880, 200, 3.5, 1.7, -1, 1, "#5e8444ff");
    drawLeaves(1050, -400, 2.1, 0.5, -1, -1, "#3b5828ff");
    drawLeaves(790, 1250, 2.4, 0.3, 1, 1, "#96b25fff");
    drawLeaves(1880, -100, 3.6, 2.3, -1, 1, "#96b25fff");
    drawLeaves(1380, -300, 2.8, 2.3, -1, 1, "#96b25fff");
    
    
    moveFly();
    drawFly();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();
}

/**
 * Draws the tropical leaves
 */
function drawLeaves(x, y, size, angle, flipX, flipY, leafColour) {
    push();
    translate(x, y);
    scale(flipX, flipY);
    rotate(angle);
    noStroke();
    fill(leafColour);   
  beginShape();
  curveVertex(0, 20 * size);   // base
  curveVertex(0, 20 * size);
  curveVertex(-20 * size, -20 * size);
  curveVertex(-80 * size, -80 * size);
  curveVertex(-60 * size, -140 * size);
  curveVertex(-65 * size, -200 * size);
  curveVertex(-25 * size, -260 * size);
  curveVertex(0, -290 * size); // tip
  curveVertex(25 * size, -260 * size);
  curveVertex(65 * size, -200 * size);
  curveVertex(60 * size, -140 * size);
  curveVertex(80 * size, -80 * size);
  curveVertex(20 * size, -20 * size);
  curveVertex(0, 20 * size);
  curveVertex(0, 20 * size);
  endShape(CLOSE);
    pop();
}


/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    fly.y += sin(frameCount * 0.3) * 5;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
}

/**
 * Draws the fly as a black circle with white wings
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size +3, fly.size);
    pop();

    // Draw the fly's wings
    push();
    noStroke();
    fill("#ffffff97");
    beginShape();
    curveVertex(fly.x, fly.y); // curve start
    curveVertex(fly.x - 15, fly.y + 5); // left bulge
    curveVertex(fly.x - 20, fly.y + 20); // left point
    curveVertex(fly.x + 20, fly.y + 20); // right point
    curveVertex(fly.x + 15, fly.y + 5); // right bulge
    curveVertex(fly.x, fly.y); // curve end
    endShape(CLOSE);
    pop();
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(20, 500);
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
    ellipse(frog.body.x - 174, frog.body.y + 27, 19, 23); //right-most
    ellipse(frog.body.x - 218, frog.body.y + 4, 19, 22); // middle
    ellipse(frog.body.x - 265, frog.body.y + 36, 20, 22); // left-most
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
    ellipse(frog.body.x + 174, frog.body.y + 27, 19, 23); // right-most
    ellipse(frog.body.x + 220, frog.body.y + 4, 19, 22); // middle
    ellipse(frog.body.x + 265, frog.body.y + 36, 20, 22); // left-most
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