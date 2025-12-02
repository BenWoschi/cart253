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
  drawThreeBurnIcons();

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

  if (isTimeburnPlaying) {
    timeburnUse.drawFX();

    if (timeburnUse.frame > timeburnUse.frames) {
        isTimeburnPlaying = false;
    }
  }
  
  if (spawningObstacles) {
    // Obstacle spawn timer
    if (millis() - lastSpawnTime > random(minSpawnDelay, maxSpawnDelay)) {
      objects.push(new ScrollObject());
      lastSpawnTime = millis();
    }

    // Updates and draws obstacles
    for (let i = objects.length - 1; i >= 0; i--) {
      let obj = objects[i];
      obj.update();
      obj.draw();

      // Speeder rectangle collision
      let w1 = obj.img.width;
      let h1 = obj.img.height;
      let w2 = speederMotion.frameWidth * 0.85;
      let h2 = speederMotion.h * 0.5; // your height factor

      let speederCenterX = (speederMotion.x + 50) + speederMotion.frameWidth / 2;
      let speederCenterY = speederMotion.y + speederMotion.h / 2;

      let hitX = speederCenterX - w2 < obj.x + w1 / 2 &&
        speederCenterX + w2 > obj.x - w1 / 2;
      let hitY = speederCenterY - h2 / 2 < obj.y + h1 / 2 &&
        speederCenterY + h2 / 2 > obj.y - h1 / 2;

      if (hitX && hitY) {
        explosion.drawEX();
        console.log("HIT!");
      }

      // Remove offscreen
      if (obj.offscreen()) {
        objects.splice(i, 1);
      }
    }
  }
  drawThreeBurnIcons();

   if (showPopUp) {
    push();
    drawPopUp();
    pop();
  }

}

/**
 * This will be called whenever a key is pressed while the green variation is active
 */
function greenKeyPressed() {
  // Blocks future r presses
  if(!rAlreadyUsed){

    if (key === 'R' || key === 'r') {
    
    spawningObstacles = true;
    lastSpawnTime = millis();

    rAlreadyUsed = true;
      
    showPopUp = false;

    rPressedDecoy = true;

    // reset animation frame
    speederOn.frame = 0;

    playingStartAnimation = true;
    animationFinished = false;
    }
  }

    if (keyCode === SHIFT && rAlreadyUsed) {
      if (nextToGray < 3 && !isTimeburnOnCooldown) {
        // Sets icon to gray
        grayScale[nextToGray] = true;
        nextToGray++;
      }
      triggerTimeburn();
    }
}

function greenMousePressed() {
    if (showPopUp) {
      if (mouseButton === LEFT)
          showPopUp = false;
        return;
    }
}


function startingPlatform() {

  image(platform, platformX, platformY, platform.width, platform.height);

  if (greenScrolling) {
    platformX -= 5;
  }
}
