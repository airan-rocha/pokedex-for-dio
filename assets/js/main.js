const pokemonList = document.getElementById('pokemonlist');
const loadMoreButton = document.getElementById('loadMore');

const maxRecords = 151;
const limit = 10;
let offset = 0;


function loadPokemonItens(offset, limit){

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
    
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
                <a class="bt-details" href="pokemon-details.html?number=${pokemon.number}&name=${pokemon.name}">Details...</a>
            </li>
        `).join('');

        pokemonList.innerHTML += newHtml;
    })
}

pokemonList.innerHTML = '';
loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;

    const qtRecordsWithNextPage = offset + limit;

    if(qtRecordsWithNextPage >= maxRecords){
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    }else{
        loadPokemonItens(offset, limit);
    }

})