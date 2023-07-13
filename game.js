// Get the canvas element
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
//FIREFOX EDGE OK CHROME NO BUG BUG
// Game variables
let score = 0;
let hoppingInterval = 900; // Initial hopping interval in milliseconds
let bugX, bugY;
let bugSize = 64; // Size of the bug image

// Bug image
const bugImage = new Image();
bugImage.src = "YnVnCg==.png";

// Splattered bug image
const splatteredImage = new Image();
splatteredImage.src = "c3BsYXR0ZXJlZA==.png";

// Play zone image
const playZoneImage = new Image();
playZoneImage.src = "cGxheXpvbmU=.png";

// Score display
const scoreDisplay = document.getElementById("scoreDisplay");

// Flag to track if bug is splattered
let isSplattered = false;

// Update the bug position
function updateBugPosition() {
    bugX = Math.random() * (canvas.width - bugSize);
    bugY = Math.random() * (canvas.height - bugSize);
    bugSize = Math.floor(Math.random() * 65) + 64; // Randomize bug size between 64 and 128
    isSplattered = false; // Reset the splattered flag
}

// Draw the bug on the canvas
function drawBug() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw the play zone image
    ctx.drawImage(playZoneImage, 0, 0, canvas.width, canvas.height);

    if (!isSplattered) {
        // Draw the bug image if it hasn't been splattered yet
        ctx.drawImage(bugImage, bugX, bugY, bugSize, bugSize);
    } else {
        // Draw the splattered image if it has been splattered
        ctx.drawImage(splatteredImage, bugX, bugY, bugSize, bugSize);
    }
}

// Update the score display
function updateScoreDisplay() {
    scoreDisplay.textContent = "Score: " + score;
}

    function handleClick(event) {
        // Get the mouse coordinates relative to the canvas
        const mouseX = event.clientX - canvas.offsetLeft;
        const mouseY = event.clientY - canvas.offsetTop;

        // Check if the bug has been clicked
        if (
            !isSplattered &&
            mouseX >= bugX - 25 &&
            mouseX <= bugX + bugSize + 25 &&
            mouseY >= bugY - 25 &&
            mouseY <= bugY + bugSize + 25
        ) {
            // Increase the score and speed up the bug hopping
            score++;
            hoppingInterval -= 100;
            isSplattered = true;
            updateScoreDisplay();

            // Draw the splattered bug image and reset it after a delay
            drawBug();
            setTimeout(() => {
                isSplattered = false;
                updateBugPosition();
            }, 1000);
        }
    }

function resetSpeed() {
    hoppingInterval = 1000;
}

// Reset the score
function resetScore() {
    score = 0;
    updateScoreDisplay();
}

// Update the game state and draw the bug
    function updateGame() {
        // Update the bug position
        updateBugPosition();
        // Draw the bug
        drawBug();
        // Update the score display
        updateScoreDisplay();
        // Call this function again after a delay
        setTimeout(updateGame, hoppingInterval);
    }

// Event listeners
canvas.addEventListener("mousedown", handleClick);
document.getElementById("resetSpeed").addEventListener("click", resetSpeed);
document.getElementById("resetScore").addEventListener("click", resetScore);

// Initialize the game
playZoneImage.onload = () => {
    bugImage.onload = () => {
        splatteredImage.onload = () => {
            updateGame();
        };
    };
};