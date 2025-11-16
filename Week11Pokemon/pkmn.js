const input = document.getElementById('pokeInput');
const searchBtn = document.getElementById('searchBtn');
const message = document.getElementById('message');
const pokemonDiv = document.getElementById('pokemon');
const clearBtn = document.getElementById('clearBtn');

searchBtn.addEventListener('click', () => getPokemon());
clearBtn.addEventListener('click', clearHistory);


const lastSearch = localStorage.getItem('lastPokemon');
if (lastSearch) {
    getPokemon(lastSearch);
    input.value = lastSearch;
}

const weaknesses = {
    fire: ['water', 'ground', 'rock'],
    water: ['electric', 'grass'],
    grass: ['fire', 'ice', 'poison', 'flying', 'bug'],
    electric: ['ground'],
    normal: ['fighting'],
    fighting: ['flying', 'psychic', 'fairy'],
    flying: ['electric', 'ice', 'rock'],
    poison: ['ground', 'psychic'],
    ground: ['water', 'grass', 'ice'],
    rock: ['water', 'grass', 'fighting', 'ground', 'steel'],
    bug: ['fire', 'flying', 'rock'],
    ghost: ['ghost', 'dark'],
    steel: ['fire', 'fighting', 'ground'],
    psychic: ['bug', 'ghost', 'dark'],
    ice: ['fire', 'fighting', 'rock', 'steel'],
    dragon: ['ice', 'dragon', 'fairy'],
    dark: ['fighting', 'bug', 'fairy'],
    fairy: ['poison', 'steel']

};

function getPokemon(savedName) {
    const name = savedName || input.value.toLowerCase().trim();
    if (!name) return;

    message.textContent = 'Loading...';
    pokemonDiv.innerHTML = '';

    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`) 
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon not found');
            }
            return response.json();
        })
        .then(data => {
            message.textContent = '';


            const mainType = data.types[0].type.name;
            const weakTo = weaknesses[mainType] || [];


            pokemonDiv.innerHTML = `
                <h3>${data.name.toUpperCase()}</h3>
                <img src="${data.sprites.front_default}">
                <p>Type: ${data.types[0].type.name}</p>
                <p><strong>Weak to:</strong> ${weakTo.join(', ') || 'None'}</p>
                `;

            localStorage.setItem('lastPokemon', name);
        }   )
        .catch(error => {
            message.textContent = error.message;
        });
}

function clearHistory() {
    localStorage.removeItem('lastPokemon');
    pokemonDiv.innerHTML = '';
    message.textContent = 'Search history cleared.';
}   