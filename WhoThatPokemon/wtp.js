const pokemonImage = document.getElementById('pokemonImage');
const pokemonName = document.getElementById('pokemonName');
const newBtn = document.getElementById('newBtn');
const revealBtn = document.getElementById('revealBtn');
const message = document.getElementById('message');

let currentPokemon = '';

newBtn.addEventListener('click', getRandomPokemon);
revealBtn.addEventListener('click', revealPokemon);

function getRandomPokemon() {
  const randomId = Math.floor(Math.random() * 898) + 1;

  message.textContent = 'Loading...';
  pokemonName.textContent = '???';
  revealBtn.disabled = true;

  fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
    .then(res => res.json())
    .then(data => {
      currentPokemon = data.name.toUpperCase();
      pokemonImage.src = data.sprites.front_default;
      pokemonImage.style.filter = 'brightness(0)';
      revealBtn.disabled = false;
      message.textContent = 'Guess the Pokemon';
    });
}

function revealPokemon() {
  pokemonImage.style.filter = 'brightness(1)';
  pokemonName.textContent = currentPokemon;
  message.textContent = 'Nice!';
}
