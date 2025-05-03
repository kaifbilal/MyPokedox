document.getElementById('searchBtn').addEventListener('click', searchPokemon);
document.getElementById('search').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') searchPokemon();
});

function searchPokemon() {
    const query = document.getElementById('search').value.trim().toLowerCase();
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    if (!query) return;

    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
        .then(res => {
            if (!res.ok) throw new Error('Not found');
            return res.json();
        })
        .then(data => {
            displayPokemonCard(data);
        })
        .catch(() => {
            resultsContainer.innerHTML = `<p style="color:#c00;">No Pokémon found for "${query}".</p>`;
        });
}

function displayPokemonCard(data) {
    const types = data.types.map(t => `<span class="pokemon-type">${capitalize(t.type.name)}</span>`).join('');
    const abilities = data.abilities.map(a => capitalize(a.ability.name)).join(', ');
    const card = `
        <div class="pokemon-card">
            <img class="pokemon-img" src="${data.sprites.other['official-artwork'].front_default}" alt="${data.name}">
            <div class="pokemon-name">${capitalize(data.name)}</div>
            <div class="pokemon-number">#${data.id}</div>
            <div class="pokemon-types">${types}</div>
            <div class="pokemon-info">
                <strong>Height:</strong> ${data.height / 10} m<br>
                <strong>Weight:</strong> ${data.weight / 10} kg
            </div>
            <div class="pokemon-abilities"><strong>Abilities:</strong> ${abilities}</div>
        </div>
    `;
    document.getElementById('results').innerHTML = card;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}