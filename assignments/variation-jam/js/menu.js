// Button positions
let easy = {
  x: 420,
  y: 451,
  w: 250,
  h: 40,
  state: "green-variation",
  setup: greenSetup,
  label: "Easy"
};

let medium = {
  x: 420,
  y: 533,
  w: 250,
  h: 40,
  state: "blue-variation",
  setup: blueSetup,
  label: "Medium"
};

let hard = {
  x: 420,
  y: 616,
  w: 250,
  h: 40,
  state: "red-variation",
  setup: redSetup,
  label: "Hard"
};

function menuDraw() {
  drawScrollingBackgrounds();
  image(bgMenu, 0, 0, width, height);

  textAlign(CENTER, CENTER);
  textFont(selectText);

  drawButton(easy);
  drawButton(medium);
  drawButton(hard);

  blinkingText();
}

function drawButton(button) {
  let hoverRadius = 20;

  // Text Center
  let buttonCenterX = button.x + button.w / 2;
  let buttonCenterY = button.y + button.h / 2;

  // Check if mouse is within hover radius
  let hovering = dist(mouseX, mouseY, buttonCenterX, buttonCenterY) < hoverRadius;

  // Change text color on hover
  if (hovering) {
    fill("#A73786");
  } else {
    fill("#9855CC");
  }

  // Draws the text
  textSize(36);
  text(button.label, buttonCenterX, buttonCenterY);
}


function menuMousePressed() {
  // Easy button
  if (
    mouseX > easy.x && mouseX < easy.x + easy.w &&
    mouseY > easy.y && mouseY < easy.y + easy.h
  ) {
    state = easy.state;
    easy.setup();
  }
  // Medium button
  else if (
    mouseX > medium.x && mouseX < medium.x + medium.w &&
    mouseY > medium.y && mouseY < medium.y + medium.h
  ) {
    state = medium.state;
    medium.setup();
  }
  // Hard button
  else if (
    mouseX > hard.x && mouseX < hard.x + hard.w &&
    mouseY > hard.y && mouseY < hard.y + hard.h
  ) {
    state = hard.state;
    hard.setup();
  }
}

function blinkingText() {
   // Blinking text in center
  if (frameCount % 60 < 30) {
    fill("#8E2C81");
    textSize(24);
    text("Select level", width / 2 + 9, height / 2 + 50);
  }
}

function drawScrollingBackgrounds() {
  for (let i = 0; i < bgLayers.length; i++) {

    // Move layer
    bgX[i] -= bgSpeed[i];

    // Reset when off screen
    if (bgX[i] <= -width) {
      bgX[i] = 0;
    }

    // Draw TWO copies for seamless looping
    image(bgLayers[i], bgX[i], 0, width, height);
    image(bgLayers[i], bgX[i] + width, 0, width, height);
  }
}
