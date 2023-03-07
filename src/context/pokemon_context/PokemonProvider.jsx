import { createContext, useState, useRef } from 'react';
import useFind from '../../hooks/find/useFind';

export const PokemonsContext = createContext();

export function PokemonProvider({children}) {
    const btnSearchFiltersRef = useRef([]);
    const [activeFilters, setActiveFilters] = useState([]);
    const { pokemons, fetchPokemons, fetchPokemonsWithOffset,
        findPokemon, getAllPokemons,
        getPokemonsByType } = useFind();
    const [pokemonsData, setPokemonsData] = useState([]);
    const [progress, setProgress] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFiltering, setIsFiltering] = useState(false);
    const [pokemonCount, setPokemonCount] = useState(0);
    return (
        <PokemonsContext.Provider value={{
            btnSearchFiltersRef, activeFilters, setActiveFilters,
            pokemons, fetchPokemons, fetchPokemonsWithOffset,
            findPokemon, getAllPokemons, getPokemonsByType,
            pokemonsData, setPokemonsData, progress, setProgress,
            currentPage, setCurrentPage, isFiltering, setIsFiltering,
            pokemonCount, setPokemonCount
        }}>
            {children}
        </PokemonsContext.Provider>
    )
}