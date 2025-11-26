/**
 * Timeburner
 * Ben Woschitz
 * 
 * A relatively simple example of a set of variations within a single
 * project. (When we learn Object-Oriented Programming this will be a
 * LOT easier.)
 */

"use strict";

let state = "menu";
let bgMenu;
let selectText;

// Scrolling Background and sets up arrays
let bgLayers = [];
let bgX = [];
let bgSpeed = [];

function preload() {
    // Preloads Menu UI Image
    bgMenu = loadImage("assets/sprites/Menu/TimeBurnerMenuHalf.png");
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
}

/**
 * Create the canvas
*/
function setup() {
    createCanvas(1080, 720);
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
            break
        case "green-variation":
            greenMousePressed();
            break;
        case "blue-variation":
            blueMousePressed();
            break;
    }
}