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
            pokemonDiv.innerHTML = `
                <h3>${data.name.toUpperCase()}</h3>
                <img src="${data.sprites.front_default}">
                <p>Type: ${data.types[0].type.name}</p>
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