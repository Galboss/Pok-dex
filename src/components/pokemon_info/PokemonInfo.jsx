import React, { useEffect, useState, useMemo } from 'react';
import './PokemonInfo.css';
import cardBackground from '../../assets/imgs/big_card_background_v2.png';
import missingPokemon from '../../assets/imgs/missingPokemonIMG.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function PokemonInfo(props) {
  const [pokemonSpecies, setPokemonSpecies] = useState();
  const [pokemonMovements, setPokemonMovements] = useState();
  const [pokemonAbilities, setPokemonAbilities] = useState();
  const [loading, setLoading] = useState(0);
  const abilities = useMemo(() => {
    if (pokemonAbilities)
      return getAbilities();
  }, [pokemonAbilities]);
  const movements = useMemo(() => {
    if (pokemonMovements)
      return getMovements();
  }, [pokemonMovements])
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
      setLoading(prev => prev + 1);
    }).catch(err => {
      console.log('Request Abort!', err);
    })
  }
  function getMovementsInfo(pokemon, controller) {
    Promise.all(pokemon.moves.map(elem => fetch(elem.move.url, {
      method: 'GET', signal: controller.signal
      , headers: { 'Content-Type': 'application/json; charset=utf-8' }
    }).then(r => r.json()))).then(data => {
      setPokemonMovements(data);
      setLoading(prev => prev + 1);
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
      if (data)
        setPokemonAbilities(data);
      setLoading(prev => prev + 1);
    }).catch(err => {
      console.log('Request Abort!', err);
    })
  }
  function getDescription() {
    let data = pokemonSpecies.flavor_text_entries.find(item => item.language.name == 'en');
    let text;
    if (data) {
      text = data.flavor_text
      text = text.replace(/[\n\f]/g, ' ');
    }
    return (
      <>
        {text ? <p>{text}</p> : ''}
      </>
    );
  }
  function getAbilities() {
    let items = [];
    pokemonAbilities.map(ability => {
      let text = ability.flavor_text_entries.find(elem => elem.language.name == 'en');
      if (text)
        text = text.flavor_text.replace(/[\n\f]/g, ' ');
      let effect = ability.effect_entries.find(elem => elem.language.name == 'en');
      if (effect)
        effect = effect.effect;
      items.push(
        <div key={`${ability.name}`} className="ability">
          <h3>{capitalize(ability.name)}</h3>
          {text ? <>
            <h4>Description:</h4>
            <p>{text}</p>
          </>
            : ''}
          {effect ? <>
            <h4>Effect:</h4>
            <p>{effect}</p>
          </> : ''}

        </div>
      )
    })
    return (
      <>
        <h2>Abilities</h2>
        <div id='Abilities'>
          {items.map(i => i)}
        </div>
      </>
    )
  }
  function getMovements() {
    let items = pokemonMovements.map((elem, index) => {
      let description = elem.flavor_text_entries.find(txt => txt.language.name == 'en')
      if (description)
        description = description.flavor_text.replace(/[\n\f]/g, ' ');
      let effect = elem.effect_entries.find(obj => obj.language.name == 'en');
      if (effect) {
        effect = effect.effect.replace(/[\n\f]/g, ' ');
        if (effect.includes('$effect_chance%'))
          effect = effect.replace('$effect_chance%', elem.effect_chance);
      }


      return (
        <div className="movement" key={`${elem.name}-${index}`}>
          <h3 className='txt-center'>{capitalize(elem.name)}</h3>
          <div className="movement-stats">
            {elem.power ?
              <div>
                <p className='txt-center'>{elem.power}</p>
                <p className='txt-center'>Power</p>
              </div>
              : ''}
            {elem.accuracy ?
              <div>
                <p className='txt-center'>{elem.accuracy}</p>
                <p className='txt-center'>Accuracy</p>
              </div>
              : ''}
            <div>
              <p className='txt-center'>{elem.pp}</p>
              <p className='txt-center'>PP</p>
            </div>
            <div className='txt-center type-container' type={elem.type.name}>
              <p className='txt-center'>
                {capitalize(elem.type.name)}
              </p>
            </div>
          </div>
          {description ?
            <div className="movement-description">
              <h3>Description:</h3>
              <p>{description}</p>
              <h3>Effect:</h3>
              <p>{effect}</p>
            </div>
            : ''}
        </div>
      );
    })
    return (
      <div id="Movements">
        <h2>Movements</h2>
        <div id="Movements-container">
          {items.map(el => el)}
        </div>
      </div>
    )
  }
  function mainComponent() {
    return (
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
                : props.pokemon.sprites.front_default ?
                  <div className='image-container' type={getType(props.pokemon.types)}>
                    <img src={props.pokemon.sprites.front_default} alt={props.pokemon.name} />
                  </div> :
                  <div className='image-container' type={getType(props.pokemon.types)}>
                    <img src={missingPokemon} alt={props.pokemon.name} />
                  </div>
              }
            </div>
          </div>
        </article>
        <article id='Pokemon-information'>
          <div>
            <h2 className='txt-center txt-color'>{capitalize(props.pokemon.name)}</h2>
          </div>
          <div className='max-w-content-90 m-h-auto txt-color'>
            <h2>Description</h2>
            {pokemonSpecies ? getDescription() : ''}
          </div>
          <div className="max-w-content-90 m-h-auto" id='Types'>
            {props.pokemon.types.map((elem, index) =>
              <div type={elem.type.name} className='txt-center'
                key={`${elem.type.name}-${index}`}>{capitalize(elem.type.name)}</div>
            )}
          </div>
          <div className='table-header max-w-content-90 m-h-auto'>
            <p className='txt-center'>{`${capitalize(props.pokemon.name)} stats`}</p>
          </div>
          <div className="main-stats max-w-content-90 m-h-auto txt-color">
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
          <div className='max-w-content-90 m-h-auto txt-color'>
            {pokemonAbilities ? abilities : ''}
          </div>
          <div className='max-w-content-90 m-h-auto txt-color'>
            {pokemonMovements ? movements : ''}
          </div>
        </article>
      </section>
    );
  }

  const loadingComponent = useMemo(() => {
    return (
      <section className="max-w-content-90 m-h-auto p-2 jc-space-around h-gap-1">
        <article className='component'>
          <div className="progress-bar-container ">
            <div className="progress-bar" style={{ width: `${(loading / 3 * 100)}%` }}></div>
            <h3 className='txt-center txt-color'>
              Now Loading <FontAwesomeIcon icon={faSpinner} className="fa-pulse" />
            </h3>
          </div>
        </article>
      </section>
    )
  }, [loading])

  useEffect(() => {
    const abort = new AbortController();
    getDescriptionInfo(props.pokemon, abort);
    getMovementsInfo(props.pokemon, abort);
    getAbilitiesInfo(props.pokemon, abort);
    return () => {
      abort.abort();
    }
  }, []);
  return (
    <main>
      {loading == 3 ? mainComponent() : loadingComponent}
    </main>
  );
}

export default PokemonInfo