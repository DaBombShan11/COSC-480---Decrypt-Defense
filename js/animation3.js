// Elements
const videoElement = document.getElementById('video');
const captureButton = document.getElementById('capture-button');
const confirmUploadButton = document.getElementById('confirm-upload-button');
const confirmCelebrityButton = document.getElementById('confirm-celebrity-button');
const canvas = document.getElementById('canvas');
const capturedImage = document.getElementById('captured-image');
const uploadInput = document.getElementById('upload-input');
const celebrityBox = document.getElementById('celebrity-box');
const resultBox = document.getElementById('result-box');
const swappedImage = document.getElementById('swapped-image');
const progressBarFill = document.getElementById('progress-bar-fill');
const progressText = document.getElementById('progress-text');
const faceSelection = document.getElementById('face-selection');
let selectedCelebrity = null;

// Step 1: Access the webcam and start video feed
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true
        });
        videoElement.srcObject = stream;
    } catch (error) {
        console.error("Error accessing webcam:", error);
    }
}

// Capture the image when the capture button is clicked
captureButton.addEventListener('click', () => {
    // Create a canvas and capture the current frame
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    // Display captured image in the container
    capturedImage.src = canvas.toDataURL('image/png');
    capturedImage.style.display = 'block';

    // Enable the "Confirm" button
    confirmUploadButton.disabled = false;
});

// Handle image upload
uploadInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            capturedImage.src = reader.result;
            capturedImage.style.display = 'block';
            confirmUploadButton.disabled = false;
        };
        reader.readAsDataURL(file);
    }
});

// Confirm the upload or capture image
confirmUploadButton.addEventListener('click', () => {
    // Show celebrity selection box after confirmation
    document.getElementById('upload-box').classList.add('hidden');
    celebrityBox.classList.remove('hidden');
});

// Step 2: Handle face selection
const faceOptions = document.querySelectorAll('.face-option');
faceOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove "selected" class from all options
        faceOptions.forEach(opt => opt.classList.remove('selected'));

        // Add "selected" class to the clicked option
        option.classList.add('selected');

        // Set selected celebrity image
        selectedCelebrity = option.src;

        // Enable the "Select and Confirm" button
        confirmCelebrityButton.disabled = false;
    });
});

confirmCelebrityButton.addEventListener('click', () => {
    if (selectedCelebrity) {
        // Set the source of swappedImage to your specific image file
        swappedImage.src = '../images/swapped_face2.jpg';
        swappedImage.style.display = 'block';

        // Hide the captured image
        capturedImage.style.display = 'none';

        // Completely remove the "Confirm" button from the DOM
        confirmCelebrityButton.style.display = 'none'; // Hide the button completely

        // Show result box
        celebrityBox.classList.add('hidden');
        resultBox.classList.remove('hidden');

        // Set the progress bar to be 1/7th filled
        progressBarFill.style.width = '14.28%';  // 1 out of 7 steps

        // Set the text to show "1 / 7"
        progressText.textContent = 'Progress: 1 / 7';
    }
});

// Start the camera when the page loads
startCamera();
