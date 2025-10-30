/**
 * Boingo
 * Pippin Barr
 *
 * A ball that bounces around on the canvas
 */

let ball1 = undefined; // Will create it with createBall()

let balls = [];
/**
 * Create the canvas and the ball
 */
function setup() {
  // Create the canvas
  createCanvas(400, 400);
  // Create the ball
  ball1 = createBall();
}

/**
 * Creates a random ball
 */
function createBall() {
  // Create a ball object with appropriate properties
  const newBall = {
    // Position and dimensions
    x: 200,
    y: 200,
    size: 20,
    // Colour
    fill: "#000000",
    // Movement
    velocity: {
      x: random(-5, 5),
      y: random(-5, 5)
    }
  };
  return newBall;
}

/**
 * Moves and draws the ball
 */
function draw() {
  background("#87ceeb");

  for (let ballAE of balls) {
  
    moveBall(ballAE);
    bounceBall(ballAE);
    drawBall(ballAE);
  }
  

}

/**
 * Moves the ball according to its velocity
 */
function moveBall(phBall) {
  phBall.x += phBall.velocity.x;
  phBall.y += phBall.velocity.y;
}

/**
 * Bounces the ball off the walls
 */
function bounceBall(phBall) {
  // Check if the ball has reached the left or right
  const bounceX = (phBall.x > width || phBall.x < 0);
  // Check if the ball has reached the top or bottom
  const bounceY = (phBall.y > height || phBall.y < 0);
  
  // Handle bouncing horizontally
  if (bounceX) {
    phBall.velocity.x *= -1;
  }
  // Handle bouncing vertically
  if (bounceY) {
    phBall.velocity.y *= -1;
  }
}

/**
 * Draw the ball on the canvas
 */
function drawBall(phBall) {
  push();
  noStroke();
  fill(phBall.fill);
  ellipse(phBall.x, phBall.y, phBall.size);
  pop();
}

function mousePressed() {
  let ball = createBall();
  balls.push(ball);
}
