const pokeName = document.querySelector('.name');
const pokeNumber = document.querySelector('.number');
const pokeImage = document.querySelector('.pokemon');
const form = document.querySelector('.form');
const input = document.querySelector('.search');
const buttonPrev = document.querySelector('.button__prev');
const buttonNext = document.querySelector('.button__next');
const pokeWeight = document.querySelector('.weight');
const pokeHeight = document.querySelector('.height');
const pokeHP = document.querySelector('.hp');
const pokeAttack = document.querySelector('.attack');
const pokeDefense = document.querySelector('.defense');
const pokeSPAtk = document.querySelector('.spatk');
const pokeSPDef = document.querySelector('.spdef');
const pokeSPeed = document.querySelector('.speed');
const pokemonStatsName = document.querySelectorAll(".itens");
const stats_results = document.querySelectorAll(".stat-result");
const audio__test  = new Audio();

let searchPoke = 1;

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {

    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

    pokeNumber.innerHTML = '';
    pokeName.innerHTML = 'Loading...';

    const data = await fetchPokemon(pokemon);

    if (data){


        pokeType(data);
        pokeImage.style.display = 'block';
        pokeName.innerHTML = data.name;
        pokeNumber.innerHTML = data.id;
        pokeWeight.innerHTML = data.weight;
        pokeHeight.innerHTML = data.height;
        pokeHP.innerHTML = data['stats']['0']['base_stat'];
        pokeAttack.innerHTML = data['stats']['1']['base_stat'];
        pokeDefense.innerHTML = data['stats']['2']['base_stat'];
        pokeSPAtk.innerHTML = data['stats']['3']['base_stat'];
        pokeSPDef.innerHTML = data['stats']['4']['base_stat'];
        pokeSPeed.innerHTML = data['stats']['5']['base_stat'];
        input.value = '';
        searchPoke = data.id; 
        sound(data);
        
        if (data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'] != null){   
            
            pokeImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
             
        } else if (searchPoke > 649 && searchPoke <= 10249 && data['sprites']['other']['official-artwork']['front_default'] != null){

            pokeImage.src = data['sprites']['other']['official-artwork']['front_default'];
            
        } else if (data['sprites']['front_default'] != null){

            pokeImage.src = data['sprites']['front_default'];

        } else {

            pokeImage.src = data['sprites']['versions']['generation-viii']['icons']['front_default']
        }

    } else {

        pokeName.innerHTML = 'Not found';
        pokeNumber.innerHTML = '';
        pokeImage.style.display = 'none';
        input.value = '';
        pokeWeight.innerHTML = '';
        pokeHeight.innerHTML = '';
        pokeHP.innerHTML = '';
        pokeAttack.innerHTML = '';
        pokeDefense.innerHTML = '';
        pokeSPAtk.innerHTML = '';
        pokeSPDef.innerHTML = '';
        pokeSPeed.innerHTML = '';
        type.innerHTML = "";

        if (pokeName.innerHTML = 'Not found')
        {
            searchPoke = 0;
        }

     }
}

function pokeType(data) {
    type.innerHTML = "";
    for (let i of data.types) {
      type.innerHTML = type.innerHTML + i.type.name + " ";
    }

    type.innerHTML = (type.innerHTML).trim();

  }

function sound(data) {
    let audio = new Audio(`../src/${data.name}.wav`);
    const buttons = document.getElementById("audio");

    buttons.addEventListener("click", () => {
        audio.play(); 
        audio = audio__test;        
    });

}


form.addEventListener('submit', (event) => {

    while(input.value.charAt(0) == '0')
    {
        let checking = input.value.toString().substring(1);
        input.value = checking;
    }

    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
})

buttonPrev.addEventListener('click', (event) => {
    if (searchPoke > 1) {
        searchPoke--;
        renderPokemon(searchPoke);
    }
})

buttonNext.addEventListener('click', (event) => {

    searchPoke++;
    renderPokemon(searchPoke);
})

renderPokemon(searchPoke);