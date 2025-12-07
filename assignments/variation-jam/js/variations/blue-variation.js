/**
 * This file contains the code to run *only* the green variation part of the program.
 * Note how it has its own draw, greenDraw(), and its own keyPressed, greenKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

/**
 * This will be called just before the blue variation starts
 */
function blueSetup() {
    // Reset scrolling + gameplay
    greenScrolling = false;
    spawningObstacles = false;
    passedCount = 0;

    minSpawnDelay = 1000;
    maxSpawnDelay = 2000;

    // Reset popup behavior
    showPopUp = true;
    showRText = false;

    // Reset R logic
    rAlreadyUsed = false;
    rPressedDecoy = false;

    // Reset animations
    playingStartAnimation = false;
    animationFinished = false;

    // Reset speeds
    speeds = blueSpeeds;
    bgSpeed = blueBgSpeed;

    // Reset slowdown / timeburn
    timeSlowed = false;
    nextToGray = 0;
    grayScale = [false, false, false];
    timeburnUsesLeft = 3;
    isTimeburnPlaying = false;
    isTimeburnOnCooldown = false;

    // Reset platform
    platformX = 50;
    platformY = 300;

    // Reset obstacles array
    objects = [];

    // Reset speeder position
    speederMotion.x = 120;
    speederMotion.y = 299;
}



/**
 * This will be called every frame when the blue variation is active
 */
function blueDraw() {
  drawScrollingBackgrounds(greenScrolling);
  startingPlatform();

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
  if (animationFinished && speederAlive) {
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

      if (speederAlive && !obj.passed && speederMotion.x > obj.x) {
        passedCount++;
        obj.passed = true;
    }

      // Speeder rectangle collision
      let w1 = obj.img.width;
      let h1 = obj.img.height;
      let w2 = speederMotion.frameWidth * 0.85;
      let h2 = speederMotion.h * 0.5;

      let speederCenterX = (speederMotion.x + 50) + speederMotion.frameWidth / 2;
      let speederCenterY = speederMotion.y + speederMotion.h / 2;

      let hitX = speederCenterX - w2 < obj.x + w1 / 2 &&
        speederCenterX + w2 > obj.x - w1 / 2;
      let hitY = speederCenterY - h2 / 2 < obj.y + h1 / 2 &&
        speederCenterY + h2 / 2 > obj.y - h1 / 2;

      if (hitX && hitY && speederAlive) {
      // Stops speeder motion and drawing  
      speederAlive = false;
      explosionTriggered = true;
      explosionSound.play();
      levelFilter.freq(400, 1);
      levelFilter.res(10, 1);
      // Resets explosion animation  
      explosion.frame = 0;
    }

    // Draws explosion if triggered
      if (explosionTriggered) {
        explosion.drawEX();

    // Stops drawing explosion when animation ends
      if (explosion.frame >= explosion.frames) {
          explosionTriggered = false;
      }
    }
      // If speeder explodes, draw score/gameover screen
      if (!speederAlive) {
      drawScoreWindow();
      drawScoreWindowText();
      }

    // Remove object offscreen
    if (obj.offscreen()) {
        objects.splice(i, 1);
      }
    }
  }
  // Draws return arrow, timeburn UI and score
  drawThreeBurnIcons();
  drawScore();
  drawReturnArrow();

  // Draws instructional popup if triggered
  if (showPopUp) {
    push();
    drawPopUp();
    pop();
  }

  // Draws blinking start text if triggered
  if (showRText) {
    push();
    drawRText();
    pop();
  }

}

/**
 * This will be called whenever a key is pressed while the blue variation is active
 */
function blueKeyPressed() {
  // Blocks future r presses
  if(!rAlreadyUsed){
    if (key === 'R' || key === 'r') {
      engineIgnition.setVolume(2.5);
      engineIgnition.play();
      spawningObstacles = true;
      lastSpawnTime = millis();

      rAlreadyUsed = true;
      showPopUp = false;
      showRText = false;
      rPressedDecoy = true;

      // Resets animation frames
      speederOn.frame = 0;
      playingStartAnimation = true;
      animationFinished = false;
    }
  }

  // Timeburn slowdown on SHIFT
  // Check for Shift and that timeburn isn't already active
  // Turns timeburn icon gray after SHIFT press
  if (keyIsDown(SHIFT) && rAlreadyUsed && !timeSlowed && nextToGray < 3 && !isTimeburnOnCooldown) {
    levelFilter.freq(400, 1.5);
    levelFilter.res(10, 1.5);
    levelMusic.rate(0.5, 1.5);
    grayScale[nextToGray] = true;
    nextToGray++;

    triggerTimeburn();
    playTimeDistort();

    timeSlowed = true;

    // Applies slowdown to background speeds
    for (let i = 0; i < bgSpeed.length; i++) {
        bgSpeed[i] *= 0.5;
    }

    // Applies slowdown to existing objects
    for (let i = 0; i < objects.length; i++) {
        objects[i].speed *= 0.5;
    }

    // Slows down speed arrays so newly spawned objects are slowed
    for (let i = 0; i < speeds.length; i++) {
        speeds[i] *= 0.5;
    }

    // Restores speeds after 5 seconds
    setTimeout(() => {
        bgSpeed = [4, 5, 6, 7, 8];

        // Restores speeds array
        speeds = [4, 2, 5, 3, 6];

        // Restores existing object speeds
        for (let i = 0; i < objects.length; i++) {
            objects[i].speed = speeds[objects[i].index];
        }
        levelFilter.freq(20000, 2);
        levelFilter.res(0, 2);
        levelMusic.rate(1, 1.5);
        timeSlowed = false;
    }, 5000);
  }

}

/**
 * Closes popup and shows start text on mouse click
*/
function blueMousePressed() {
    if (showPopUp) {
      if (mouseButton === LEFT)
        showPopUp = false;
        showRText = true;
        return;
    }
}

/**
 * Draws and moves starting platform when triggered
*/
function startingPlatform() {

  image(platform, platformX, platformY, platform.width, platform.height);

  if (greenScrolling) {
    platformX -= 8;
  }
}

/**
 * Draws return arrow in top left
*/
function drawReturnArrow() {
  image(returnArrow, 16, 16);
}

/**
 * Enables return arrow functionality
*/
function returnMousePressed() {
    // Checks if mouseX and Y is within the image radius
    if (
        mouseX > 17 && mouseX < 17 + 60 && mouseY > 17 && mouseY < 17 + 60
    ) {
        // Returns to menu
        overSelect.play();
        resetMenu();
        state = "menu";
    }
}

/**
 * Enables retry and back to menu functionality in gameover screen
*/
function scoreTextMousePressed() {
  // Retry click
  let retryW = textWidth(retryText.text);
  let retryH = 48;
  // Checks for mouse distance to retry text
  if (
    mouseX > retryText.x - retryW / 2 &&
    mouseX < retryText.x + retryW / 2 &&
    mouseY > retryText.y - retryH / 2 &&
    mouseY < retryText.y + retryH / 2
  ) {
    overSelect.play();
    drawLevelMusic();
    // Calls the correct variation reset
    if (state === "green-variation") {
      resetGreenVariation();
      state = "green-variation";
      greenSetup();
    } else if (state === "blue-variation") {
      resetBlueVariation();
      state = "blue-variation";
      blueSetup();
    } else if (state === "red-variation") {
      resetRedVariation();
      state = "red-variation";
      redSetup();
    }
  }

  let menuW = textWidth(menuText.text);
  let menuH = 48;
  // Checks for mouse distance to retry text
  if (
    mouseX > menuText.x - menuW / 2 &&
    mouseX < menuText.x + menuW / 2 &&
    mouseY > menuText.y - menuH / 2 &&
    mouseY < menuText.y + menuH / 2
  ) {
    overSelect.play();
    // Resets the game and returns to the menu
    resetMenu();
    state = "menu";
  }
}
