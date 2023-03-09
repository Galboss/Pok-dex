import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch, faDroplet, faFire, faLeaf, faDove,
    faSkullCrossbones, faBug, faMosquito, faChessRook,
    faUserNinja, faSignal, faBolt, faGhost, faDragon, faSnowflake,
    faGem
} from '@fortawesome/free-solid-svg-icons';
import usePokemonContext from '../../hooks/pokemon_context/usePokemonContext';
import './Filter.css';


function Filter() {
    const { setCurrentPage, isFiltering,
        setIsFiltering, activeFilters, setActiveFilters,
        btnSearchFiltersRef, findPokemon, getAllPokemons,
        getPokemonsByType, setPokemonCount,
        setPokemonsData, setProgress
    } = usePokemonContext();
    const [filterList, setFilterList] = useState([]);
    const [isFilteringByType, setIsFilteringByType] = useState(false);
    const [tempData, setTempData] = useState(false);
    const searchPokemonRef = useRef();
    useEffect(() => {
        const abort = new AbortController();
        if (isFiltering)
            if (filterList.length > 0) {
                getPokemonsInfo(abort);
            }
            else {
                setIsFiltering(false);
            }
        return () => {
            abort.abort();
        }
    }, [filterList]);

    useEffect(() => {
        if (isFilteringByType) {
            let filteredByType = filterPokemonsByTypes(tempData);
            setPokemonCount(filteredByType.length);
            setPokemonsData(filteredByType);
            setCurrentPage(1);
        } else
            setPokemonsData(tempData)

    }, [tempData])

    useEffect(() => {
        for (let i = 0; i < 15; i++) {
            btnSearchFiltersRef.current[i].addEventListener('click', handleClickFilterBtns);
        }
        btnSearchFiltersRef.current[15].addEventListener('click', filterPokemonsByName);
        return () => {
            for (let i = 0; i < 14; i++) {
                if (btnSearchFiltersRef.current[i] != null)
                    btnSearchFiltersRef.current[i].removeEventListener('click', handleClickFilterBtns);
            }
            if(btnSearchFiltersRef.current[15]!=null)
                btnSearchFiltersRef.current[15].removeEventListener('click', filterPokemonsByName);
        }
    }, [btnSearchFiltersRef]);

    useEffect(() => {
        const abort = new AbortController();
        if (activeFilters.length < 1) {
            setIsFiltering(false);
            setIsFilteringByType(false);
        } else
            getPokemonsFilteredByType(abort);
        return () => {
            abort.abort();
        }
    }, [activeFilters])

    function toggleActiveElement(element) {
        if (element.classList.contains('active'))
            setActiveFilters(prev => prev.filter(e => e !== element.getAttribute('id')));
        else
            setActiveFilters(prev => [...prev, element.getAttribute('id')]);
        element.classList.toggle('active');
    }
    function handleClickFilterBtns() {
        toggleActiveElement(this);
    }

    async function getPokemonsInfo(controller) {
        if (Object.keys(filterList).length == 0) return;
        //   setPokemonCount(filterList.length);
        let resolvedCount = 0;
        let rejectedCount = 0;
        await Promise.all(filterList.map(pokemon => findPokemon(pokemon.url, controller).then(
            r => {
                resolvedCount++;
                setProgress((resolvedCount + rejectedCount) / filterList.length * 100);
                return r.json();
            })
        )).then(data => {
            setTempData([...data])
        })
            .catch(err => {
                rejectedCount++;
                setProgress((resolvedCount + rejectedCount) / filterList.length * 100);
                console.log('Request Aborted!', err);
            })
    }

    function filterPokemonsByTypes(data) {
        if (activeFilters.length > 0) {
            let seen = new Set();
            let result = data.filter(pokemon => {
                for (const obj of pokemon.types) {
                    if (activeFilters.indexOf(obj.type.name) < 0 && !seen.has(pokemon.id))
                        return false;
                }
                seen.add(pokemon.id);
                return true;
            });
            return result;
        }
    }

    async function filterPokemonsByName() {
        let input = searchPokemonRef.current.value;
        input = input.toLowerCase();
        if (input) {
            setIsFiltering(true);
            let abort = new AbortController();
            let pokemons = await getAllPokemons(abort);
            if (input) {
                let filter = pokemons.results.filter(po => {
                    if (po.name.includes(input)) return po;
                });
                setPokemonCount(filter.length);
                setFilterList(filter);
            }
        } else setFilterList([]);
    }

    function getPokemonsFilteredByType(controller) {
        Promise.all(activeFilters.map(elem =>
            getPokemonsByType(elem, controller)
                .then(r => r.json())
        )).then(data => {
            let info = [];
            let items = [];
            for (const item of data)
                items.push(...item.pokemon);
            items.map(obj => info.push(obj.pokemon));
            let unique = removeDuplicates(info);
            setIsFiltering(true);
            setIsFilteringByType(true);
            setFilterList(unique);
        }).catch(error => { console.log('Request Aborted:', error); });
    }

    function removeDuplicates(data) {
        const uniquePokemon = [];
        const seenNames = new Set();
        debugger;
        for (const pokemon of data) {
            if (!seenNames.has(pokemon.name)) {
                uniquePokemon.push(pokemon);
                seenNames.add(pokemon.name);
            }
        }
        return uniquePokemon;
    }

    return (
        <div className='align-center' id='filter-container'>
            <div className="input-group grid-col-span-4">
                <span><label htmlFor="pokemon-main-search"><FontAwesomeIcon icon={faSearch} /></label></span>
                <input type="text" id='pokemon-main-search' placeholder="Pokémon name..." ref={searchPokemonRef} />
            </div>

            <button ref={elem => btnSearchFiltersRef.current[15] = elem} className='btn grid-col-span-2'><FontAwesomeIcon icon={faSearch} />{" Search"}</button>
            <button ref={elem => btnSearchFiltersRef.current[0] = elem} id="water" className="filter-btn tooltip"><FontAwesomeIcon icon={faDroplet} />
                <div className="top" >
                    <p>Water</p>
                    <i></i>
                </div>
            </button>
            <button ref={elem => btnSearchFiltersRef.current[1] = elem} id="fire" className="filter-btn tooltip"><FontAwesomeIcon icon={faFire} />
                <div className="top" >
                    <p>Fire</p>
                    <i></i>
                </div>
            </button>
            <button ref={elem => btnSearchFiltersRef.current[2] = elem} id="electric" className="filter-btn tooltip"><FontAwesomeIcon icon={faBolt} />
                <div className="top" >
                    <p>Electric</p>
                    <i></i>
                </div>
            </button>
            <button ref={elem => btnSearchFiltersRef.current[3] = elem} id="grass" className="filter-btn tooltip"><FontAwesomeIcon icon={faLeaf} />
                <div className="top" >
                    <p>Grass</p>
                    <i></i>
                </div>
            </button>
            <button ref={elem => btnSearchFiltersRef.current[4] = elem} id="flying" className="filter-btn tooltip"><FontAwesomeIcon icon={faDove} />
                <div className="top" >
                    <p>Flying</p>
                    <i></i>
                </div>
            </button>
            <button ref={elem => btnSearchFiltersRef.current[5] = elem} id="poison" className="filter-btn tooltip"><FontAwesomeIcon icon={faSkullCrossbones} />
                <div className="top" >
                    <p>Poison</p>
                    <i></i>
                </div>
            </button>
            <button ref={elem => btnSearchFiltersRef.current[6] = elem} id="bug" className="filter-btn tooltip"><FontAwesomeIcon icon={faBug} />
                <div className="top" >
                    <p>Bug</p>
                    <i></i>
                </div>
            </button>
            <button ref={elem => btnSearchFiltersRef.current[7] = elem} id="fairy" className="filter-btn tooltip"><FontAwesomeIcon icon={faMosquito} />
                <div className="top" >
                    <p>Fairy</p>
                    <i></i>
                </div>
            </button>
            <button ref={elem => btnSearchFiltersRef.current[8] = elem} id="fighting" className="filter-btn tooltip"><FontAwesomeIcon icon={faUserNinja} />
                <div className="top" >
                    <p>Fighting</p>
                    <i></i>
                </div>
            </button>
            <button ref={elem => btnSearchFiltersRef.current[9] = elem} id="ground" className="filter-btn tooltip"><FontAwesomeIcon icon={faChessRook} />
                <div className="top" >
                    <p>Ground</p>
                    <i></i>
                </div>
            </button>
            <button ref={elem => btnSearchFiltersRef.current[10] = elem} id="rock" className="filter-btn tooltip"><FontAwesomeIcon icon={faGem} />
                <div className="top" >
                    <p>Rock</p>
                    <i></i>
                </div>
            </button>
            <button ref={elem => btnSearchFiltersRef.current[11] = elem} id="psychic" className="filter-btn tooltip"><FontAwesomeIcon icon={faSignal} />
                <div className="top" >
                    <p>Psychic</p>
                    <i></i>
                </div>
            </button>
            <button ref={elem => btnSearchFiltersRef.current[12] = elem} id="ghost" className="filter-btn tooltip"><FontAwesomeIcon icon={faGhost} />
            <div className="top" >
                    <p>Ghost</p>
                    <i></i>
                </div>
            </button>
            <button ref={elem => btnSearchFiltersRef.current[13] = elem} id="dragon" className="filter-btn tooltip"><FontAwesomeIcon icon={faDragon} />
            <div className="top" >
                    <p>Dragon</p>
                    <i></i>
                </div>
            </button>
            <button ref={elem => btnSearchFiltersRef.current[14] = elem} id="ice" className="filter-btn tooltip"><FontAwesomeIcon icon={faSnowflake} />
            <div className="top" >
                    <p>Ice</p>
                    <i></i>
                </div>
            </button>
        </div>

    )
}

export default Filter