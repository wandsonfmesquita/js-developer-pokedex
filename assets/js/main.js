const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <a href="#p${pokemon.number}" id="b${pokemon.number}" class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">

            </div>
        </a>
        <div class="p ${pokemon.name}" id="p${pokemon.number}">
            <div class="pokemon ${pokemon.type}">

                <img class="p-image" src="${pokemon.photo}"
                alt="${pokemon.name}">


                <div class="detail2">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>


                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <h3>About</h3>
                    <p><span>Habilidade:</span>${pokemon.ability}</p>
                    <p><span>Peso:</span>${pokemon.weight}</p>
                    <p><span>Altura:</span>${pokemon.height}</p>
                    <a href="#" class= "voltar">VOLTAR</a>
                </div>

            </div>
        </div>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})