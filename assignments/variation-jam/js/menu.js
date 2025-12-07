// Buttons
let easy = {
  x: 420,
  y: 451,
  w: 258,
  h: 69,
  state: "green-variation",
  setup: greenSetup,
  img: null,
  imgHover: null,
  imgPressed: null,
  isPressed: false,
  hover: false
};

let medium = {
  x: 420,
  y: 533,
  w: 258,
  h: 69,
  state: "blue-variation",
  setup: blueSetup,
  img: null,
  imgHover: null,
  imgPressed: null,
  isPressed: false,
  hover: false
};

let hard = {
  x: 420,
  y: 616,
  w: 258,
  h: 69,
  state: "red-variation",
  setup: redSetup,
  img: null,
  imgHover: null,
  imgPressed: null,
  isPressed: false,
  hover: false
};

/**
 * Checks if mouse is inside button area
*/
function near(button) {
  return mouseX > button.x && mouseX < button.x + button.w &&
         mouseY > button.y && mouseY < button.y + button.h;
}

/**
 * Draws button in either hover, normal, or pressed state
*/
function drawButton(button) {
  let imgShow = button.img;

  if (button.isPressed) {
    imgShow = button.imgPressed;
  } else if (button.hover) {
    imgShow = button.imgHover;
  }

  image(imgShow, button.x, button.y, button.w, button.h);
}

/**
 * Updates button states
*/
function updateButtons() {

  // Update hover state
  easy.hover = near(easy);
  medium.hover = near(medium);
  hard.hover = near(hard);

  // Checks mouse pressed
  if (mouseIsPressed) {
    if (easy.hover) easy.isPressed = true;
    if (medium.hover) medium.isPressed = true;
    if (hard.hover) hard.isPressed = true;
  } else {
    
    // Only triggers state change when mouse is released while hovering on the button
    if (easy.isPressed && easy.hover) {
      state = easy.state;
      easy.setup();
      menuSelect.play();
      menuMusic.stop();
      drawLevelMusic();
    }
    if (medium.isPressed && medium.hover) {
      state = medium.state;
      medium.setup();
      menuSelect.play();
      menuMusic.stop();
      drawLevelMusic();
    }
    if (hard.isPressed && hard.hover) {
      state = hard.state;
      hard.setup();
      menuSelect.play();
      menuMusic.stop();
      drawLevelMusic();
    }

    // Resets pressed states
    easy.isPressed = false;
    medium.isPressed = false;
    hard.isPressed = false;
  }
}

/**
 * Draws menu and splash screen
*/
function menuDraw() {

  // Scrolling Background is always drawn
  drawScrollingBackgrounds(menuScrolling);

  // Displays splash screen
  if (!hasClickedToStart) {
    fill("#100c1ea6");
    rect(0, 0, 1080, 720);
    fill("#f3f3f3");
    textSize(48);
    textFont(selectText);
    textAlign(CENTER, CENTER);
    text("Click to Start", width/2, height/2 + 50);
    return;
  }

  // Starts menu music after click
  if (!menuMusicStarted) {
    startMenuMusic();
  }
  image(bgMenu, 0, 0, width, height);

  updateButtons();

  drawButton(easy);
  drawButton(medium);
  drawButton(hard);

  blinkingText();
}

/**
 * Draws select difficulty blinking text
*/
function blinkingText() {
  if (frameCount % 60 < 30) {
    fill("#8E2C81");
    textSize(24);
    textFont(selectText);
    textAlign(LEFT, BOTTOM);
    text("Select Difficulty", width / 2 - 67, height / 2 + 70);
  }
}