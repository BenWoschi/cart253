/**
 * Mr. Furious
 * Pippin Barr
 *
 * A guy who becomes visibly furious!
 */

"use strict";

// Our friend Mr. Furious
let mrFurious = {
  // Position and size
  x: 200,
  y: 200,
  size: 100,
  // Colour
    fill: {
        r: 255,
        g: 225,
        b: 225,
  },
  // Acceleration
  acceleration: {
    x: 0,
    y: 0
  }    
};

//Sky
let sky = {
    // Colour
    fill: {
        r: 160,
        g: 180,
        b: 200
    }
};

//Annoying White Bird
let bird = {
    // Position and Size
    x: 0,
    y: 240,
    size: 70,
    // Velocity
    velocity: {
        x: 0.5,
        y: 0.35
    },

    // Acceleration
    acceleration: {
        x: 0.05,
        y: -0.05
    },
    // Colour
    fill: {
        r: 255,
        g: 255,
        b: 255
    }
};

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Draw (and update) Mr. Furious
 */
function draw() {
    sky.fill.r = sky.fill.r - 1
    sky.fill.g = sky.fill.g - 1
    sky.fill.b = sky.fill.b - 1
    sky.fill.r = constrain(sky.fill.r, 60, 160);
    sky.fill.g = constrain(sky.fill.g, 80, 180);
    sky.fill.b = constrain(sky.fill.b, 100, 200);
    background(sky.fill.r, sky.fill.g, sky.fill.b);
  
  // Draw Mr. Furious as a coloured circle




  push();
  noStroke();
    mrFurious.fill.g = mrFurious.fill.g - 1.75;
    mrFurious.fill.b = mrFurious.fill.b - 1.75;
    mrFurious.fill.r = mrFurious.fill.r - 1.5;
    mrFurious.fill.r = constrain(mrFurious.fill.r, 150, 255);
  fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
    mrFurious.x = random(width / 2, 205);
    mrFurious.y = random(height / 2, 205);
  ellipse(mrFurious.x, mrFurious.y, mrFurious.size);
  pop();
    
  //Bird
  push();
  noStroke();
    fill(bird.fill.r, bird.fill.g, bird.fill.b);
    //Bird flies from left to right, upward
    bird.x = bird.x + 2;
    bird.y = bird.y - 2;
    bird.y = constrain(bird.y, 60, 240);

    //Bird shrinks as it flies farther away
    bird.size = bird.size / 1.006

    //Bird go faster
    bird.velocity.x = bird.velocity.x + bird.acceleration.x;
    bird.velocity.y = bird.velocity.y + bird.acceleration.y;
    bird.x = bird.x + bird.velocity.x;
    bird.y = bird.y + bird.velocity.y;
  ellipse(bird.x, bird.y, bird.size);
  pop();

}