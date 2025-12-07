/**
 * Timeburner
 * Ben Woschitz
 * 
 * A game about dodging obstacles and slowing down time in a speeder across a vast cyberpunk cityscape.
 */

"use strict";

// Menu state
let state = "menu";
let hasClickedToStart = false;
let menuMusicStarted = false;

// Background menu
let bgMenu;

// Music and sounds
let menuMusic;
let levelMusic;
let menuSelect;
let overSelect;
let explosionSound;
let engineIgnition;
let timeDistort;

// Retry and back to menu text on gameover
let retryText;
let menuText;

// Level select text
let selectText;

// Press R to start text
let rText;
let showRText = false;

// Scrolling Background and sets up arrays
let bgLayers = [];
let bgX = [];
let bgSpeed = [];

// Sets up arrays for object/obstacle spawns and spawn time
let obstacleImages = [];
let objects = [];
let lastSpawnTime = 0;
let passedCount = 0;

// Sets up the spawn delay for obstacles
let minSpawnDelay = 1500;
let maxSpawnDelay = 2500;

// Prevents obstacles from spawning
let spawningObstacles = false;

// Weighted obstacle spawns, higher = more common
let rarity = [9, 3, 2, 1, 1];

// Speeds per obstacle type
let speeds = [9, 3, 3, 3, 3];

// Blue variation speeds
let blueSpeeds = [4, 2, 5, 3, 6];
let blueBgSpeed = [4, 5, 6, 7, 8];

// Red variation speeds
let redSpeeds = [6, 4, 7, 5, 8];
let redBgSpeed = [7, 8, 9, 10, 11];

// Speeder Sprite Animations
let speederTurnOn;
let speederOn;
let speederMovement;
let speederMotion;
let speederAlive = true;
let speederDecoy;
let timeburn;
let timeburnUse;
let explosionSpeeder;
let explosion;
let explosionTriggered = false;

// Timeburn Icon and grayscale array for loop
let burnIcon;
let grayScale = [false, false, false];
let nextToGray = 0;

// Counts number of timeburn uses left and adds a delay
let timeburnUsesLeft = 3;
let isTimeburnPlaying = false;
let isTimeburnOnCooldown = false;
let timeburnCooldown = 5000;
// Prevents multiple triggers
let timeSlowed = false;

// Checks for animation state with speeder turnOn
let playingStartAnimation = false;
let animationFinished = false;

// Prevents "r" from being pressed again
let rAlreadyUsed = false;

// Decoy is displayed until "r" is pressed
let rPressedDecoy = false;

// Global flag for menu background scrolling
let menuScrolling = true;

// Prevents moving platform until true
let greenScrolling = false;

// Instructions popup
let instructionsPage;
let showPopUp = true;

// Return arrow
let returnArrow;

// Score Window
let scoreWindow;

// Starting Platform
let platform;
let platformX = 50;
let platformY = 300;

// Variable for lowpass filter
let levelFilter;

/**
 * Preloads all images, sounds and sprites
*/
function preload() {
    // Preloads Menu UI Image
    bgMenu = loadImage("assets/sprites/Menu/TimeBurnerMenuTitleDark.png");
    // Preloads font
    selectText = loadFont("assets/fonts/pixelgame.otf");
    // Preloads background images
    bgLayers[0] = loadImage("assets/sprites/Background/TimeBurnerBGSky.png");
    bgLayers[1] = loadImage("assets/sprites/Background/TimeBurnerBGSkyBuildings.png");
    bgLayers[2] = loadImage("assets/sprites/Background/TimeBurnerBGBuildings.png");
    bgLayers[3] = loadImage("assets/sprites/Background/TimeBurnerFGBuildings2.png");
    bgLayers[4] = loadImage("assets/sprites/Background/TimeBurnerFGBuildings.png");
    // Starting X positions
    bgX = [0, 0, 0, 0, 0];
    // Speed for each layer
    bgSpeed = [1, 2, 3, 4, 5];

    // Preloads different buttons/states for hover, normal, and pressed
    easy.img = loadImage("assets/sprites/buttons/normal/EasyNormal.png");
    easy.imgHover = loadImage("assets/sprites/buttons/hover/EasyHover.png");
    easy.imgPressed = loadImage("assets/sprites/buttons/pressed/EasyPressed.png");

    medium.img = loadImage("assets/sprites/buttons/normal/MediumNormal.png");
    medium.imgHover = loadImage("assets/sprites/buttons/hover/MediumHover.png");
    medium.imgPressed = loadImage("assets/sprites/buttons/pressed/MediumPressed.png");

    hard.img = loadImage("assets/sprites/buttons/normal/HardNormal.png");
    hard.imgHover = loadImage("assets/sprites/buttons/hover/HardHover.png");
    hard.imgPressed = loadImage("assets/sprites/buttons/pressed/HardPressed.png");

    // Preloads objects
    platform = loadImage("assets/sprites/platform/SpeederPlatform.gif");
  
    // Preloads FX
    timeburn = loadImage("assets/sprites/FX/SpeederTimechangeFix.png");
    explosionSpeeder = loadImage("assets/sprites/FX/explosion.png");

    // Preloads Speeder Animations
    speederTurnOn = loadImage("assets/sprites/SpeederAnims/TurnOn/SpeederTurnOnStart.png");
    speederMovement = loadImage("assets/sprites/SpeederAnims/BurnerMotion/SpeederAfterburnerMotion.png");
    speederDecoy = loadImage("assets/sprites/SpeederStill.png");
  
    // Preloads timeburn icon
    burnIcon = loadImage("assets/sprites/TimechangeIcon.png");
  
    // Preloads instructions popup
    instructionsPage = loadImage("assets/images/instructions.png");
  
    // Preloads Arrow
    returnArrow = loadImage("assets/images/arrow.png");

    // Preloads Score Window
    scoreWindow = loadImage("assets/images/scorescreen.png");
  
    // Preloads different obstacles
    obstacleImages[0] = loadImage("assets/sprites/obstacles/square.png");
    obstacleImages[1] = loadImage("assets/sprites/obstacles/rect.png");
    obstacleImages[2] = loadImage("assets/sprites/obstacles/long-rect.png");
    obstacleImages[3] = loadImage("assets/sprites/obstacles/bigrect.png");
    obstacleImages[4] = loadImage("assets/sprites/obstacles/longer-rect.png");
  
    // Preloads sounds and music
    menuMusic = loadSound("assets/sounds/spaceracer.mp3");
    levelMusic = loadSound("assets/sounds/levelmusic.mp3");
    menuSelect = loadSound("assets/sounds/menuselect.mp3");
    overSelect = loadSound("assets/sounds/retry.mp3");
    explosionSound = loadSound("assets/sounds/explosion.mp3");
    engineIgnition = loadSound("assets/sounds/enginestart.mp3");
    timeDistort = loadSound("assets/sounds/distort.mp3");
}

/**
 * Create the canvas and draws the sprite animations
*/
function setup() {
  createCanvas(1080, 720);
  speederMotion = new Sprite(speederMovement, 120, 299, 15, 960);
  speederOn = new Sprite(speederTurnOn, 120, 300, 48, 3072);
  timeburnUse = new Sprite(timeburn, 200, 200, 12, 732);
  explosion = new Sprite(explosionSpeeder, 0, 0, 13, 832);

  // Lowpass Filter global state
  levelFilter = new p5.LowPass();
  levelMusic.disconnect();      
  levelMusic.connect(levelFilter);
  levelFilter.freq(20000, 2); 
  levelFilter.res(0, 2);
}


/**
 * Display the menu or the current variation
*/
function draw() {
    switch (state) {
        case "menu":
            menuDraw();
            break;
        case "red-variation":
            redDraw();
            break
        case "green-variation":
            greenDraw();
            break;
        case "blue-variation":
            blueDraw();
            break;
    }
}

/**
 * Listen for mouse pressed and call the function for it in the
 * current state
 */
function mousePressed() {
    // MENU click-to-start blocker
    if (state === "menu" && !hasClickedToStart) {
      hasClickedToStart = true;
      return;
    }
    switch (state) {
        case "menu":
            break;
        case "red-variation":
            redMousePressed();
            returnMousePressed();
            scoreTextMousePressed();
            break
        case "green-variation":
            greenMousePressed();
            returnMousePressed();
            scoreTextMousePressed();
            break;
        case "blue-variation":
            blueMousePressed();
            returnMousePressed();
            scoreTextMousePressed();
            break;
    }
}

/**
 * Listen for key pressed and call the function for it in the
 * current state
 */
function keyPressed() {
  switch (state) {
    case "green-variation":
      greenKeyPressed();
      break;
    case "red-variation":
      redKeyPressed();
      break;
    case "blue-variation":
      blueKeyPressed();
      break;
  }
}

/**
 * Draws the scrolling layered background twice to give a seamless loop
*/
function drawScrollingBackgrounds(scrollActive) {
  for (let i = 0; i < bgLayers.length; i++) {

    if (scrollActive) {
      bgX[i] -= bgSpeed[i];
    }

    if (bgX[i] <= -width) {
      bgX[i] = 0;
    }

    image(bgLayers[i], bgX[i], 0, width, height);
    image(bgLayers[i], bgX[i] + width, 0, width, height);
  }
}

/**
 * Creates a sprite class sheet used for all sprite animations
*/
function Sprite(sheet, x, y, numberFrames, sheetWidth) {
  this.sheet = sheet;
  this.x = x;
  this.y = y;
  this.h = sheet.height;
  this.frame = 0;
  this.scale = 2;
  this.frames = numberFrames;
  this.sheetWidth = sheetWidth;
  this.frameWidth = this.sheetWidth / this.frames;

  // Default speeder state
  this.controllable = false;
  // Speeder "Speed"
  this.speed = 10;

  // Allows for speeder movement when .controllable = true
  this.update = function () {
    if (this.controllable) {
      if (keyIsDown(87)) this.y -= this.speed; // W
      if (keyIsDown(83)) this.y += this.speed; // S
      if (keyIsDown(65)) this.x -= this.speed; // A
      if (keyIsDown(68)) this.x += this.speed; // D
    }
    
  // Sprite width and height variables
  let spriteW = this.frameWidth * this.scale;
  let spriteH = this.h * this.scale;

  // Constrains sprite to canvas
  this.x = constrain(this.x, 0, width - spriteW);
  this.y = constrain(this.y, 0, height - spriteH);  
  };

  this.draw = function () {
    this.update();
    image(this.sheet, this.x, this.y, this.frameWidth * this.scale, this.h * this.scale, this.frameWidth * floor(this.frame), 0, this.frameWidth, this.h);
      this.frame += 0.5;
      if (this.frame >= this.frames) {
          this.frame = 0;
      }
  }

  // Used for looping sprite animations
  this.drawOnceStart = function () {
    image(this.sheet, this.x, this.y, this.frameWidth * this.scale, this.h * this.scale, this.frameWidth * floor(this.frame), 0, this.frameWidth, this.h);
      if (this.frame < this.frames) {
          this.frame += 0.25;
      }
  }

  // Used for effects that differ from the speeder and loop once
  this.drawFX = function () {
    image(this.sheet, speederMotion.x + 10, speederMotion.y - 30, this.frameWidth * this.scale, this.h * this.scale, this.frameWidth * floor(this.frame), 0, this.frameWidth, this.h);
      if (this.frame <= this.frames) {
          this.frame += 0.15;
      }
  }

  // Separate sprite class for the explosion
  this.drawEX = function () {
    image(this.sheet, speederMotion.x + 20, speederMotion.y, this.frameWidth * this.scale, this.h * this.scale, this.frameWidth * floor(this.frame), 0, this.frameWidth, this.h);
      if (this.frame <= this.frames) {
          this.frame += 0.15;
      }
  }
}

/**
 * Draws the initial stationary decoy of the speeder
*/
function drawSpeederDecoy() {
  // Does not draw if "r" was pressed
  if (rPressedDecoy) return;

  let decoyWidth = 2;
  let decoyHeight = 2;

  image(
    speederDecoy, 120, 312, speederDecoy.width * decoyWidth, speederDecoy.height * decoyHeight);
}

/**
 * Triggers the timeburn effect once conditions are met and puts it on a 5 second cooldown
*/
function triggerTimeburn() {
    // Don't allow triggering unless everything is valid
    if (timeburnUsesLeft > 0 && !isTimeburnPlaying && !isTimeburnOnCooldown) {

        isTimeburnPlaying = true;
        isTimeburnOnCooldown = true;
        timeburnUsesLeft--;

        // Reset sprite animation
        timeburnUse.frame = 0;

        // Start cooldown timer
        setTimeout(() => {
            isTimeburnOnCooldown = false;
        }, timeburnCooldown);
    }
}

// Weighted spawns for objects
// AI helped with this in particular
function pickWeightedIndex(weights) {
  let total = 0;
  for (let w of weights) total += w;

  let r = random(total);
  let running = 0;

  for (let i = 0; i < weights.length; i++) {
    running += weights[i];
    if (r <= running) return i;
  }
}

/**
 * Object class that handles the scrolling object spawns, random rotations, spawnrate, and speed
*/
class ScrollObject {
  constructor() {
    // Chooses obstacle type
    this.index = pickWeightedIndex(rarity);
    this.img = obstacleImages[this.index];

    this.x = width + 80;
    this.y = random(60, height - 60);
    this.speed = speeds[this.index];
    // Boolean used for scoring system once speeder passes each object
    this.passed = false;
  }
  update() {
    // Left movement on canvas
    this.x -= this.speed;
  }

  // Draws the different images of the objects themselves
  draw() {
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    image(this.img, 0, 0);
    pop();
  }

  offscreen() {
    return this.x < -200;
  }

}

/**
 * Draws the 3 timeburn icons that indicate how many uses are left
*/
function drawThreeBurnIcons() {
  let startX = 920;
  let y = 660;
  let spacing = 45;
  
  // Turns them grayscale if they are not
  for (let i = 0; i < 3; i++) {
    if (grayScale[i]) {
      tint(0, 0, 0);
    } else {
      noTint();
    }

    image(burnIcon, startX + i * spacing, y, 65, 40);
  }

  noTint();
}

/**
 * Draws the instructions popup on initial level start
*/
function drawPopUp() {
  imageMode(CENTER);
  image(instructionsPage, width / 2, height / 2);
}

/**
 * Draws blinking text to indicate to the player on how to start
*/
function drawRText() {
  if (frameCount % 60 < 30) {
    fill("#f3f3f3");
    textSize(48);
    textFont(selectText);
    textAlign(CENTER);
    text("Press R to begin", width / 2, height / 2);
  }
}

/**
 * Draws a simple score counter in the top right of the page
*/
function drawScore() {
  fill("#f3f3f3");
  textSize(28);
  textAlign(RIGHT, TOP);
  text("Score: " + passedCount, width - 20, 20);
}

/**
 * Draws the gameover/score window image
*/
function drawScoreWindow() {
  push();
  imageMode(CENTER);
  image(scoreWindow, width / 2, height / 2);
  pop();
}

/**
 * Draws the gameover/score window text
*/
function drawScoreWindowText() {
  fill("#f3f3f3");
  textSize(76);
  textAlign(CENTER, CENTER);
  text("Oh no! You crashed!", width / 2, height / 2 - 80);
  textSize(48);
  text("Your final score was: " + passedCount, width / 2, height / 2 - 20);

  retryText = {
    x: width / 2 + 100,
    y: height / 2 + 80,
    text: "Retry"
  };

  menuText = {
    x: width / 2 - 100,
    y: height / 2 + 80,
    text: "Main Menu"
  };
  fill("#FFCEEF");
  text(retryText.text, retryText.x, retryText.y);
  text(menuText.text, menuText.x, menuText.y);
}

/**
 * Partial reset of gamestate when returning to menu
*/
function resetMenu() {
    levelMusic.stop();

    easy.isPressed = false;
    easy.hover = false;
    medium.isPressed = false;
    medium.hover = false;
    hard.isPressed = false;
    hard.hover = false;
  
    speederAlive = true;

    // Resets popup
    showPopUp = true;
    showRText = false;

    // Resets any positioning affected during gameplay
    platformX = 50;
    rAlreadyUsed = false;
    rPressedDecoy = false;

    // Resets timeburn UI
    grayScale = [false, false, false];
    nextToGray = 0;

    // Resets scrolling objects
    objects = [];
    passedCount = 0;

    // Menu BG scrolling
    menuScrolling = true;
    bgSpeed = [1, 2, 3, 4, 5];
  
    // Resets menu music
    hasClickedToStart = true;
    menuMusicStarted = false;
  
    // Resets level music frequency
    levelFilter.freq(20000);
    levelFilter.res(0);
}

/**
 * Resets green/easy variation game state
*/
function resetGreenVariation() {
    // Reset speeds specific to green
    speeds = [9, 3, 3, 3, 3];    // green variation speeds
    bgSpeed = [1, 2, 3, 4, 5];   // green variation background speeds

    // Reset scrolling objects & score count
    greenScrolling = false;
    spawningObstacles = false;
    passedCount = 0;

    // Reset popup behavior
    showPopUp = true;
    showRText = false;

    // Reset R logic
    rAlreadyUsed = false;
    rPressedDecoy = false;

    // Reset animations
    playingStartAnimation = false;
    animationFinished = false;

    // Reset timeburn usage and UI
    grayScale = [false, false, false];
    nextToGray = 0;
    timeburnUsesLeft = 3;
    isTimeburnPlaying = false;
    isTimeburnOnCooldown = false;
    timeSlowed = false;

    // Reset platform position
    platformX = 50;
    platformY = 300;

    // Reset obstacles array
    objects = [];

    // Reset speeder position
    speederMotion.x = 120;
    speederMotion.y = 299;

    // Make sure speeder is alive
    speederAlive = true;
    explosionTriggered = false;

    // Resets level music frequency
    levelFilter.freq(20000);
    levelFilter.res(0);
}

/**
 * Resets medium/blue variation game state
*/
function resetBlueVariation() {
    // Set blue variation speeds
    speeds = blueSpeeds;
    bgSpeed = blueBgSpeed;

    // Reset scrolling objects & score count
    greenScrolling = false;
    spawningObstacles = false;
    passedCount = 0;
  
    // Blue-specific object delay
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

    // Reset timeburn usage UI
    grayScale = [false, false, false];
    nextToGray = 0;
    timeburnUsesLeft = 3;
    isTimeburnPlaying = false;
    isTimeburnOnCooldown = false;
    timeSlowed = false;

    // Reset platform position
    platformX = 50;
    platformY = 300;

    // Reset obstacles array
    objects = [];

    // Reset speeder position
    speederMotion.x = 120;
    speederMotion.y = 299;

    // Make sure speeder is alive
    speederAlive = true;
    explosionTriggered = false;
  
    // Resets level music frequency
    levelFilter.freq(20000);
    levelFilter.res(0);
}

/**
 * Resets red/hard variation game state
*/
function resetRedVariation() {
    // Set red variation speeds
    speeds = redSpeeds;
    bgSpeed = redBgSpeed;

    // Reset scrolling objects & score count
    greenScrolling = false;
    spawningObstacles = false;
    passedCount = 0;
  
    // Red-specific object delay
    minSpawnDelay = 750;
    maxSpawnDelay = 1750;

    // Reset popup behavior
    showPopUp = true;
    showRText = false;

    // Reset R logic
    rAlreadyUsed = false;
    rPressedDecoy = false;

    // Reset animations
    playingStartAnimation = false;
    animationFinished = false;

    // Reset timeburn usage and UI
    grayScale = [false, false, false];
    nextToGray = 0;
    timeburnUsesLeft = 3;
    isTimeburnPlaying = false;
    isTimeburnOnCooldown = false;
    timeSlowed = false;

    // Reset platform position
    platformX = 50;
    platformY = 300;

    // Reset obstacles array
    objects = [];

    // Reset speeder position
    speederMotion.x = 120;
    speederMotion.y = 299;

    // Make sure speeder is alive
    speederAlive = true;
    explosionTriggered = false;
  
    // Resets level music frequency
    levelFilter.freq(20000);
    levelFilter.res(0);
}

/**
 * Draws menu music
*/
function startMenuMusic() {
  menuMusicStarted = true;

  menuMusic.setVolume(0);
  menuMusic.play(0, 1, 0, 0);
  menuMusic.amp(1, 1);
}

/**
 * Draws level music
*/
function drawLevelMusic() {
  levelMusic.stop();
  levelMusic.setVolume(0); 
  levelMusic.loop(0, 1, 0, 0);
  levelMusic.amp(1, 5);
}

/**
 * Plays modified distort sound
*/
function playTimeDistort() {
  timeDistort.setVolume(0.2);
  timeDistort.play();
}



