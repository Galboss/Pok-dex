import React, { useEffect } from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import PokemonInfo from '../../components/pokemon_info/PokemonInfo';
function PokemonSelected() {
    const location = useLocation();
    const navigate = useNavigate();
    function handleNavigateToHome() {
        navigate('/Pokedex/', { replace: true });
    }

    useEffect(()=>{
        if(!location.state)
            handleNavigateToHome();
    },[])
    const pokemon = location.state;
    return (
        <>{
            location.state?
            <PokemonInfo pokemon={pokemon}/>
            :""
        }</>
    )
}

export default PokemonSelected