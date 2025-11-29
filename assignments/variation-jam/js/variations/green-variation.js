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
  startingPlatform();
  timeburnUse.drawFX();
  
  if (!rPressedDecoy) {
    drawSpeederDecoy();
  }

// Plays the speeder turn on animation
  if (playingStartAnimation) {
    speederOn.drawOnceStart();

    // Checks if the animation has finished
    if (speederOn.frame >= speederOn.frames - 1) {
      playingStartAnimation = false;
      animationFinished = true;
    }
    return;
  }

  // When animation finishes, start scrolling the other elements
  if (animationFinished) {
    greenScrolling = true;
    speederMotion.controllable = true;
    speederMotion.draw();
  }
}

/**
 * This will be called whenever a key is pressed while the green variation is active
 */
function greenKeyPressed() {
  // Blocks future r presses
  if (rAlreadyUsed) return;

  if (key === 'R' || key === 'r') {

    rAlreadyUsed = true;

    rPressedDecoy = true;

    // reset animation frame
    speederOn.frame = 0;

    playingStartAnimation = true;
    animationFinished = false;
  }
}

function startingPlatform() {

  image(platform, platformX, platformY, image.width, image.height);

  if (greenScrolling) {
    platformX -= 5;
  }
}