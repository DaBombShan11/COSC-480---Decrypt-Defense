const images = [
    {
        src: '../images/fakeoutlookemail.png',
        isFake: true,
        explanation: "This is a phishing email because of its impersonalization, or something lacking human characteristics (specific names) to make something more generic. There are also numerous grammatical errors, vague language, and awkward phrasing for a large company such as Microsoft. There is also a lack of detail from the 'company' who sent the email.",
        imageSrc: '../images/fakeoutlookemailexplanation.png'
    },
    {
        src: "../images/realAmazonorder.png",
        isFake: false,
        explanation: "This is a genuine email due to being personalized to the email recipient, showing that this email was specifically for John Price. There is detailed information about the company who is emailing at the bottom of the order confirmation. The email also provides an exact order number in the subject line and email, and there is a lack of urgency towards the user to take additional steps or to insert their personal information.",
        imageSrc:"../images/realAmazonorderexplanation.png"
    },
    {
        src: "../images/fakelastpass.png",
        isFake: true,
        explanation: "This is a phishing email because of its impersonalization, lack of detail from the company who sent the email. The email is also urging the user to go to a vague website to input sensitive information without much detail on where exactly they will be directed to.",
        imageSrc: "../images/fakelastpassexplanation.png"
    },
    {
        src: "../images/realiphonesoundplayed.png",
        isFake: false,
        explanation:"This is a genuine email due to being personalized to the email recipient, detailed information about the company who is emailing, providing an accurate time that the sound was played to when the email was sent, and a lack of urgency towards the user to take additional steps or to insert their personal information." ,
        imageSrc: "../images/realphonesoundplayedexplanation.png"
    },
];

let currentImageIndex = 0;
let wrongAnswersCount = 0;
const totalQuestions = images.length;

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

// Function to show next image and handle quiz end
function showNextImage() {
    if (currentImageIndex >= totalQuestions) {  
        resultWindow.style.display = 'block'; 

        if (wrongAnswersCount > 0) {
            resultMessage.innerHTML = `  
                <p>You got one or more answers wrong. Please restart the quiz.</p>                   
                <button id="restartButton" style="display:inline-block;" onclick="restartQuiz()">Restart Quiz</button>
            `;  
        } else {
            resultMessage.innerHTML = `
                <p>Congratulations! You've completed the quiz successfully!</p>
                <button id="congratsButton" style="display:inline-block;" onclick="window.location.href='../html/congratulations.html'">Click to obtain certificate</button>
            `; 
        }
        return;
    }

    explanationWindow.style.display = 'none';
    imageWindow.style.display = 'block';
    
    imageElement.src = images[currentImageIndex].src;
    feedbackElement.textContent = '';
    showExplanationButton.style.display = 'none';
}

function checkAnswer(isUserSayingFake) {
    const currentImage = images[currentImageIndex];
    if (currentImage.isFake === isUserSayingFake) {
        feedbackElement.textContent = "Correct!";
        feedbackElement.style.color = "green"; 
    } else {
        feedbackElement.textContent = "Incorrect! This is " + (currentImage.isFake ? "a phishing email." : "a legitimate email.");
        feedbackElement.style.color = "red";  
        wrongAnswersCount++;  
    }
    showExplanationButton.style.display = 'inline-block';
}

function showExplanation() {
    const currentImage = images[currentImageIndex];
    imageWindow.style.display = 'none';
    explanationWindow.style.display = 'block';
    
    explanationTextElement.textContent = currentImage.explanation;
    explanationImageElement.src = currentImage.imageSrc;
    
    currentImageIndex++; 

    if (currentImageIndex >= images.length) {
        nextButton.style.display = 'none';
        showNextImage();
    } else {
        nextButton.style.display = 'inline-block';
    }
}

realButton.addEventListener('click', () => {
    checkAnswer(false); 
});

fakeButton.addEventListener('click', () => {
    checkAnswer(true); 
});

showExplanationButton.addEventListener('click', showExplanation); 
nextButton.addEventListener('click', showNextImage); 

showNextImage();

function restartQuiz() {
    currentImageIndex = 0;
    wrongAnswersCount = 0;
    resultWindow.style.display = 'none';
    showNextImage();
}
