let userGuesses = {1: '', 2: ''};

        function makeGuess(audioNumber, guess) {
            // Store the user's guess
            userGuesses[audioNumber] = guess;

            // Show explanation based on the guess
            const explanations = {
                1: {
                    real: 'This audio was real. It was created by a well-known public figure.',
                    fake: 'This audio is fake. It was generated using deepfake technology.'
                },
                2: {
                    real: 'This audio was real. It was a live recording from a speech.',
                    fake: 'This audio is fake. It was generated using deepfake technology.'
                }
            };

            const explanationElement = document.getElementById(`explanation-${audioNumber}`);
            explanationElement.textContent = explanations[audioNumber][guess];

            // Show next button after guessing
            const nextButton = document.getElementById(`next-${audioNumber}`);
            nextButton.style.display = 'block';
        }

        function nextSection(audioNumber) {
            // Hide the current section
            document.getElementById(`section-${audioNumber}`).classList.remove('active');
            
            // Show the next section or redirect to another page
            if (audioNumber === 1) {
                document.getElementById('section-2').classList.add('active');
            } else if (audioNumber === 2) {
                // Redirect to phishing-detection.html after the second section
                window.location.href = 'phishing-tutorial.html';
            }
        }