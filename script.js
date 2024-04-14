document.addEventListener('DOMContentLoaded', () => {
    fetchRandomMeal();
  
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.trim();
      if (searchTerm !== '') {
        searchMealCategory(searchTerm);
      } else {
        hideSearchResults();
      }
    });
  });
  
  function fetchRandomMeal() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then(response => response.json())
      .then(data => {
        const meal = data.meals[0];
        displayMeal(meal);
      })
      .catch(error => console.error('Error fetching random meal:', error));
  }
  
  function searchMealCategory(category) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then(response => response.json())
      .then(data => {
        const meals = data.meals;
        displaySearchResults(meals);
      })
      .catch(error => console.error('Error searching meal category:', error));
  }
  
  function displayMeal(meal) {
    const mealContainer = document.getElementById('meal-container');
    const mealName = document.getElementById('meal-name');
  
    mealContainer.querySelector('img').src = meal.strMealThumb;
    mealName.textContent = meal.strMeal;
  }
  
  function displaySearchResults(meals) {
    const searchTitle = document.getElementById('search-title');
    const mealList = document.getElementById('meal-list');
  
    searchTitle.textContent = 'Search Results';
    mealList.innerHTML = '';
  
    meals.forEach(meal => {
      const mealItem = document.createElement('div');
      mealItem.classList.add('meal-item');
      mealItem.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p>${meal.strMeal}</p>
      `;
      mealList.appendChild(mealItem);
    });
  }
  
  function hideSearchResults() {
    const searchTitle = document.getElementById('search-title');
    const mealList = document.getElementById('meal-list');
  
    searchTitle.textContent = '';
    mealList.innerHTML = '';
  }
  