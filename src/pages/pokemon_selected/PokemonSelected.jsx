import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import PokemonInfo from '../../components/pokemon_info/PokemonInfo';
function PokemonSelected() {
    const location = useLocation();
    const navigate = useNavigate();
    function handleNavigateToHome() {
        navigate('/', { replace: true });
    }
    const pokemon = location.state;
    return (
        <>{
            location.state?
            <PokemonInfo pokemon={pokemon}/>
            :handleNavigateToHome()
        }</>
    )
}

export default PokemonSelected