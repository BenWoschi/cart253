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

// Checks if mouse is inside the button rectangle
function near(button) {
  return mouseX > button.x && mouseX < button.x + button.w &&
         mouseY > button.y && mouseY < button.y + button.h;
}

// Draws button in either normal, hover or pressed state
function drawButton(button) {
  let imgShow = button.img;

  if (button.isPressed) {
    imgShow = button.imgPressed;
  } else if (button.hover) {
    imgShow = button.imgHover;
  }

  image(imgShow, button.x, button.y, button.w, button.h);
}

// Updates button states
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
    }
    if (medium.isPressed && medium.hover) {
      state = medium.state;
      medium.setup();
    }
    if (hard.isPressed && hard.hover) {
      state = hard.state;
      hard.setup();
    }

    // Resets pressed states
    easy.isPressed = false;
    medium.isPressed = false;
    hard.isPressed = false;
  }
}

// Draws Menu
function menuDraw() {
  drawScrollingBackgrounds(menuScrolling);
  image(bgMenu, 0, 0, width, height);

  updateButtons();

  drawButton(easy);
  drawButton(medium);
  drawButton(hard);

  blinkingText();
}

// Allows text to repeatedly blink
function blinkingText() {
  if (frameCount % 60 < 30) {
    fill("#8E2C81");
    textSize(24);
    textFont(selectText);
    text("Select level", width / 2 - 45, height / 2 + 70);
  }
}