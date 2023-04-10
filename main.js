// Create the scene, camera, and renderer
import * as THREE from 'three';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

// Set the background color to black
renderer.setClearColor(0x000000);

// Set the size of the renderer to the window size
renderer.setSize(window.innerWidth, window.innerHeight);

// Add the renderer to the page
document.body.appendChild(renderer.domElement);

// Create the player geometry and material
var playerGeometry = new THREE.BoxGeometry(1, 1, 1);
var playerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

var poleGeometry = new THREE.BoxGeometry(1, 1, 1);
var poleMaterial = new THREE.MeshBasicMaterial({ color: 0x00EFF });

// Create the player mesh and add it to the scene
var player = new THREE.Mesh(playerGeometry, playerMaterial);
scene.add(player);

var pole = new THREE.Mesh(poleGeometry, poleMaterial);
scene.add(pole);



// Position the camera above the player and point it at the player
camera.position.set(0, 10, 0);
camera.lookAt(player.position);

// Set up the player movement
var playerSpeed = 0.1;
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;

// Set up the key event listeners
document.addEventListener('keydown', function(event) {
    console.log(event.key)
    switch (event.key) {
        case 'w': // W
            moveForward = true;
            break;
        case 'a': // A
            moveLeft = true;
            break;
        case 's': // S
            moveBackward = true;
            break;
        case 'd': // D
            moveRight = true;
            break;
    }
}, false);

document.addEventListener('keyup', function(event) {
    switch (event.key) {
        case 'w': // W
            moveForward = false;
            break;
        case 'a': // A
            moveLeft = false;
            break;
        case 's': // S
            moveBackward = false;
            break;
        case 'd': // D
            moveRight = false;
            break;
    }
}, false);

// Define the camera offset
var cameraOffset = new THREE.Vector3(0, 10, 0);

// Update the camera position to follow the player
function updateCameraPosition() {
  camera.position.copy(player.position).add(cameraOffset);
  camera.lookAt(player.position);
}


// Render the scene
function render() {
    requestAnimationFrame(render);

    // Move the player based on the keyboard input
    if (moveForward) {
        player.position.z -= playerSpeed;
    }
    if (moveBackward) {
        player.position.z += playerSpeed;
    }
    if (moveLeft) {
        player.position.x -= playerSpeed;
    }
    if (moveRight) {
        player.position.x += playerSpeed;
    }

    renderer.render(scene, camera);

    updateCameraPosition();
}

render(); // Start the game loop