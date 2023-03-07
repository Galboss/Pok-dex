import { useContext } from 'react'
import { PokemonsContext } from '../../context/pokemon_context/PokemonProvider';


function usePokemonContext() {
  return useContext(PokemonsContext);
}

export default usePokemonContext;