document.addEventListener('DOMContentLoaded', () => {
    resetSorting(); // Ensure the quiz is in its initial state when the page loads

    // Add event listeners to choice buttons
    const buttons = document.querySelectorAll('#choiceButtons button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Hide choice buttons after selection
            document.getElementById("choiceButtons").style.display = 'none';
            // Sort the house based on the choice
            sortHouse(button.textContent.split(' (')[1].replace(')', ''));
        });
    });
});

function sortHouse(selectedHouse) {
    const houses = {
        Gryffindor: 'assets/images/gryffindor.png',
        Ravenclaw: 'assets/images/ravenclaw.png',
        Hufflepuff: 'assets/images/hufflepuff.png',
        Slytherin: 'assets/images/slytherin.png'
    };

    let house = selectedHouse || Object.keys(houses)[Math.floor(Math.random() * Object.keys(houses).length)];

    let resultDiv = document.getElementById("result");
    let houseCrest = document.getElementById("houseCrest");
    let sortingHatSound = document.getElementById("sortingHatSound");
    let houseSound = document.getElementById("houseSound");
    let speechBubble = document.getElementById("speechBubble");
    let loadingMessage = document.getElementById("loadingMessage");

    speechBubble.style.display = 'block';
    loadingMessage.classList.remove('d-none'); // Show loading message
    loadingMessage.textContent = "Hmm, let's see... Which house should you be sorted into?";
    sortingHatSound.src = 'assets/sounds/sorting-hat.mp3';
    sortingHatSound.play().catch(error => {
        console.error('Audio playback failed:', error);
    });

    setTimeout(() => {
        loadingMessage.classList.add('d-none'); // Hide loading message
        speechBubble.classList.add('d-none'); // Hide speech bubble
        houseCrest.src = houses[house];
        houseCrest.style.display = 'block'; // Show house crest
        houseCrest.style.opacity = 0; // Start with invisible crest
        houseCrest.style.transform = 'scale(0.8)'; // Initial smaller scale

        anime({
            targets: houseCrest,
            opacity: 1,
            scale: 1,
            duration: 1000,
            easing: 'easeInOutExpo',
            complete: () => {
                // Display the result after crest animation completes
                resultDiv.innerHTML = `You have been sorted into <strong>${house}</strong>!`;
                resultDiv.style.display = 'block'; // Show result
                houseSound.src = `assets/sounds/${house.toLowerCase()}.mp3`; // Change sound based on house
                houseSound.play().catch(error => {
                    console.error('Audio playback failed:', error);
                });

                // Set timeout to reset state after 5 seconds
                setTimeout(() => {
                    resetSorting();
                }, 5000);
            }
        });
    }, 3000); // Delay before showing house
}

function resetSorting() {
    document.getElementById("result").style.display = 'none';
    document.getElementById("houseCrest").style.display = 'none';
    document.getElementById("choiceButtons").style.display = 'block';
    document.getElementById("speechBubble").style.display = 'none';
    document.getElementById("loadingMessage").classList.add('d-none');
}