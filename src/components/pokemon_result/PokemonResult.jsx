import React from 'react';
import './PokemonResult.css';
import pokeballBackground from '../../assets/imgs/Pokeball_icon_water_v2.png';
import pokemonPattern from '../../assets/imgs/pokemon_pattern_v2.png';
import missingIMG from '../../assets/imgs/missingPokemonIMG.png';
import { Link, useLocation } from 'react-router-dom';
function PokemonResult(props) {
    const location = useLocation();
    function capitalize(word) {
        let firstLetter = word.charAt(0);
        firstLetter = firstLetter.toUpperCase();
        let sub = word.substring(1);
        return firstLetter + sub;
    }
    function getType(types) {
        if (types.length == 1)
            return types[0].type.name;
        else if (types[0].type.name == 'normal')
            return types[1].type.name;
        else
            return types[0].type.name;
    }
    return (
        <div className="pokemon-cell">
            <div className="pokemon-cell-wrapper" type={getType(props.pokemon.types)}
                style={{
                    backgroundImage: `url(${pokemonPattern})`,
                    backgroundRepeat: 'round',
                    backgroundSize:'contain'
                }}>
                <div className='pokemon-row-imgs' type={getType(props.pokemon.types)} style={{
                    backgroundImage: `url(${pokeballBackground})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}>
                    {props.pokemon.sprites.front_default?
                        props.pokemon.sprites.front_female ?
                        <img src={props.pokemon.sprites.front_default} alt={capitalize(props.pokemon.name)} className="just-self-right" /> :
                        <img src={props.pokemon.sprites.front_default} alt={capitalize(props.pokemon.name)} className="just-self-center grid-col-span-2" />:
                        <img src={missingIMG} alt={capitalize(props.pokemon.name)} className="just-self-center grid-col-span-2" />}
                    {props.pokemon.sprites.front_female ? <img src={props.pokemon.sprites.front_female} className='just-self-left' /> : ''}
                </div>
            </div>
            <div className="pokemon-info">
                <div className="pokemon-main-stats txt-color">
                    <div>
                        <span><strong>{props.pokemon.base_experience}</strong>{' EXP'}</span>
                        <span>Experience</span>
                    </div>
                    <div>
                        <span><strong>{props.pokemon.stats[0].base_stat}</strong>{' HP'}</span>
                        <span>Health Points</span>
                    </div>
                </div>
                {props.pokemon.stats.length > 0 ? (
                    <div className='pokemon-stats txt-center txt-color'>
                        {props.pokemon.stats.map((item, index) => {

                            if (index == 0) return '';
                            return (<div key={index}>
                                <span><strong>{item.base_stat}</strong></span>
                                <span>{capitalize(item.stat.name)}</span>
                            </div>);
                        })}
                    </div>
                ) : ''}
                <div className="pokemon-types">
                    {props.pokemon.types.length > 0 ?
                        props.pokemon.types.map((elem, index) =>
                            <span key={index} type={elem.type.name}>
                                {capitalize(elem.type.name)}
                            </span>)
                        : ''}
                </div>
                <div className="pokemon-more">
                    <Link className="btn-pokemon" 
                    to='/Pokedex/PokemonSelected' state={props.pokemon}
                    type={getType(props.pokemon.types)}>See more...</Link>
                </div>
            </div>

            <div className="pokemon-row-text">
                <span>{capitalize(props.pokemon.name)}</span>
                <span>{"N°: " + props.pokemon.id}</span>
            </div>
        </div>
    )
}

export default PokemonResult