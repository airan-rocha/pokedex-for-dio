
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    console.log(pokeDetail);
    
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    let statsValueTotal = 0;
    pokemon.stats = pokeDetail.stats.map((value) => {
        statsValueTotal += value.base_stat;
        return {
            name: value.stat.name,
            value: value.base_stat
        }
    });

    pokemon.stats.push({name: "total", value: statsValueTotal});

    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;
    pokemon.abilities = pokeDetail.abilities.map((value) => value.ability.name);

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results) //o segundo then fará o tratamento do retorno do primeiro e assim por diante
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemonWithUrl = (url) => {
    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}