import React, { useEffect, useState } from 'react';

function useFind() {
    const API_URL = 'https://pokeapi.co/api/v2/'
    const [pokemons, setPokemons] = useState({});
    function fetchPokemons(controller) {
        fetch(`${API_URL}pokemon?limit=40&offset=0`, {
            method: 'GET', signal: controller.signal, headers: {
                'Content-Type': 'application-json; charset= utf-8'
            }
        })
            .then(result => result.json()).then(data => { setPokemons(data) })
            .catch(error => {
                console.log('Request Aborted', error);
            });

    }
    function fetchPokemonsWithOffset(offset, controller) {
        fetch(`${API_URL}pokemon?limit=40&offset=${offset}`, {
            method: 'GET', signal: controller.signal, headers: {
                'Content-Type': 'application-json; charset= utf-8'
            }
        })
            .then(result => result.json()).then(data => { setPokemons(prev => data) })
            .catch(error => {
                console.log('Request Aborted', error);
            });
    }
    function findPokemon(url, controller) {
        return fetch(url, {
            method: 'GET', signal: controller.signal, headers: {
                'Content-Type': 'application-json; charset= utf-8'
            }
        })
    }
    function findPokemonByName(name, controller) {
        return fetch(`${API_URL}pokemon/${name}`, {
            method: 'GET', signal: controller.signal, headers: {
                'Content-Type': 'application-json; charset= utf-8'
            }
        })
    }
    async function getAllPokemons(controller) {
        let pokemons;
        await fetch(`${API_URL}pokemon?limit=100000&offset=0`, {
            method: 'GET', signal: controller.signal, headers: {
                'Content-Type': 'application-json; charset= utf-8'
            }
        })
            .then(result => result.json()).then(data => { pokemons = data })
            .catch(error => {
                console.log('Request Aborted', error);
            });
        return pokemons;
    }

    function getPokemonsByType(type, controller) {
        return fetch(`${API_URL}type/${type}`, {
            method: 'GET', signal: controller.signal, headers: {
                'Content-Type': 'application-json; charset= utf-8'
            }
        });
    }
    return (
        {
            pokemons, fetchPokemons, fetchPokemonsWithOffset,
            findPokemon, findPokemonByName, getAllPokemons,
            getPokemonsByType
        }
    )
}

export default useFind;