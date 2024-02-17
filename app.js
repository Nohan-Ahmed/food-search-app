async function fetchData(query = 'm') {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    displayData(data.meals)
  } catch {
    console.error('Error:', Error);
    // Handle the error appropriately, e.g., display an error message to the user
  }


}
const displayModal = async (id) => {
  try {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let data = await res.json()
    data = data.meals[0]
    console.log(data);
    document.querySelector('.modal-title').innerHTML = data.strMeal;
    document.querySelector('.modal-body').innerHTML = data.strInstructions;
    document.querySelector('.mudal-img').src = data.strMealThumb;
  } catch {
    err => {
      console.log(err);
    }
  }

}
const displayData = (meals) => {
  document.getElementById('total-meals').innerHTML = `Total meals: ${meals.length}`
  let foods = document.getElementById('foods')

  meals.forEach(meal => {

    let col = document.createElement('div')
    col.classList.add('col')
    col.innerHTML = `
    
    <div class="card">
      <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${meal?.strMeal.slice(0, 40)}</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 50)}......</p>
        <!-- Button trigger modal -->
        <button type="button" onclick="displayModal(${meal.idMeal})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button>
      </div>
  </div>
  `
    foods.appendChild(col)
  });
}

function main() {
  let search_input = document.getElementById('search-input')
  let search_box = document.getElementById('search-box')
  search_box.addEventListener('click', e => {
    if (!search_input.value) return;
    fetchData(search_input.value)
  });

}
fetchData()
main()

