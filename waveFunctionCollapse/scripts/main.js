/** @type {HTMLCanvasElement} */
let canvas;
let cell1;
let cell2;
let projectDataBackUp = Object.entries(ProjectData);
let cellGrid;

// const images = {};
const tiles = [];
const images = {};
const imagesDirectory = "images/";

const imageNames = [
    "NONE_NONE_NONE_NONE",
    "NONE_NONE_RIVER_NONE",
    "NONE_NONE_WALK_NONE",
    "NONE_WALK_WALK_NONE",
    "NONE_RIVER_RIVER_NONE",
    "RIVER_NONE_RIVER_NONE",
    "RIVER_WALK_RIVER_WALK",
    "RIVER_WALK_WALK_RIVER",
    "WALK_NONE_RIVER_NONE",
    "WALK_NONE_WALK_NONE",
    "WALK_WALK_WALK_NONE",
    "WALK_WALK_WALK_WALK",
];

const sideTypes = {
    "NONE": SideType.None,
    "WALK": SideType.Walk,
    "RIVER": SideType.River,
}

function preload() {
    for (let i = 0; i < imageNames.length; i++) {
        images[i] = loadImage(imagesDirectory + imageNames[i] + ".png");
    }
}

function setup() {
    canvas = createCanvas(ProjectData.CanvasWidth, ProjectData.CanvasHeight);
    // frameRate(60);
    centerCanvas();

    loadTiles();

    cellGrid = new CellGrid(ProjectData.GridSize, images);
}

function draw() {
    background(90);
    cellGrid.update();
    cellGrid.draw();

    // if (mouseIsPressed) {
    //     cellGrid.collapseNextCell();
    // }
}

function windowResized() {
    centerCanvas();
}

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    canvas.position(x, y);
}

function resetCanvas() {
    canvas = createCanvas(ProjectData.CanvasWidth, ProjectData.CanvasHeight);
    centerCanvas();
}

function loadTiles() {
    loadTile(0, 0);    //   "NONE_NONE_NONE_NONE"
    loadTile(1, 3);    //   "NONE_NONE_RIVER_NONE"
    loadTile(2, 3);    //   "NONE_NONE_WALK_NONE"
    loadTile(3, 3);    //   "NONE_WALK_WALK_NONE"
    loadTile(4, 3);    //   "NONE_RIVER_RIVER_NONE"
    loadTile(5, 1);    //   "RIVER_NONE_RIVER_NONE"
    loadTile(6, 1);    //   "RIVER_WALK_RIVER_WALK"
    loadTile(7, 3);    //   "RIVER_WALK_WALK_RIVER"
    loadTile(8, 3);    //   "WALK_NONE_RIVER_NONE"
    loadTile(9, 1);    //   "WALK_NONE_WALK_NONE"
    loadTile(10, 3);   //   "WALK_WALK_WALK_NONE"
    loadTile(11, 0);   //   "WALK_WALK_WALK_WALK"
}

function loadTile(imageIndex, rotations) {

    const sides = imageNames[imageIndex].split('_');

    tiles.push(
        new Tile([[sideTypes[sides[0]]], [sideTypes[sides[1]]], [sideTypes[sides[2]]], [sideTypes[sides[3]]]], images[imageIndex])
    );

    const lastTileIndex = tiles.length - 1;
    for (let i = 0; i < rotations; i++) {
        tiles.push(tiles[lastTileIndex].rotate(i + 1));
    }
}