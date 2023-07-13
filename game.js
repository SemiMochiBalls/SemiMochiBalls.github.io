// Get the canvas element
console.log("buggers!!!");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game variables
let score = 0; // Keeps track of the player's score
let hoppingInterval = 1500; // Interval at which the bug hops (in milliseconds)
let bugX, bugY; // Coordinates of the bug's position
let bugSize = 64; // Size of the bug image

// Bug image
const bugImage = new Image();
bugImage.src = "bug.png"; // The image file for the bug

// Splattered bug image
const splatteredImage = new Image();
splatteredImage.src = "splattered.png"; // The image file for the squashed bug

// Play zone image
const playZoneImage = new Image();
playZoneImage.src = "playzone.png"; // The image file for the play zone

// Score display
const scoreDisplay = document.getElementById("scoreDisplay");

// Flag to track if bug is splattered
let isSplattered = false;

// Update the bug position
function updateBugPosition() {
    bugX = Math.random() * (canvas.width - bugSize); // Randomly set the bug's X-coordinate within the canvas width
    bugY = Math.random() * (canvas.height - bugSize); // Randomly set the bug's Y-coordinate within the canvas height
    bugSize = Math.floor(Math.random() * 65) + 64; // Randomize bug size between 64 and 128
    isSplattered = false; // Reset the flag to indicate the bug is not splattered
}

// Draw the bug on the canvas
function drawBug() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.drawImage(playZoneImage, 0, 0, canvas.width, canvas.height); // Draw the play zone image

    if (!isSplattered) {
        ctx.drawImage(bugImage, bugX, bugY, bugSize, bugSize); // Draw the bug image at its position
    } else {
        ctx.drawImage(splatteredImage, bugX, bugY, bugSize, bugSize); // Draw the squashed bug image
    }
}

// Update the score display
function updateScoreDisplay() {
    scoreDisplay.textContent = "Score: " + score; // Update the score display text
}

// Handle mouse click events
function handleClick(event) {
    const mouseX = event.clientX - canvas.offsetLeft; // Calculate the mouse X-coordinate relative to the canvas
    const mouseY = event.clientY - canvas.offsetTop; // Calculate the mouse Y-coordinate relative to the canvas

    // Check if the bug is clicked within a certain range
    if (
        !isSplattered &&
        mouseX >= bugX - 25 &&
        mouseX <= bugX + bugSize + 25 &&
        mouseY >= bugY - 25 &&
        mouseY <= bugY + bugSize + 25
    ) {
        score++; // Increase the score
        hoppingInterval -= 100; // Decrease the hopping interval to make the bug hop faster
        isSplattered = true; // Set the flag to indicate the bug is splattered
        updateScoreDisplay(); // Update the score display

        // Temporarily show the splattered bug image
        drawBug();
        setTimeout(() => {
            isSplattered = false; // Reset the flag after a delay
            updateBugPosition(); // Respawn the bug at a new position
        }, 1000); // Set the time to show the splattered bug image before respawning (in milliseconds)
    }
}

// Reset the hopping interval to its initial value
function resetSpeed() {
    hoppingInterval = 1000; // Reset the hopping interval to its initial value
}

// Reset the score
function resetScore() {
    score = 0; // Reset the score to zero
    updateScoreDisplay(); // Update the score display
}

// Update the game state and draw the bug
function updateGame() {
    updateBugPosition(); // Update the bug's position
    drawBug(); // Draw the bug on the canvas
    updateScoreDisplay(); // Update the score display
    setTimeout(updateGame, hoppingInterval); // Schedule the next game update based on the hopping interval
}

// Event listeners
canvas.addEventListener("mousedown", handleClick); // Listen for mouse click events on the canvas
document.getElementById("resetSpeed").addEventListener("click", resetSpeed); // Listen for clicks on the speed reset button
document.getElementById("resetScore").addEventListener("click", resetScore); // Listen for clicks on the score reset button

// Initialize the game
playZoneImage.onload = () => {
    updateGame(); // Start the game loop once all images are loaded
    console.log("end of script")};
