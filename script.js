// const apiKey"?apiKey=eb5b6d995bec41aabcdb4fc246a6209f";
const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";
const APP_ID = "7e527906";
const APP_KEY = "b4dfb9ec2678b7b0eb31c0d9235b1092";

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=20`;
  const response = await fetch(baseURL);
  const data = await response.json(); // convertir el resultado en un json
  generateHTML(data.hits);
  console.log(data);
}

function generateHTML(results) {
  container.classList.remove("initial");
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `
    <div class="item">
      <img src="${result.recipe.image}" alt="${result.recipe.label}" />
      <div class="flex-container">
        <h1 class="title">${result.recipe.label}</h1>
        <a class="view-button" href="${
          result.recipe.url
        }" target="_blank">View Recipe</a>
      </div>
      <p class="item-data">Calories: ${result.recipe.calories.toFixed(
        2
      )}</p>     
      <p class="item-data">Diet label: ${
        result.recipe.dietLabels.length > 0
          ? result.recipe.dietLabels
          : "No Data Found"
      }</p>            
      <p class="item-data">Health label: ${
        result.recipe.healthLabels
      }</p>              
    </div> 
    `;
  });
  searchResultDiv.innerHTML = generatedHTML;
}
