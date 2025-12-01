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

// Scalable speeder height
let speederHeightFactor = 0.5;

// Obstacle's radius
let obstacleRadius = max(obj.img.width, obj.img.height) / 2 * 0.8;

// Speeder detection radius
let speederRadius = max(speederMotion.frameWidth / 2, speederMotion.h / 2 * speederHeightFactor);

// Calculates the distance between both object centers
let d = dist(obj.x, obj.y, speederMotion.x + speederMotion.frameWidth / 2, speederMotion.y + speederMotion.h / 2);

  // Handles collision
  if (d < obstacleRadius + speederRadius) {
  explosion.drawEX();
  console.log("HIT!");
}

    // remove obstacles offscreen
    if (obj.offscreen()) {
      objects.splice(i, 1);
    }
  }
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

    rPressedDecoy = true;

    // reset animation frame
    speederOn.frame = 0;

    playingStartAnimation = true;
    animationFinished = false;
  }
}

    if (keyCode === SHIFT && rAlreadyUsed) {
        triggerTimeburn();
    }
}

function startingPlatform() {

  image(platform, platformX, platformY, image.width, image.height);

  if (greenScrolling) {
    platformX -= 5;
  }
}
