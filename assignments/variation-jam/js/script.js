/**
 * Timeburner
 * Ben Woschitz
 * 
 * A game about dodging obstacles and slowing down time in a speeder across a vast cityscape.
 */

"use strict";

let state = "menu";
let bgMenu;

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

// Decoy is displayed until r is pressed
let rPressedDecoy = false;

// Global flag for menu background scrolling
let menuScrolling = true;

// Variation-specific flags
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
    timeburn = loadImage("assets/sprites/FX/speederTimechangeFix.png");
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
}

/**
 * Create the canvas
*/
function setup() {
  createCanvas(1080, 720);
  speederMotion = new Sprite(speederMovement, 120, 299, 15, 960);
  speederOn = new Sprite(speederTurnOn, 120, 300, 48, 3072);
  timeburnUse = new Sprite(timeburn, 200, 200, 12, 732);
  explosion = new Sprite(explosionSpeeder, 0, 0, 13, 832);
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
    switch (state) {
        case "menu":
            menuMousePressed();
            break;
        case "red-variation":
            redMousePressed();
            returnMousePressed();
            break
        case "green-variation":
            greenMousePressed();
            returnMousePressed();
            break;
        case "blue-variation":
            blueMousePressed();
            returnMousePressed();
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

// Scrolling layered background
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
  this.drawOnceStart = function () {
    image(this.sheet, this.x, this.y, this.frameWidth * this.scale, this.h * this.scale, this.frameWidth * floor(this.frame), 0, this.frameWidth, this.h);
      if (this.frame < this.frames) {
          this.frame += 0.25;
      }
  }
  this.drawFX = function () {
    image(this.sheet, speederMotion.x + 10, speederMotion.y - 30, this.frameWidth * this.scale, this.h * this.scale, this.frameWidth * floor(this.frame), 0, this.frameWidth, this.h);
      if (this.frame <= this.frames) {
          this.frame += 0.15;
      }
  }
  this.drawEX = function () {
    image(this.sheet, speederMotion.x + 20, speederMotion.y, this.frameWidth * this.scale, this.h * this.scale, this.frameWidth * floor(this.frame), 0, this.frameWidth, this.h);
      if (this.frame <= this.frames) {
          this.frame += 0.15;
      }
  }
}

function drawSpeederDecoy() {
  // Does not draw if "r" was pressed
  if (rPressedDecoy) return;

  let decoyWidth = 2;
  let decoyHeight = 2;

  image(
    speederDecoy, 120, 312, speederDecoy.width * decoyWidth, speederDecoy.height * decoyHeight);
}

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

// Handles the scrolling object spawns, random rotations, spawnrate, and speed
class ScrollObject {
  constructor() {
    // Chooses obstacle type
    this.index = pickWeightedIndex(rarity);
    this.img = obstacleImages[this.index];

    this.x = width + 80;
    this.y = random(60, height - 60);
    this.speed = speeds[this.index];
    this.passed = false;
  }
  update() {
    // Left movement on canvas
    this.x -= this.speed;
  }

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

function drawThreeBurnIcons() {
  let startX = 920;
  let y = 660;
  let spacing = 45;
  
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

function drawPopUp() {
  imageMode(CENTER);
  image(instructionsPage, width / 2, height / 2);
}

function drawRText() {
  if (frameCount % 60 < 30) {
    fill("#f3f3f3");
    textSize(48);
    textFont(selectText);
    textAlign(CENTER);
    text("Press R to begin", width / 2, height / 2);
  }
}

function drawScore() {
  fill("#f3f3f3");
  textSize(28);
  textAlign(RIGHT, TOP);
  text("Score: " + passedCount, width - 20, 20);
}

function drawScoreWindow() {
  push();
  imageMode(CENTER);
  image(scoreWindow, width / 2, height / 2);
  pop();
}

function drawScoreWindowText() {
  fill("#f3f3f3");
  textSize(76);
  textAlign(CENTER, CENTER);
  text("Oh no! You crashed!", width / 2, height / 2 - 120);
  textSize(48);
  text("Your final score was: " + passedCount, width / 2, height / 2 - 60);
}

function resetMenu() {
    easy.isPressed = false;
    easy.hover = false;
    medium.isPressed = false;
    medium.hover = false;
    hard.isPressed = false;
    hard.hover = false;
  
    speederAlive = true;

    // reset popup on entering a mode again
    showPopUp = true;
    showRText = false;

    // reset any positioning affected during gameplay
    platformX = 50;
    rAlreadyUsed = false;
    rPressedDecoy = false;

    // reset timeburn UI
    grayScale = [false, false, false];
    nextToGray = 0;

    // reset objects
    objects = [];
    passedCount = 0;

    menuScrolling = true;
}

