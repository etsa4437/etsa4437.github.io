let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const input = document.getElementById("pokeInput");
const button = document.getElementById("searchButton");
const pokemonDiv = document.getElementById("pokemon");
const message = document.getElementById("message");
const favList = document.getElementById("favorites");
const clearButton = document.getElementById("clearButton");

button.addEventListener("click", getPokemon);
clearButton.addEventListener("click", clearFavorites);

async function getPokemon() {
    const name = input.value.toLowerCase().trim();
    if (name === "") return;

    message.textContent = "Loading...";
    pokemonDiv.innerHTML = "";
    
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) throw new Error("Pokemon not found");
        const data = await response.json();

        messsage.textContent = "";