import React, { useEffect, useState } from 'react';
import './PokemonInfo.css';
import cardBackground from '../../assets/imgs/big_card_background.png';
function PokemonInfo(props) {
  const [pokemonSpecies, setPokemonSpecies] = useState();
  const [pokemonMovements, setPokemonMovements] = useState();
  const [pokemonAbilities, setPokemonAbilities] = useState();
  function getType(types) {
    if (types.length == 1)
      return types[0].type.name;
    else if (types[0].type.name == 'normal')
      return types[1].type.name;
    else
      return types[0].type.name;
  }
  function capitalize(word) {
    let firstLetter = word.charAt(0);
    firstLetter = firstLetter.toUpperCase();
    let sub = word.substring(1);
    return firstLetter + sub;
  }
  function getStats(stats) {
    const item = [];
    for (let i = 1; i < stats.length; i++) {
      item.push(
        <div key={`stats-${i}`}>
          <p className='txt-center txt-color'>{`${stats[i].base_stat}`}</p>
          <p className='txt-center txt-color'>{`${capitalize(stats[i].stat.name)}`}</p>
        </div>
      )
    }
    return (
      <>
        {item.map(el => el)}
      </>
    )
  }
  function getDescriptionInfo(pokemon, controller) {
    fetch(pokemon.species.url, {
      method: 'GET', signal: controller.signal,
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    }).then(r => r.json()).then(data => {
      setPokemonSpecies(data);
    }).catch(err => {
      console.log('Request Abort!', err);
    })
  }
  function getMovements(pokemon, controller) {
    Promise.all(pokemon.moves.map(elem => fetch(elem.move.url, {
      method: 'GET', signal: controller.signal
      , headers: { 'Content-Type': 'application/json; charset=utf-8' }
    }).then(r => r.json()))).then(data => {
      setPokemonMovements(data);
    }).catch(err => {
      console.log("Request Aborted!", err);
    });
  }
  function getAbilitiesInfo(pokemon, controller) {
    Promise.all(pokemon.abilities.map(elem => fetch(elem.ability.url, {
      method: 'GET', signal: controller.signal,
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    })
      .then(r => r.json())
    )).then(data => {
      if(data)
        setPokemonAbilities(data);
    }).catch(err => {
      console.log('Request Abort!', err);
    })
  }

  function getDescription() {
    let data = pokemonSpecies.flavor_text_entries.find(item => item.language.name == 'en');
    let text = data.flavor_text
    text = text.replace(/[\n\f]/g, ' ');
    return (
      <p>{text}</p>
    );
  }

  function getAbilities(){
    console.log(pokemonAbilities);
    let items = [];
    pokemonAbilities.map(ability=>{
      let text = ability.flavor_text_entries.find(elem=>elem.language.name=='en');
      text = text.flavor_text.replace(/[\n\f]/g,' ');
      let effect = ability.effect_entries.find(elem=>elem.language.name=='en');
      effect = effect.effect;
      console.log();
      items.push(
        <div key={`${ability.name}`} className="ability">
            <h3>{capitalize(ability.name)}</h3>
            <h4>Description:</h4>
            <p>{text}</p>
            <h4>Effect:</h4>
            <p>{effect}</p>
        </div>
      )
    })
    return(
      <>
        <h2>Abilities</h2>
        <div id='Abilities'>
          {items.map(i=>i)}
        </div>
      </>
    )
  }

  useEffect(() => {
    const abort = new AbortController();
    getDescriptionInfo(props.pokemon, abort);
    getMovements(props.pokemon, abort);
    getAbilitiesInfo(props.pokemon, abort);
    return () => {
      abort.abort();
    }
  }, []);
  return (
    <main>
      <section className='max-w-content-90 m-h-auto p-2 jc-space-around h-gap-1' id='Pokemon-big-card'>
        <article id='Pokemon-card-header'>
          <div className="header-background" type={getType(props.pokemon.types)}>
            <div className="header-background-image" style={{
              backgroundImage: `url(${cardBackground})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'round',
            }}>
              {props.pokemon.sprites.other.dream_world.front_default ?
                <div className="image-container" type={getType(props.pokemon.types)}>
                  <img src={props.pokemon.sprites.other.dream_world.front_default} alt={props.pokemon.name} />
                </div>
                : ''}
            </div>
          </div>
        </article>
        <article id='Pokemon-information'>
          <div>
            <h2 className='txt-center txt-color'>{capitalize(props.pokemon.name)}</h2>
          </div>
          <div className='max-w-content-90 m-h-auto'>
            <h2>Description</h2>
            {pokemonSpecies ? getDescription() : ''}
          </div>
          <div className='table-header max-w-content-90 m-h-auto'>
            <p className='txt-center'>{`${capitalize(props.pokemon.name)} stats`}</p>
          </div>
          <div className="main-stats max-w-content-90 m-h-auto">
            <div>
              <p className='txt-center'>{`${props.pokemon.base_experience} EXP`}</p>
              <p className='txt-center'>Base Experience</p>
            </div>
            <div>
              <p className='txt-center'>{`${props.pokemon.stats[0].base_stat}`}</p>
              <p className='txt-center'>Health Points</p>
            </div>
          </div>
          <div className="stats max-w-content-90 m-h-auto">
            {getStats(props.pokemon.stats)}
          </div>
          <div className='max-w-content-90 m-h-auto'>
              {pokemonAbilities?getAbilities():''}
          </div>
        </article>
      </section>
    </main>
  )
}

export default PokemonInfo