document.addEventListener('DOMContentLoaded', function() {
    // Login button functionality
    document.querySelector('.login-button').addEventListener('click', function() {
        alert('Login functionality coming soon!');
    });

    // Navigation buttons functionality
    const navButtons = document.querySelectorAll('.nav button');
    const contentContainer = document.querySelector('.content-container');

    navButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            const buttonText = event.target.textContent.trim();
            contentContainer.innerHTML = '';

            if (buttonText === 'Report Card') {
                let userInput = prompt('Enter a number:');
                userInput = parseInt(userInput);

                const textHolder = document.createElement('div');
                textHolder.className = 'text-holder';

                if (userInput > 50) {
                    textHolder.innerHTML = '<h2>High Score</h2><p>Your score is greater than 50!</p>';
                    const img = document.createElement('img');
                    img.src = 'win.jpg';
                    textHolder.appendChild(img);
                } else {
                    textHolder.innerHTML = '<h2>Low Score</h2><p>Your score is 50 or less.</p>';
                    const img = document.createElement('img');
                    img.src = 'lose.jpg';
                    textHolder.appendChild(img);
                }

                contentContainer.appendChild(textHolder);
            } else if (buttonText === 'Help/Contact') {
                const textHolder = document.createElement('div');
                textHolder.className = 'text-holder';
                textHolder.innerHTML = '<h2>Help/Contact</h2><p>Contact us at  <b>vaibhavsahay010101@gmail.com || p.no-9430344966</b></p>';
                contentContainer.appendChild(textHolder);
            } else if (buttonText === 'Feedback') {
                const textHolder = document.createElement('div');
                textHolder.className = 'text-holder';
                textHolder.innerHTML = `
                    <h2>Feedback</h2>
                    <form>
                        <label for="feedback">Leave your feedback:</label>
                        <textarea id="feedback" name="feedback"></textarea>
                        <button type="submit">Submit</button>
                    </form>
                `;
                contentContainer.appendChild(textHolder);
            } else if (buttonText === 'Description') {
                const textHolder = document.createElement('div');
                textHolder.className = 'text-holder';
                textHolder.innerHTML = `
                    <h2>Description</h2>
                    <p>Welcome to Calorie Tracker, your ultimate fitness companion! Our website is designed to help you track your daily calorie intake, monitor your progress, and achieve your fitness goals. With our easy-to-use interface and comprehensive database of foods, you'll be able to make informed decisions about your diet and lifestyle.</p>
                    <p>Whether you're looking to lose weight, gain muscle, or simply maintain a healthy lifestyle, our calorie tracker has got you covered. Our website is packed with features such as a food diary, workout tracker, and progress charts, all designed to help you stay on top of your fitness journey. So why wait? Sign up today and start tracking your way to a healthier, happier you!</p>
                    <p><b>CLICK THE START BUTTON AND YOU WILL GET YOUR SCORES THERE, YOU WILL HAVE ALL THE INFORMATION THERE , YOU WILL TRACK YOUR CALORIES , PROTEIN INTAKE AND EVEM CHEAT MEALS. RETURN TO PUT YOUR VALUE IN THE REPORT CARD TO SEE HOW YOU DID TODAY</b></p>
                `;
                contentContainer.appendChild(textHolder);
            }

            // Set the content container to take up half the page width
            contentContainer.style.width = '50%';
        });
    });

    // Search bar functionality
    document.querySelector('.search input[type="search"]').addEventListener('input', function(event) {
        const query = event.target.value.toLowerCase();
        console.log('Searching for:', query);
        searchCalories(query);
    });

    // Start button functionality
    document.querySelector('.full-width-button').addEventListener('click', function() {
        window.location.href = 'calorie_calculator.html';
    });

    // Slideshow functionality
    function startSlideshow(slideshowId, captions) {
        const slides = document.querySelectorAll(`#${slideshowId} .slide`);
        const captionElement = document.querySelector(`#${slideshowId} .caption`);
        let currentIndex = 0;

        function showNextSlide() {
            slides[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].style.display = 'block';
            captionElement.textContent = captions[currentIndex];
        }

        setInterval(showNextSlide, 3000); // Change slide every 3 seconds
    }

    startSlideshow('slideshow1', [
        'Earth could definitely use a new vamp',
        'like this one?',
        'or perhaps even a hybrid'
    ]);
    startSlideshow('slideshow2', [
        'But this one eats healthy',
        'sometimes a vampire needs a break as well',
        'but always ready to get back on track'
    ]);
    startSlideshow('slideshow3', [
        'and is just as strong',
        'who\'s a monster',
        'and yet a gentleman/woman'
    ]);
});

// Search functionality for calories
function searchCalories(query) {
    const apiKey = 'your_api_key_here';
    const apiUrl = `https://api.calorieninjas.com/v1/nutrition?query=${query}`;

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'X-Api-Key': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        displayResults(data.items);
    })
    .catch(error => {
        console.error('Error fetching calorie data:', error);
    });
}

function displayResults(items) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (items.length === 0) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
    } else {
        items.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.innerHTML = `<p><b>${item.name}</b>: ${item.calories} calories per 100 grams</p>`;
            resultsDiv.appendChild(resultItem);
        });
    }
}