import React, { } from 'react';
import Pokemons from '../../components/pokemons/Pokemons';
import { PokemonProvider } from '../../context/pokemon_context/PokemonProvider';
import './Home.css'





function Home() {

    return (
        <PokemonProvider>
            <Pokemons/>
        </PokemonProvider>
    )
}

export default Home;