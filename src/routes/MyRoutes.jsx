import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import BasicLayout from '../layouts/basic_layout/BasicLayout';
import About from '../pages/about/About';
import Home from '../pages/home/Home';
import NotFound from '../pages/not_found/NotFound';
import PokemonSelected from '../pages/pokemon_selected/PokemonSelected';


function MyRoutes() {
    return (
        <Routes >
            <Route path='Pokedex/' element={<BasicLayout />}>
                <Route path='/Pokedex/' element={<Home/>}/>
                <Route path='/Pokedex/About' element={<About />} />
                <Route path='/Pokedex/Pokemons' element={<Home/>}/>
                <Route path='/Pokedex/PokemonSelected' element={<PokemonSelected/>}/>
                <Route path='/Pokedex/404/' element={<NotFound/>}/>
                <Route path='/Pokedex/*'element={<Navigate to='/Pokedex/404/' replace={true}/>}/>
            </Route>
        </Routes>
    )
}

export default MyRoutes