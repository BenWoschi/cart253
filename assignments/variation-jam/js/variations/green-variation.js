/**
 * This file contains the code to run *only* the green variation part of the program.
 * Note how it has its own draw, greenDraw(), and its own keyPressed, greenKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

/**
 * This will be called just before the green variation starts
 */
function greenSetup() {
    greenScrolling = false;
}

/**
 * This will be called every frame when the green variation is active
 */
function greenDraw() {
    drawScrollingBackgrounds(greenScrolling);
  speederMotion.draw();
  speederOn.drawOnce();
}

/**
 * This will be called whenever a key is pressed while the green variation is active
 */
function greenKeyPressed() {
  if (key === 'R' || key === 'r') {
    greenScrolling = true;
  }
}