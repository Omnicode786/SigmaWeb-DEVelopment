let body = document.querySelector(".container");


async function Pokemons() {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=850');
    console.log(response)
    let pokemons = await response.json();
    console.log(pokemons)
addPokemon(pokemons.results)

}

let clutter = [];
async function addPokemon(pokemons){
// pokemons.forEach(pokemon => {
//     let name = pokemon.name;
//     let others = await fetch(pokemon.url); 
    
// for each loop me await ni chlta he

// });

for (let pokemon of pokemons) {
    let pokemonname = pokemon.name;
    let other = await fetch(pokemon.url);
    let urldata = await other.json();
    let image = urldata.sprites.other["official-artwork"].front_default
    let type =  urldata.types.map(t => t.type.name).join(", ")

console.log(pokemonname, " ", image, " ", type);
clutter = `<div class="pokemon-card">
    <img src="${image}" alt="Pokemon Name" class="pokemon-img">
    <h2 class="pokemon-name">${pokemonname}</h2>
    <p class="pokemon-type">${type}</p>
</div>`
body.insertAdjacentHTML("beforeend", clutter);

}
}

Pokemons();