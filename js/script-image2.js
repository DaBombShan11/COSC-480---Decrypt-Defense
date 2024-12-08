const images = [
    { 
        src: '../images/trump_fake.JPG', 
        isFake: true, 
        explanation: "This is a deep fake because the textures of hair and skin are way too smooth or unnatural and can signal AI-enhanced features. The overall look doesn&#39;t reveal minor imperfections, common in real-life images. Deep Fakes often tend to impress due to their hyper-realistic, though slightly uncanny-looking, nature.", 
        imageSrc: '../images/trump_fake_e.png'
    }, 
    {
        src: "../images/trump_real_1.PNG",
        isFake: false,
        explanation: "This image highlights authenticity and natural details, indicating a genuine, unedited photograph. The textures of the hair and skin appear realistic, with natural imperfections and proper lighting.",
        imageSrc:"../images/trump_real_1_e.png"
    },
    {
        src: "../images/biden_trump_fake.JPG",
        isFake: true,
        explanation: "This image demonstrates facial manipulation created using advanced editing or deepfake technology. The unrealistic scenario and seamless blending of facial features indicate digital alteration.",
        imageSrc: "../images/biden_trump_fake_e.png"
    },
    {
        src: "../images/trump_real_2.JPG",
        isFake: false,
        explanation:"This image isn&#39;t a deep fake because the facial symmetry and features look natural, without distortions. The lighting and shadows align consistently with the environment, which deepfakes often struggle to replicate. Additionally, the skin texture and expression dynamics seem realistic, lacking the smoothness or artifacts common in deep fakes." ,
        imageSrc: "../images/trump_real_2_e.png"
    },
];

let currentImageIndex = 0;
let correctAnswers = 0;
let answersSubmitted = 0;

const imageWindow = document.getElementById('image-window');
const explanationWindow = document.getElementById('explanation-window');
const imageElement = document.getElementById('current-image');
const feedbackElement = document.getElementById('feedback');
const explanationTextElement = document.getElementById('explanation-text');
const explanationImageElement = document.getElementById('explanation-image');
const realButton = document.getElementById('real-button');
const fakeButton = document.getElementById('fake-button');
const nextButton = document.getElementById('next-button');
const showExplanationButton = document.getElementById('show-explanation-button');
const resultWindow = document.getElementById('result-window');
const resultMessage = document.getElementById('result-message');
const learnMoreButton = document.getElementById('learn-more-button');
const restartButton = document.getElementById('restart-button');

// Function to start and display the next image
function showNextImage() {
    // Check if we have gone through all the images
    if (answersSubmitted >= images.length) {
        checkResult(); // Once all images have been answered, check the result
        return;
    }

    // Hide explanation window and show image window
    explanationWindow.style.display = 'none';
    imageWindow.style.display = 'block';

    // Display the current image
    imageElement.src = images[currentImageIndex].src;

    // Clear feedback for the next image
    feedbackElement.textContent = ''; 
    showExplanationButton.style.display = 'none'; // Hide the "Show Explanation" button initially
}

// Function to check the user's answer and show feedback
function checkAnswer(isUserSayingFake) {
    const currentImage = images[currentImageIndex];
    
    // Check if the user was correct or not
    if (currentImage.isFake === isUserSayingFake) {
        feedbackElement.textContent = "Correct!";
        feedbackElement.style.color = "green";
        correctAnswers++;
    } else {
        feedbackElement.textContent = "Incorrect! This is " + (currentImage.isFake ? "a deepfake." : "real.");
        feedbackElement.style.color = "red";
    }

    // Increase the answers submitted count
    answersSubmitted++;

    // Show the "Show Explanation" button after the answer
    showExplanationButton.style.display = 'inline-block';
}

// Function to display the explanation
function showExplanation() {
    const currentImage = images[currentImageIndex];

    // Hide image window and show explanation window
    imageWindow.style.display = 'none';
    explanationWindow.style.display = 'block';

    // Show the explanation and image
    explanationTextElement.textContent = currentImage.explanation;
    explanationImageElement.src = currentImage.imageSrc;

    // After showing the explanation, move to the next image
    currentImageIndex++;

    // If it's the last image, hide the "Next" button and show the result
    if (currentImageIndex >= images.length) {
        nextButton.style.display = 'none'; // Hide the "Next" button on the last image
        checkResult(); // Call checkResult to handle the result after the last image
    } else {
        nextButton.style.display = 'inline-block'; // Show the "Next" button for other images
    }
}

// Function to check if the quiz is completed and handle result
function checkResult() {
    if (correctAnswers === images.length) {
        resultMessage.textContent = "Congratulations! You correctly identified all images.";
        learnMoreButton.style.display = 'inline-block'; // Show the learn more button
        restartButton.style.display = 'none'; // Hide the restart button

    } else {
        resultMessage.textContent = `You got ${correctAnswers} out of ${images.length} correct. Try again!`;
        learnMoreButton.style.display = 'none'; // Hide the learn more button
        restartButton.style.display = 'inline-block'; // Show the restart button
    }

    resultWindow.style.display = 'block'; // Show the result window
}

// Event listeners for buttons
realButton.addEventListener('click', () => {
    checkAnswer(false); // User says the image is real
});

fakeButton.addEventListener('click', () => {
    checkAnswer(true); // User says the image is fake
});

// Event listener for the "Show Explanation" button
showExplanationButton.addEventListener('click', () => {
    // Show the explanation
    showExplanation();
    // Hide the explanation button until the next question is loaded
    showExplanationButton.style.display = 'none';
});

// Event listener for the Next Image button
nextButton.addEventListener('click', showNextImage);

// Event listener for the Restart button
restartButton.addEventListener('click', () => {
    correctAnswers = 0;
    currentImageIndex = 0;
    answersSubmitted = 0;
    resultWindow.style.display = 'none';
    showNextImage(); // Restart the quiz
});

// Initialize the first image
showNextImage();
