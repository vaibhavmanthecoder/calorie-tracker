document.addEventListener('DOMContentLoaded', function() {
    // Function to add a new food item input box
    function addFoodItem() {
        const foodInputsDiv = document.getElementById('foodInputs');
        const newFoodInput = document.createElement('div');
        newFoodInput.classList.add('food-input');
        newFoodInput.innerHTML = `
            <input type="text" class="foodItem" placeholder="Enter food item">
            <input type="number" class="foodAmount" placeholder="Enter amount in grams">
            <button class="remove-food">Remove</button>
        `;
        foodInputsDiv.appendChild(newFoodInput);
    }

    // Function to add a new quantitative food item input box
    function addQuantitativeFoodItem() {
        const quantitativeFoodInputsDiv = document.getElementById('quantitativeFoodInputs');
        const newQuantitativeFoodInput = document.createElement('div');
        newQuantitativeFoodInput.classList.add('quantitative-food-input');
        newQuantitativeFoodInput.innerHTML = `
            <input type="text" class="quantFoodItem" placeholder="Enter food name (e.g., pizza)">
            <input type="number" class="quantFoodQuantity" placeholder="Enter quantity (e.g., slices)">
            <input type="text" class="quantFoodSize" placeholder="Enter size (e.g., medium)">
            <button class="remove-quantitative-food">Remove</button>
        `;
        quantitativeFoodInputsDiv.appendChild(newQuantitativeFoodInput);
    }

    // Function to update the image based on cheat meal checkbox
    function updateCheatMealImage() {
        const cheatMealCheckbox = document.getElementById('cheatMealInput');
        const cheatMealImage = document.getElementById('cheatMealImage');

        if (cheatMealCheckbox.checked) {
            cheatMealImage.src = 'mnt/data/cheat-meal-yes.png'; // Image for "Yes"
        } else {
            cheatMealImage.src = 'mnt/data/cheat-meal-no.png'; // Image for "No"
        }
        cheatMealImage.style.display = 'block'; // Ensure the image is visible
    }

    // Event listener for removing food items
    document.addEventListener('click', function(event) {
        if (event.target && event.target.matches('.remove-food')) {
            event.target.parentElement.remove();
        }
        if (event.target && event.target.matches('.remove-quantitative-food')) {
            event.target.parentElement.remove();
        }
    });

    // Add event listeners to the "Add More" buttons
    document.querySelector('#foodInputs button').addEventListener('click', function(event) {
        event.preventDefault();
        addFoodItem();
    });

    document.querySelector('#quantitativeFoodInputs button').addEventListener('click', function(event) {
        event.preventDefault();
        addQuantitativeFoodItem();
    });
    
    // Update image when the cheat meal checkbox is changed
    document.getElementById('cheatMealInput').addEventListener('change', updateCheatMealImage);

    // Function to calculate calories
    function calculateCalories() {
        let totalCaloriesConsumed = 0;
        let totalQuantitativeCalories = 0;

        // Calculate calories from food items
        const foodItems = document.querySelectorAll('.food-input');
        foodItems.forEach(item => {
            const foodAmount = item.querySelector('.foodAmount').value;
            // Placeholder calorie calculation; replace with actual logic
            totalCaloriesConsumed += parseFloat(foodAmount)*2 || 0;
        });

        // Calculate calories from quantitative food items
        const quantitativeFoodItems = document.querySelectorAll('.quantitative-food-input');
        quantitativeFoodItems.forEach(item => {
            const quantity = item.querySelector('.quantFoodQuantity').value;
            // Placeholder calorie calculation; replace with actual logic
            totalQuantitativeCalories += parseFloat(quantity) || 0;
        });

        // Calculate total calories consumed
        const totalCalories = totalCaloriesConsumed + totalQuantitativeCalories;

        // Get other input values
        const height = parseFloat(document.getElementById('heightInput').value) || 0;
        const weight = parseFloat(document.getElementById('weightInput').value) || 0;
        const age = parseFloat(document.getElementById('ageInput').value) || 0;
        const proteinIntake = parseFloat(document.getElementById('proteinInput').value) || 0;
        const exercises = parseInt(document.getElementById('exercisesInput').value) || 0;
        const sets = parseInt(document.getElementById('setsInput').value) || 0;
        const cheatMeal = document.getElementById('cheatMealInput').checked;

        // Example calculation for BMR (Basal Metabolic Rate) - Adjust formula as needed
        const bmr = 10 * weight + 6.25 * height - 5 * age + 5;

        // Calculate total calories burned from exercise
        const caloriesBurnedFromExercise = exercises * sets * 10; // Adjust multiplier based on actual exercise data

        // Total calories burned (BMR + Exercise)
        const totalCaloriesBurned = bmr + caloriesBurnedFromExercise;

        // Determine if protein intake is on point
        const proteinRequirement = 1.5 * weight;
        let proteinMessage = '';
        if (proteinIntake >= proteinRequirement) {
            proteinMessage = 'Your protein intake has been on point.';
        } else {
            const additionalProteinRequired = proteinRequirement - proteinIntake;
            proteinMessage = `You need to consume at least ${additionalProteinRequired.toFixed(2)} grams more protein.`;
        }

        // Calculate calorie deficit or surplus
        const calorieDifference = totalCalories - totalCaloriesBurned;
        let calorieMessage = '';
        if (calorieDifference < 0) {
            calorieMessage = `You have a calorie deficit of ${Math.abs(calorieDifference).toFixed(2)} calories.`;
        } else {
            calorieMessage = `You have a calorie surplus of ${calorieDifference.toFixed(2)} calories.`;
        }

        // Update the result section
        const resultText = `
            Total Calories Consumed: ${totalCalories.toFixed(2)}<br>
            Total Calories Burned (including exercise): ${totalCaloriesBurned.toFixed(2)}<br>
            ${proteinMessage}<br>
            ${calorieMessage}
        `;
        document.getElementById('calorieResult').innerHTML = resultText;
    }

    // Add event listener to the Calculate button
    document.querySelector('.calculate-button button').addEventListener('click', calculateCalories);
});
