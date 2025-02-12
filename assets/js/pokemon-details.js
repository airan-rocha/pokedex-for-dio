const pokemonDiv = document.getElementById('pokemon');
const myUrl = new URL(document.URL);
const paramNumber = myUrl.searchParams.get('number');

function backPage() {
    history.back();
}

function loadPokemonDetails (pokemon) {
    const newHtml = `
        <div class="cabecalho ${pokemon.type}">
            <button id="bt-back" onclick={backPage()} ><</button>
            <span class="name">${pokemon.name}</span>
            <span class="number">#${pokemon.number}</span>

            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
            </ol>

            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>

        <div class="details">
            <span>About:</span>
            <ul>
                <li>Height: ${pokemon.height/10}m</li>
                <li>Weight: ${pokemon.weight/10}Kg</li>
                <li>Abilities: ${pokemon.abilities.map((ability) => ability).join(", ")}</li>
            </ul>

            <span>Base Stats:</span>
            <ul class="list-stats">
                ${pokemon.stats.map((stat) => `<li class="${stat.name}">${stat.name}: ${stat.value}</li>`).join('')}
            </ul>
        </div>
    `

    pokemonDiv.innerHTML = newHtml; 
}

pokeApi.getPokemonWithUrl(`https://pokeapi.co/api/v2/pokemon/${paramNumber}`).then(loadPokemonDetails)