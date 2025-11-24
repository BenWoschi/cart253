// Button positions
let easy = {
  x: 100,
  y: 220,
  w: 200,
  h: 60,
  state: "green-variation",
  setup: greenSetup,
  label: "Easy"
};

let medium = {
  x: 100,
  y: 320,
  w: 200,
  h: 60,
  state: "blue-variation",
  setup: blueSetup,
  label: "Medium"
};

let hard = {
  x: 100,
  y: 420,
  w: 200,
  h: 60,
  state: "red-variation",
  setup: redSetup,
  label: "Hard"
};


function menuDraw() {
  background(0);
  textAlign(CENTER, CENTER);
  textSize(28);

  drawButton(easy);
  drawButton(medium);
  drawButton(hard);
}

function drawButton(button) {
  // Rectangle
  fill(50);
  rect(button.x, button.y, button.w, button.h, 10);

  // Text
  fill(255);
  text(button.label, button.x + button.w/2, button.y + button.h/2);
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

