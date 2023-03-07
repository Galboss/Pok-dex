import React, { useEffect } from 'react';
import Filter from '../filter/Filter';
import Paginator from '../paginator/Paginator';
import PokemonResult from '../pokemon_result/PokemonResult';
import usePokemonContext from '../../hooks/pokemon_context/usePokemonContext';
import './Pokemons.css';


function Pokemons() {
    const {
        pokemons, pokemonsData, fetchPokemons,
        isFiltering, currentPage, progress, setProgress,
        pokemonCount, setPokemonCount, findPokemon,
        setPokemonsData, fetchPokemonsWithOffset, 
    } = usePokemonContext();

    useEffect(() => {
        const abort = new AbortController();
        fetchPokemons(abort);
        return () => {
            abort.abort();
        }
    }, []);

    useEffect(()=>{
        const abort= new AbortController();
        if(!isFiltering){
            getPokemonsData(abort);
            setPokemonCount(pokemons.count);
        }
        return ()=>{
            abort.abort();
        }
    },[pokemons])

    useEffect(()=>{
        const abort = new AbortController();
        if(!isFiltering&&Object.keys(pokemons).length>0){
            getPokemonsData(abort);
            setPokemonCount(pokemons.count);
        }
        return()=>{
           abort.abort();
        }
    },[isFiltering])

    useEffect(()=>{
        const abort = new AbortController();
        if(!isFiltering){
            fetchPokemonsWithOffset(((currentPage-1)*40),abort)
        }
        return()=>{
            abort.abort();
        }
    },[currentPage])

    function getPokemonsData(controller) {
        if (Object.keys(pokemons).length == 0) return;
        let resolvedCount = 0;
        let rejectedCount = 0;
        Promise.all(pokemons.results.map(pokemon => findPokemon(pokemon.url, controller).then(r => {
            resolvedCount++;
            setProgress((resolvedCount + rejectedCount) / pokemons.results.length * 100);
            return r.json();
        })
        )).then(data=>setPokemonsData([...data]))
        .catch(err=>{
            rejectedCount++;
            setProgress((resolvedCount+rejectedCount)/pokemons.results.length*100);
            console.log('Request Aborted!',err);
        })
    }

    return (
        <main>
            <section className="max-w-90 m-h-auto p-1 jc-space-around h-gap-1" id="MainCard">
                <article className="column-container f-grow-4">
                    <h1>Welcome to this PokéDex!</h1>
                    <p>
                        Here you will find all the information about Pokémons.
                    </p>
                    <hr />
                    <Filter />
                </article>
                <article id="Pokemons-article">
                {pokemonsData.length > 0 ?
                    <div id='Result-container'>
                        {isFiltering ? pokemonsData.map((pokemon, index) => {
                            if (index >= ((currentPage - 1) * 40) && index < (currentPage * 40))
                                return <PokemonResult pokemon={pokemon} key={index} />
                        }) : pokemonsData.map((pokemon, index) => <PokemonResult pokemon={pokemon} key={index} />)}
                    </div>
                    : ''}
                </article>
                
                {progress < 100 ?
                    <>
                        <article className="progress-bar-container">
                            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                        </article>
                        <h3 className='txt-center txt-color'>Loading...</h3>
                    </> : ''}
                {pokemons.count > 0 ?
                    <Paginator  /> :
                    <h2 className='txt-color'>There is no data to show :(</h2>}
            </section>
        </main>
    )
}

export default Pokemons