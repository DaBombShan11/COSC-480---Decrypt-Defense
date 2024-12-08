// Define the GameManager object
const GameManager = {
    stages: [
        { name: "Deepfake Tutorial", file: "tutorial.html" },
        { name: "Deepfake Face Animation", file: "animation3.html" },
        { name: "Image Detection Tutorial", file: "image-tutorial.html" },
        { name: "Image Detection Practice", file: "image-detection.html" },
        { name: "Video Detection Tutorial", file: "video-tutorial.html" },
        { name: "Phishing Email Detection Tutorial", file: "phishing-tutorial.html" },
        { name: "Phishing Detection Practice", file: "phishing.html" },
    ],

    // Start the game at stage 0
    startGame() {
        localStorage.setItem("currentStage", 0);
        this.navigateToStage(0);
    },

    // Navigate to a specific stage
    navigateToStage(stageIndex) {
        if (stageIndex < this.stages.length) {
            localStorage.setItem("currentStage", stageIndex);
            window.location.href = this.stages[stageIndex].file;
        } else {
            alert("All stages completed! Congratulations!");
            window.location.href = "completion.html"; // Replace with your actual completion page
        }
    },

    // Proceed to the next stage
    proceedToNextStage() {
        let currentStage = parseInt(localStorage.getItem("currentStage")) || 0;
        if (currentStage < this.stages.length - 1) {
            this.navigateToStage(currentStage + 1);
        } else {
            alert("You have completed all stages! Get your certificate.");
            window.location.href = "completion.html"; // Replace with your actual completion page
        }
    },

    // Check access for the current stage
    checkStageAccess(stageIndex) {
        const currentStage = parseInt(localStorage.getItem("currentStage")) || 0;
        if (stageIndex > currentStage) {
            alert("Complete previous steps before proceeding.");
            setTimeout(() => this.navigateToStage(currentStage), 1000); // Redirect after 1-second delay
        } else {
            this.updateProgressDisplay();
        }
    },

    // Update the progress display (including the progress bar)
    updateProgressDisplay() {
        const progressElement = document.getElementById("progress-status");
        const progressBarFill = document.getElementById("progress-bar-fill");

        if (progressElement && progressBarFill) {
            const currentStage = parseInt(localStorage.getItem("currentStage")) || 0;

            // Update the text
            progressElement.innerText = `Progress: ${currentStage + 1}/${this.stages.length}`;

            // Calculate the percentage
            const percentage = (currentStage + 1) / this.stages.length * 100;

            // Update the progress bar fill width
            progressBarFill.style.width = `${percentage}%`;
        }
    },

    // Generate navigation links dynamically for completed stages
    generateNavigationMenu() {
        const menuContainer = document.getElementById("stage-menu");
        if (menuContainer) {
            menuContainer.innerHTML = ""; // Clear any existing content
            this.stages.forEach((stage, index) => {
                const currentStage = parseInt(localStorage.getItem("currentStage")) || 0;
                const link = document.createElement("a");
                link.href = index <= currentStage ? stage.file : "#";
                link.innerText = stage.name;
                link.className = index <= currentStage ? "enabled" : "disabled";
                menuContainer.appendChild(link);
            });
        }
    },
};

// Ensure mobile menu functionality is active
function initializeMobileMenu() {
    const menu = document.querySelector("#mobile-menu");
    const menuLinks = document.querySelector(".navbar__menu");

    if (menu && menuLinks) {
        menu.addEventListener("click", function () {
            menu.classList.toggle("is-active");
            menuLinks.classList.toggle("active");
        });
    }
}

// Call this function to initialize page-specific logic
function initializePage(stageIndex) {
    GameManager.checkStageAccess(stageIndex);
    GameManager.generateNavigationMenu();
}

// Ensure mobile menu functionality is active
initializeMobileMenu();

