const videos = [
    { 
        src: '../videos/morgan-fake.mov', 
        isFake: true, 
        explanation: "The eye regions are not reflecting naturally, and the pattern of blinking are abnormal. The audio is also out of synchronization with the mouth and the lips are unnatural and delay the creation of effects.", 
        imageSrc: '../images/morgan-exlpain.jpg'
    },
    { 
        src: '../videos/spiderman-fake.mov', 
        isFake: true, 
        explanation: "This is a deepfake because of the inconsistencies around key facial areas. There are a lot of unnatural blends along the edges of the face and the jawline, which typically signifies an AI-generated overlay. Subtle mismatches in lip movements and gaze reflections suggest a lack of natural fluidity that can normally be expected from deepfake technology.", 
        imageSrc: '../images/spiderman-explain.jpg'
    },
    {
        src: '../videos/tom-cruise-deep-fake.mov',
        isFake: true,
        explanation: "The face closely resembles Tom Cruise, but there are subtle inconsistencies that would expose it as artificial. There are face movement stutters, eye blinking may not be symmetrical, or the movement of the lips does not synchronize with what it is saying. Such little details can always be more easily caught in a video.",
        imageSrc: '../images/tom-cruise-deep-fake.png'
    },
];

let currentVideoIndex = 0;
let correctAnswers = 0;
let answersSubmitted = 0;

const videoWindow = document.getElementById('video-window');
const explanationWindow = document.getElementById('explanation-window');
const videoElement = document.getElementById('current-video');
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

// Function to start and display the next video
function showNextVideo() {
    // Check if we have gone through all the videos
    if (answersSubmitted >= videos.length) {
        checkResult(); // Once all videos have been answered, check the result
        return;
    }

    // Reset feedback for the next video
    feedbackElement.textContent = ''; 
    showExplanationButton.style.display = 'none'; // Hide the "Show Explanation" button initially
    
    // Show the video window
    explanationWindow.style.display = 'none';
    videoWindow.style.display = 'block';

    // Display the current video
    videoElement.src = videos[currentVideoIndex].src;
}

// Function to check the user's answer and show feedback
function checkAnswer(isUserSayingFake) {
    const currentVideo = videos[currentVideoIndex];
    
    // Check if the user was correct or not
    if (currentVideo.isFake === isUserSayingFake) {
        feedbackElement.textContent = "Correct!";
        feedbackElement.style.color = "green";
        correctAnswers++;
    } else {
        feedbackElement.textContent = "Incorrect! This is " + (currentVideo.isFake ? "a deepfake." : "real.");
        feedbackElement.style.color = "red";
    }

    // Increase the answers submitted count
    answersSubmitted++;

    // Show the "Show Explanation" button after the answer
    showExplanationButton.style.display = 'inline-block';
}

// Function to display the explanation
function showExplanation() {
    const currentVideo = videos[currentVideoIndex];

    // Pause the video to stop the audio
    videoElement.pause();

    // Hide video window and show explanation window
    videoWindow.style.display = 'none';
    explanationWindow.style.display = 'block';

    // Show the explanation and image
    explanationTextElement.textContent = currentVideo.explanation;
    explanationImageElement.src = currentVideo.imageSrc;

    // Increment the current video index
    currentVideoIndex++;

    // Check if it's the last video and hide the "Next" button
    if (currentVideoIndex < videos.length) {
        nextButton.style.display = 'inline-block'; // Show the "Next" button for other videos
    } else {
        nextButton.style.display = 'none'; // Hide the "Next" button on the last video
        checkResult(); // Call checkResult to handle the result after the last video
    }
}


// Function to check if the quiz is completed and handle result
function checkResult() {
    if (correctAnswers === videos.length) {
        resultMessage.textContent = "Congratulations! You correctly identified all videos.";
        learnMoreButton.style.display = 'inline-block'; // Show the learn more button
        restartButton.style.display = 'none'; // Hide the restart button
    } else {
        resultMessage.textContent = `You got ${correctAnswers} out of ${videos.length} correct. Try again!`;
        learnMoreButton.style.display = 'none'; // Hide the learn more button
        restartButton.style.display = 'inline-block'; // Show the restart button
    }

    resultWindow.style.display = 'block'; // Show the result window
}

// Restart the quiz
restartButton.addEventListener('click', () => {
    currentVideoIndex = 0;
    correctAnswers = 0;
    answersSubmitted = 0;
    resultWindow.style.display = 'none';
    showNextVideo(); // Start the first video again
});

// Event listeners for real/fake buttons
realButton.addEventListener('click', () => checkAnswer(false)); // Real is false
fakeButton.addEventListener('click', () => checkAnswer(true)); // Fake is true

// Event listener for showing explanation
showExplanationButton.addEventListener('click', showExplanation);

// Event listener for next button (after explanation)
nextButton.addEventListener('click', showNextVideo);

// Start the quiz with the first video
showNextVideo();
