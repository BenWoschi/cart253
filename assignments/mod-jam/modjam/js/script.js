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

// Gluttinous Toad
let toad = {
    // Position of toad's body
    body: {
        x: 1200,
        y: 440,
    },
    // Dimensions of toad's eyes
    eyes: {
        w: 30,
        h: 55,
    },
    // Dimensions of black hypno toad's eyes
    hypnoEyesB: {
        w: 20,
        h: 42,
    },
    // Dimensions of red hypno toad's eyes
    hypnoEyesR: {
        w: 23,
        h: 45,
    }
};

// Allows to scale the width when eating flies
let bodyWidthToad = 1.0;
let bodyWidthFrog = 1.0;

// Variable to easily use both creature's original sizes
let originalBodyWidthFrog = 1;
let originalBodyWidthToad = 1;

// Allows for eye separation as toad and frog gets wider
let eyeDisplacementT = 0;
let eyeDisplacementF = 0;

// Boolean for game start
let gameStart = false;

// Boolean for game win
let gameWin = false;

// Boolean for game loss
let gameLoss = false;

// Utilizing variable to more easily access the original width/height
let originalWidthB = toad.hypnoEyesB.w;
let originalHeightB = toad.hypnoEyesB.h;

// Helps set the speed for both dimensions
let hypnoSpeedW = 1.45;
let hypnoSpeedH = 1.45;

// Boolean for shrinking effect
let shrinkingW = true;
let shrinkingH = true;

// Width animation for black hypno eyes
// Interval allows for continuous loop
setInterval(() => {
    if (shrinkingW) {
        // Shrinking effect for width
        toad.hypnoEyesB.w -= hypnoSpeedW;
        // Stops the width from shrinking once it reaches 0.3x of it's original size
        if (toad.hypnoEyesB.w <= originalWidthB * 0.3) {
            toad.hypnoEyesB.w = originalWidthB * 0.3;
            shrinkingW = false;
        }
        // Expands the eye back to its original width once it reaches its minimum
    } else {
        toad.hypnoEyesB.w += hypnoSpeedW;
        if (toad.hypnoEyesB.w >= originalWidthB) {
            toad.hypnoEyesB.w = originalWidthB;
            shrinkingW = true;
        }
    }
},
    40);

// Height animation for black hypno eyes
// Interval allows for continuous loop
setInterval(() => {
    if (shrinkingH) {
        // Shrinking effect for height
        toad.hypnoEyesB.h -= hypnoSpeedH;
        // Stops the height from shrinking once it reaches 0.3x of it's original size
        if (toad.hypnoEyesB.h <= originalHeightB * 0.3) {
            toad.hypnoEyesB.h = originalHeightB * 0.3;
            shrinkingH = false;
        }
        // Expands the eye back to its original height once it reaches its minimum
    } else {
        toad.hypnoEyesB.h += hypnoSpeedH;
        if (toad.hypnoEyesB.h >= originalHeightB) {
            toad.hypnoEyesB.h = originalHeightB;
            shrinkingH = true;
        }
    }
},
    40);

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 400, // Will be random
    size: 15,
    speed: 6,

    wingFlipX: 1,
    wingFlipY: 1
};

setInterval(function () {
    fly.wingFlipX = fly.wingFlipX * -1;
    fly.wingFlipY = fly.wingFlipY * -1;
},
    150
);

// Defines title image and font variables
let titleImage;
let titleFont;

// Preloads my title image and font
function preload() {
    titleImage = loadImage("../assets/images/battleofthebog.png");
    titleFont = loadFont("../assets/fonts/pixelgame.otf");
}

/**
 * Creates the canvas
 * Centers images
 * Sets global font
 * Centers the text globally
 * Initializes the fly
 */
function setup() {
    createCanvas(1280, 880);

    imageMode(CENTER);

    textFont(titleFont);
    textAlign(CENTER, CENTER);

    // Give the fly its first random position
    resetFly();
}

function draw() {
    background("#172110ff");

    /**
    * Draws all the leaves in the background
    */
    drawLeaves(270, -200, 1.5, 0.4, 1, -1, "#3b5828ff");
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
    
    // Draws all the other objects if the game starts
    if (gameStart) {
        moveFly();
        lightGradient();
        drawFly();
        moveFrog();
        moveTongue();
        drawFrog();
        checkTongueFlyOverlap();
        drawToad();
        checkFlyToadOverlap();
    } else if (gameWin) {
        showWinScreen();
    } else if (gameLoss) {
        showLossScreen();
    } else {
        titleScreen();
    }      
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
    curveVertex(0, 20 * size); // base
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
    translate(fly.x, fly.y);
    scale(fly.wingFlipX, fly.wingFlipY);
    
    beginShape();
    curveVertex(0, 0); // curve start
    curveVertex(0 - 15, 0 + 5); // left bulge
    curveVertex(0 - 20, 0 + 20); // left point
    curveVertex(0 + 20, 0 + 20); // right point
    curveVertex(0 + 15, 0 + 5); // right bulge
    curveVertex(0, 0); // curve end
    endShape(CLOSE);
    pop();
}

/**
 * Resets the fly to the left with a random y and speed
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(20, 500);
    fly.speed = random(5, 12);
}

/**
 * Adds a gradient light effect for a fly under a hypno effect
 */
function lightGradient() {
    push();

    let lightRadius = 55;
    let innerCol = color("#e2ba54ff");
    let outerCol = color("#e4cb8dff");

    for (let r = lightRadius; r > 0; r--) {
        let m = map(r, 0, lightRadius, 0, 1);
        let c = lerpColor(innerCol, outerCol, m);
        let a = map(r, lightRadius, 0, 0, 15);
        fill(c.levels[0], c.levels[1], c.levels[2], a);
        ellipse(fly.x, fly.y, r * 1.5, r * 1.5);
    }
    pop();
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
    curveVertex(frog.body.x - 105 * bodyWidthFrog, frog.body.y + 60);  // curve start
    curveVertex(frog.body.x - 115 * bodyWidthFrog, frog.body.y + 60);  // bottom-left hip
    curveVertex(frog.body.x - 95 * bodyWidthFrog, frog.body.y - 10);   // left side bulge
    curveVertex(frog.body.x - 55 * bodyWidthFrog, frog.body.y - 60);   // upper-left shoulder
    curveVertex(frog.body.x, frog.body.y - 100);        // top center (head area)    
    curveVertex(frog.body.x + 55 * bodyWidthFrog, frog.body.y - 60);   // upper-right shoulder
    curveVertex(frog.body.x + 95 * bodyWidthFrog, frog.body.y - 10);   // right side bulge
    curveVertex(frog.body.x + 115 * bodyWidthFrog, frog.body.y + 60);  // bottom-right hip
    curveVertex(frog.body.x + 105 * bodyWidthFrog, frog.body.y + 60);  // curve end
    endShape(CLOSE);
    pop();

    // Draw the frog's body highlights
    push();
    fill("#94e5afff");
    noStroke();
    beginShape();
    curveVertex(frog.body.x - 100 * bodyWidthFrog, frog.body.y + 60);  // duplicate for curve start
    curveVertex(frog.body.x - 115 * bodyWidthFrog, frog.body.y + 60);  // bottom-left hip
    curveVertex(frog.body.x - 70 * bodyWidthFrog, frog.body.y + 10);   // left side bulge
    curveVertex(frog.body.x - 60 * bodyWidthFrog, frog.body.y - 40);   // upper-left shoulder
    curveVertex(frog.body.x, frog.body.y - 85);        // top center (head area)    
    curveVertex(frog.body.x + 60 * bodyWidthFrog, frog.body.y - 40);   // upper-right shoulder
    curveVertex(frog.body.x + 70 * bodyWidthFrog, frog.body.y + 10);   // right side bulge
    curveVertex(frog.body.x + 115 * bodyWidthFrog, frog.body.y + 60);  // bottom-right hip
    curveVertex(frog.body.x + 100 * bodyWidthFrog, frog.body.y + 60);  // duplicate for curve end
    endShape(CLOSE);
    pop();

    //Draw the left eyeball
    push();
    fill("#000000ff");
    noStroke();
    translate(frog.body.x - 80, frog.body.y);
    rotate(6.8);
    ellipse(0 - eyeDisplacementF, 0, 50 * bodyWidthFrog, 70 * bodyWidthFrog);
    pop();

    //Draw the left eyeball highlight
    push();
    fill("#ffffffff");
    noStroke();
    translate(frog.body.x - 100, frog.body.y);
    rotate(6.6);
    ellipse(0 - eyeDisplacementF, 0, 5 * bodyWidthFrog, 10 * bodyWidthFrog);
    pop();

    //Draw the right eyeball
    push();
    fill("#000000ff");
    noStroke();
    translate(frog.body.x + 80, frog.body.y);
    rotate(8.9 );
    ellipse(0 - eyeDisplacementF, 0, 50 * bodyWidthFrog, 70 * bodyWidthFrog);
    pop();

    //Draw the right eyeball highlight
    push();
    fill("#ffffffff");
    noStroke();
    translate(frog.body.x + 100, frog.body.y);
    rotate(9.1);
    ellipse(0 - eyeDisplacementF, 0, 5 * bodyWidthFrog, 10 * bodyWidthFrog);
    pop();

    // Draw the left eyelid
    push();
    fill("#2c9950ff");
    noStroke();
    beginShape();
    curveVertex(frog.body.x - 90 * bodyWidthFrog, frog.body.y + 20);  // curve start
    curveVertex(frog.body.x - 113 * bodyWidthFrog, frog.body.y + 50);  // bottom-left corner
    curveVertex(frog.body.x - 40 * bodyWidthFrog, frog.body.y + 10);   // left side
    curveVertex(frog.body.x - 60 * bodyWidthFrog, frog.body.y - 45);   // upper-left corner 
    endShape(CLOSE);
    pop();

    // Draw the right eyelid
    push();
    fill("#2c9950ff");
    noStroke();
    beginShape();
    curveVertex(frog.body.x + 90 * bodyWidthFrog, frog.body.y + 20);  // curve start
    curveVertex(frog.body.x + 113 * bodyWidthFrog, frog.body.y + 50);  // bottom-right corner
    curveVertex(frog.body.x + 40 * bodyWidthFrog, frog.body.y + 10);   // right side
    curveVertex(frog.body.x + 60 * bodyWidthFrog, frog.body.y - 45);   // upper-right corner 
    endShape(CLOSE);
    pop();

    // Draw the frog's body spine shadow
    push();
    fill("#2c9950ff");
    noStroke();
    beginShape();
    curveVertex(frog.body.x - 10 * bodyWidthFrog, frog.body.y + 90);  // duplicate for curve start
    curveVertex(frog.body.x - 5 * bodyWidthFrog, frog.body.y + 40);   // left side bulge
    curveVertex(frog.body.x, frog.body.y + 20);        // top center (head area)
    curveVertex(frog.body.x + 5 * bodyWidthFrog, frog.body.y + 40);   // right side bulge
    curveVertex(frog.body.x + 10 * bodyWidthFrog, frog.body.y + 90);  // duplicate for curve end
    endShape(CLOSE);
    pop();

    //Draw the left foot
    push();
    fill("#ce8c46ff");
    noStroke();
    beginShape();
    curveVertex(frog.body.x - 250 * bodyWidthFrog, frog.body.y + 90); // bottom left start point
    curveVertex(frog.body.x - 265 * bodyWidthFrog, frog.body.y + 40); // left-most toe bean
    curveVertex(frog.body.x - 238 * bodyWidthFrog, frog.body.y + 43); // left and middle webbing
    curveVertex(frog.body.x - 220 * bodyWidthFrog, frog.body.y + 5); // middle toe bean
    curveVertex(frog.body.x - 195 * bodyWidthFrog, frog.body.y + 40); // right and middle webbing
    curveVertex(frog.body.x - 170 * bodyWidthFrog, frog.body.y + 20); // right toe bean
    curveVertex(frog.body.x - 195 * bodyWidthFrog, frog.body.y + 90); // bottom left start point
    endShape(CLOSE);
    pop();

    //Draw the left toe beans
    push();
    fill("#ce8c46ff");
    noStroke();
    ellipse(frog.body.x - 173 * bodyWidthFrog, frog.body.y + 25 * bodyWidthFrog, 24 * bodyWidthFrog);
    ellipse(frog.body.x - 221 * bodyWidthFrog, frog.body.y + 2 * bodyWidthFrog, 24 * bodyWidthFrog);
    ellipse(frog.body.x - 267 * bodyWidthFrog, frog.body.y + 36 * bodyWidthFrog, 24 * bodyWidthFrog);
    pop();

    //Draw the right foot
    push();
    fill("#ce8c46ff");
    noStroke();
    beginShape();
    curveVertex(frog.body.x + 250 * bodyWidthFrog, frog.body.y + 90); // bottom left start point
    curveVertex(frog.body.x + 265 * bodyWidthFrog, frog.body.y + 40); // left-most toe bean
    curveVertex(frog.body.x + 238 * bodyWidthFrog, frog.body.y + 43); // left and middle webbing
    curveVertex(frog.body.x + 220 * bodyWidthFrog, frog.body.y + 5); // middle toe bean
    curveVertex(frog.body.x + 195 * bodyWidthFrog, frog.body.y + 40); // right and middle webbing
    curveVertex(frog.body.x + 170 * bodyWidthFrog, frog.body.y + 20); // right toe bean
    curveVertex(frog.body.x + 195 * bodyWidthFrog, frog.body.y + 90); // bottom left start point
    endShape(CLOSE);
    pop();

    //Draw the right toe beans
    push();
    fill("#ce8c46ff");
    noStroke();
    ellipse(frog.body.x + 173 * bodyWidthFrog, frog.body.y + 25 * bodyWidthFrog, 24 * bodyWidthFrog);
    ellipse(frog.body.x + 221 * bodyWidthFrog, frog.body.y + 2 * bodyWidthFrog, 24 * bodyWidthFrog);
    ellipse(frog.body.x + 267 * bodyWidthFrog, frog.body.y + 36 * bodyWidthFrog, 24 * bodyWidthFrog);
    pop();

    //Draw the left foot highlights
    push();
    fill("#ddae7cff");
    noStroke();
    beginShape();
    curveVertex(frog.body.x - 230 * bodyWidthFrog, frog.body.y + 90); // bottom left start point
    curveVertex(frog.body.x - 265 * bodyWidthFrog, frog.body.y + 40); // left-most toe bean
    curveVertex(frog.body.x - 228 * bodyWidthFrog, frog.body.y + 50); // left and middle webbing
    curveVertex(frog.body.x - 220 * bodyWidthFrog, frog.body.y + 5); // middle toe bean
    curveVertex(frog.body.x - 200 * bodyWidthFrog, frog.body.y + 43); // right and middle webbing
    curveVertex(frog.body.x - 170 * bodyWidthFrog, frog.body.y + 20); // right toe bean
    curveVertex(frog.body.x - 200 * bodyWidthFrog, frog.body.y + 90); // bottom left start point
    endShape(CLOSE);
    pop();

    //Draw the left toe bean highlights
    push();
    fill("#ddae7cff");
    noStroke();
    ellipse(frog.body.x - 174 * bodyWidthFrog, frog.body.y + 27 * bodyWidthFrog, 19 * bodyWidthFrog, 23 * bodyWidthFrog); //right-most
    ellipse(frog.body.x - 218 * bodyWidthFrog, frog.body.y + 4 * bodyWidthFrog, 19 * bodyWidthFrog, 22 * bodyWidthFrog); // middle
    ellipse(frog.body.x - 265 * bodyWidthFrog, frog.body.y + 36 * bodyWidthFrog, 20 * bodyWidthFrog, 22 * bodyWidthFrog); // left-most
    pop();

    //Draw the right foot highlights
    push();
    fill("#ddae7cff");
    noStroke();
    beginShape();
    curveVertex(frog.body.x + 242 * bodyWidthFrog, frog.body.y + 90); // bottom left start point
    curveVertex(frog.body.x + 265 * bodyWidthFrog, frog.body.y + 40); // left-most toe bean
    curveVertex(frog.body.x + 231 * bodyWidthFrog, frog.body.y + 48); // left and middle webbing
    curveVertex(frog.body.x + 220 * bodyWidthFrog, frog.body.y + 5); // middle toe bean
    curveVertex(frog.body.x + 200 * bodyWidthFrog, frog.body.y + 49); // right and middle webbing
    curveVertex(frog.body.x + 170 * bodyWidthFrog, frog.body.y + 20); // right toe bean
    curveVertex(frog.body.x + 205 * bodyWidthFrog, frog.body.y + 90); // bottom left start point
    endShape(CLOSE);
    pop();

    //Draw the right toe bean highlights
    push();
    fill("#ddae7cff");
    noStroke();
    ellipse(frog.body.x + 174 * bodyWidthFrog, frog.body.y + 27 * bodyWidthFrog, 19 * bodyWidthFrog, 23 * bodyWidthFrog); // right-most
    ellipse(frog.body.x + 220 * bodyWidthFrog, frog.body.y + 4 * bodyWidthFrog, 19 * bodyWidthFrog, 22 * bodyWidthFrog); // middle
    ellipse(frog.body.x + 265 * bodyWidthFrog, frog.body.y + 36 * bodyWidthFrog, 20 * bodyWidthFrog, 22 * bodyWidthFrog); // left-most
    pop();
}

/**
 * Draws the toad in its entirety
 */
function drawToad() {

    // Rotates the whole toad to be able to easily use the bodywidth from the side of the screen
    let angle = radians(270);

    // Draws the toad's mouth
    push();
    noStroke();
    fill("#b65d85ff");
    translate(toad.body.x, toad.body.y);
    rotate(angle);
    
    beginShape();
    curveVertex(-150 * bodyWidthToad, 80);   // Bottom right point
    curveVertex(-130 * bodyWidthToad, 90);  
    curveVertex(-95 * bodyWidthToad, -25);  
    curveVertex(-40 * bodyWidthToad, -85);   
    curveVertex(0 * bodyWidthToad, -100);    // Middle point
    curveVertex(40 * bodyWidthToad, -85);    
    curveVertex(95 * bodyWidthToad, -25);   
    curveVertex(120 * bodyWidthToad, 90);   
    curveVertex(150 * bodyWidthToad, 80);    // Bottom left point
    endShape(CLOSE);
    pop();

    // Draws the toad's mouth shadow
    push();
    noStroke();
    fill("#742649ff");
    translate(toad.body.x, toad.body.y);
    rotate(angle);
    
    beginShape();
    curveVertex(-150 * bodyWidthToad, 80);   // Bottom right point
    curveVertex(-130 * bodyWidthToad, 90);  
    curveVertex(-95 * bodyWidthToad, -25);  
    curveVertex(-40 * bodyWidthToad, -80);   
    curveVertex(0 * bodyWidthToad, -95);    // Middle point
    curveVertex(40 * bodyWidthToad, -80);    
    curveVertex(95 * bodyWidthToad, -25);   
    curveVertex(120 * bodyWidthToad, 90);   
    curveVertex(150 * bodyWidthToad, 80);    // Bottom left point
    endShape(CLOSE);
    pop();

    // Draws the body
    push();
    noStroke();
    fill("#8b6d21ff");
    translate(toad.body.x, toad.body.y);
    rotate(angle);

    // Draws the toad's body
    beginShape();
    curveVertex(-150 * bodyWidthToad, 80);   // Bottom right point
    curveVertex(-140 * bodyWidthToad, 60);
    curveVertex(-110 * bodyWidthToad, -5);
    curveVertex(-70 * bodyWidthToad, -55);
    curveVertex(0 * bodyWidthToad, -80);    // Middle point
    curveVertex(70 * bodyWidthToad, -55);
    curveVertex(110 * bodyWidthToad, -5);
    curveVertex(140 * bodyWidthToad, 90);
    curveVertex(130 * bodyWidthToad, 80);    // Bottom left point
    endShape(CLOSE);
    pop();

    // Draws the toad's body highlight
    push();
    noStroke();
    fill("#b69d5dff");
    translate(toad.body.x, toad.body.y);
    rotate(angle);
    
    beginShape();
    curveVertex(-150 * bodyWidthToad, 80);   // Bottom right point
    curveVertex(-130 * bodyWidthToad, 90);  
    curveVertex(-90 * bodyWidthToad, -5);  
    curveVertex(-40 * bodyWidthToad, -65);   
    curveVertex(0 * bodyWidthToad, -77);    // Middle point
    curveVertex(40 * bodyWidthToad, -65);    
    curveVertex(90 * bodyWidthToad, -5);   
    curveVertex(120 * bodyWidthToad, 90);   
    curveVertex(150 * bodyWidthToad, 80);    // Bottom left point
    endShape(CLOSE);
    pop();

    // Draws the toad's body spot
    push();
    noStroke();
    fill("#8b6d21ff");
    translate(toad.body.x, toad.body.y);
    rotate(angle);
    
    beginShape();
    curveVertex(-70 * bodyWidthToad, 80);   // Bottom right point   
    curveVertex(0 * bodyWidthToad, + 48);    // Middle point
    curveVertex(70 * bodyWidthToad, 80);    // Bottom left point
    endShape(CLOSE);
    pop();

    // Draws the left eye back
    push();
    noStroke();
    fill("#8b6d21ff");
    translate(toad.body.x, toad.body.y);
    rotate(40);
    ellipse(0 + 35, 0 - (20 + eyeDisplacementT), toad.eyes.w * bodyWidthToad, toad.eyes.h * bodyWidthToad);
    pop();

    // Draws the right eye back
    push();
    noStroke();
    fill("#8b6d21ff");
    translate(toad.body.x, toad.body.y);
    rotate(4);
    ellipse(0 + 35, 0 + (20 + eyeDisplacementT), toad.eyes.w * bodyWidthToad, toad.eyes.h * bodyWidthToad);
    pop();

    // Draws the left eye
    push();
    noStroke();
    fill("#c3da30ff");
    translate(toad.body.x, toad.body.y);
    rotate(40);
    ellipse(0 + 40, 0 - (20 + eyeDisplacementT), toad.eyes.w * bodyWidthToad, toad.eyes.h * bodyWidthToad);
    pop();

    // Draws the right eye
    push();
    noStroke();
    fill("#c3da30ff");
    translate(toad.body.x, toad.body.y);
    rotate(4);
    ellipse(0 + 40, 0 + (20 + eyeDisplacementT), toad.eyes.w * bodyWidthToad, toad.eyes.h * bodyWidthToad);
    pop();

    // Draws the left hypno RED eye
    push();
    noStroke();
    fill("#ac2601ff");
    translate(toad.body.x, toad.body.y);
    rotate(40);
    ellipse(0 + 40, 0 - (20 + eyeDisplacementT), toad.hypnoEyesR.w * bodyWidthToad, toad.hypnoEyesR.h * bodyWidthToad);
    pop();

    // Draws the right hypno RED eye
    push();
    noStroke();
    fill("#ac2601ff");
    translate(toad.body.x, toad.body.y);
    rotate(4);
    ellipse(0 + 40, 0 + (20 + eyeDisplacementT), toad.hypnoEyesR.w * bodyWidthToad, toad.hypnoEyesR.h * bodyWidthToad);
    pop();

    // Draws the left hypno BLACK eye
    push();
    noStroke();
    fill("#000000ff");
    translate(toad.body.x, toad.body.y);
    rotate(40);
    ellipse(0 + 40, 0 - (20 + eyeDisplacementT), toad.hypnoEyesB.w * bodyWidthToad, toad.hypnoEyesB.h * bodyWidthToad);
    pop();

    // Draws the right hypno BLACK eye
    push();
    noStroke();
    fill("#000000ff");
    translate(toad.body.x, toad.body.y);
    rotate(4);
    ellipse(0 + 40, 0 + (20 + eyeDisplacementT), toad.hypnoEyesB.w * bodyWidthToad, toad.hypnoEyesB.h * bodyWidthToad);
    pop();

    // Draws the toad's right foot
    push();
    noStroke();
    fill("#8b6d21ff");
    translate(toad.body.x, toad.body.y);
    rotate(angle);
    
    beginShape();
    curveVertex(210 * bodyWidthToad, 90); // right left start point
    curveVertex(215 * bodyWidthToad, 30); // right-most toe bean
    curveVertex(198 * bodyWidthToad, 43); // right and middle webbing
    curveVertex(180 * bodyWidthToad, 5); // middle toe bean
    curveVertex(165 * bodyWidthToad, 40); // left and middle webbing
    curveVertex(140 * bodyWidthToad, 30); // left toe bean
    curveVertex(165 * bodyWidthToad, 90); // bottom left start point
    endShape(CLOSE);
    pop();

    // Draws the toad's left foot
    push();
    noStroke();
    fill("#8b6d21ff");
    translate(toad.body.x, toad.body.y);
    rotate(angle);
    scale(-1, 1);

    beginShape();
    curveVertex(220 * bodyWidthToad, 90); // right left start point
    curveVertex(225 * bodyWidthToad, 30); // right-most toe bean
    curveVertex(208 * bodyWidthToad, 43); // right and middle webbing
    curveVertex(190 * bodyWidthToad, 5); // middle toe bean
    curveVertex(175 * bodyWidthToad, 40); // left and middle webbing
    curveVertex(150 * bodyWidthToad, 30); // left toe bean
    curveVertex(175 * bodyWidthToad, 90); // bottom left start point
    endShape(CLOSE);
    pop();

    // Draws the toad's right foot highlight
    push();
    noStroke();
    fill("#b69d5dff");
    translate(toad.body.x, toad.body.y);
    rotate(angle);
    
    beginShape();
    curveVertex(205 * bodyWidthToad, 90); // right left start point
    curveVertex(210 * bodyWidthToad, 60); // right-most toe bean
    curveVertex(198 * bodyWidthToad, 55); // right and middle webbing
    curveVertex(185 * bodyWidthToad, 25); // middle toe bean
    curveVertex(175 * bodyWidthToad, 60); // left and middle webbing
    curveVertex(150 * bodyWidthToad, 40); // left toe bean
    curveVertex(175 * bodyWidthToad, 90); // bottom left start point
    endShape(CLOSE);
    pop();

    // Draws the toad's left foot highlight
    push();
    noStroke();
    fill("#b69d5dff");
    translate(toad.body.x, toad.body.y);
    rotate(angle);
    scale(-1, 1);

    beginShape();
    curveVertex(215 * bodyWidthToad, 90); // right left start point
    curveVertex(220 * bodyWidthToad, 40); // right-most toe bean
    curveVertex(205 * bodyWidthToad, 55); // right and middle webbing
    curveVertex(190 * bodyWidthToad, 15); // middle toe bean
    curveVertex(179 * bodyWidthToad, 45); // left and middle webbing
    curveVertex(158 * bodyWidthToad, 40); // left toe bean
    curveVertex(175 * bodyWidthToad, 90); // bottom left start point
    endShape(CLOSE);
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
        // Increase frog's size
        bodyWidthFrog += 0.04;
        // Moves eyes apart on X axis
        eyeDisplacementF = 9;
        // Cap eye displacement
        eyeDisplacementF = constrain(eyeDisplacementF, 9, 45);
        // Cap the size increase
        bodyWidthFrog = constrain(bodyWidthFrog, 1, 1.20);
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
    // Wins state if frog eats enough flies
    if (bodyWidthFrog >= 1.2) {
        gameWin = true;
        gameStart = false;
    }
    // Loss state if toad eats enough flies
    if (bodyWidthToad >= 1.2) {
        gameLoss = true;
        gameStart = false;
    }
}

/**
 * Handles the fly overlapping the toad's mouth
 */
function checkFlyToadOverlap() {
    let mouthX = toad.body.x - 50;
    let mouthY = toad.body.y;
    let mouthToadRadius = (100 * bodyWidthToad) / 2;
    let flyRadius = fly.size / 2;

    // Distance between fly and toad mouth
    let flyMouthDistance = dist(fly.x, fly.y, mouthX, mouthY);

    if (flyMouthDistance < mouthToadRadius + flyRadius) {
        // Respawn the fly
        resetFly();
        // Increase toad's size
        bodyWidthToad += 0.04;
        // Moves eyes apart on Y axis
        eyeDisplacementT += 5;
        // Cap the size increase
        bodyWidthToad = constrain(bodyWidthToad, 1, 1.20);
    }
}

function titleScreen() {
    image(titleImage, width / 2, height / 2 - 100);

        // Defines text position
        let textPlayX = width / 2;
        let textPlayY = height / 2 + 175;
        // Mouse detection radius
        let hoverRadius = 100;

        // Checks distance from mouse to text, displays text when hovering
        if (dist(mouseX, mouseY, textPlayX, textPlayY) < hoverRadius) {
            fill("#ffdaa3ff");
            textSize(120);
            text("PLAY", textPlayX, textPlayY);
        }
        // If not, do blinking
        else if (frameCount % 60 < 30) {
            fill("#fbb040");
            textSize(120);
            text("PLAY", textPlayX, textPlayY);
        }
}

function showWinScreen() {

    let hoverRadius = 100;
    background("#fbb040");
    textSize(120);
    fill("#fff");
    text("SUCCESS!", width / 2, height / 2 - 50);

    textSize(60);
    text("The gluttinous hypno toad is no more!.. Right?", width / 2, height / 2 + 35);
       
    // Checks distance from mouse to text, displays text when hovering
    if (dist(mouseX, mouseY, width / 2, height / 2 + 150) < hoverRadius) {
        fill("#ffdaa3ff");
        textSize(90);
        text("Play Again?", width / 2, height / 2 + 150);
    }
    // If not, do blinking
    else if (frameCount % 60 < 30) {
        fill("#fff");
        textSize(90);
        text("Play Again?", width / 2, height / 2 + 150);
    }
}

function showLossScreen() {

    let hoverRadius = 100;
    background("#4b3617ff");
    textSize(120);
    fill("#fff");
    text(":(", width / 2, height / 2 - 50);

    textSize(60);
    text("You were no match for the gluttinous hypno toad..", width / 2, height / 2 + 35);
       
    // Checks distance from mouse to text, displays text when hovering
    if (dist(mouseX, mouseY, width / 2, height / 2 + 150) < hoverRadius) {
        fill("#ffdaa3ff");
        textSize(90);
        text("RETRY?", width / 2, height / 2 + 150);
    }
    // If not, do blinking
    else if (frameCount % 60 < 30) {
        fill("#fff");
        textSize(90);
        text("RETRY?", width / 2, height / 2 + 150);
    }
}

/**
 * Starts the game when mouse is pressed over "PLAY", "Play Again?", or "RETRY?"
 */
function mousePressed() {
    let hoverRadius = 100;

    // Game start screen displays "PLAY"
    if (!gameStart) {
        let textPlayX = width / 2;
        let textPlayY = height / 2 + 175;
        // Checks if mouse is hovering over PLAY
        if (dist(mouseX, mouseY, textPlayX, textPlayY) < hoverRadius) {
            resetGame();
        }
    }

    // Victory screen displays "Play Again?"
    if (!gameWin) {
        let playAgainX = width / 2;
        let playAgainY = height / 2 + 150;
        // Checks if mouse is hovering over Play Again?
        if (dist(mouseX, mouseY, playAgainX, playAgainY) < hoverRadius) {
            resetGame();
        }
    }

    // Loss screen displays "RETRY?"
    if (!gameLoss) {
        let retryX = width / 2;
        let retryY = height / 2 + 150;
        // Checks if mouse is hovering over Play Again?
        if (dist(mouseX, mouseY, retryX, retryY) < hoverRadius) {
            resetGame();
        }
    }

    // Launches tongue during game
    if (gameStart && frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}

function resetGame() {
    gameWin = false;
    gameLoss = false;
    gameStart = true;

    // Resets the frog
    bodyWidthFrog = originalBodyWidthFrog;
    eyeDisplacementF = 0;
    frog.tongue.y = 880;
    frog.tongue.state = "idle";

    // Resets the toad
    bodyWidthToad = originalBodyWidthToad;
    eyeDisplacementT = 0;

    // Resets the fly
    resetFly();
}

