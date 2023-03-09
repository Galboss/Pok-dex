import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BasicLayout from '../layouts/basic_layout/BasicLayout';
import About from '../pages/about/About';
import Home from '../pages/home/Home';
import PokemonSelected from '../pages/pokemon_selected/PokemonSelected';


function MyRoutes() {
    return (
        <Routes >
            <Route path='/' element={<BasicLayout />}>
                <Route path='/' element={<Home/>}/>
                <Route path='/About' element={<About />} />
                <Route path='/Pokemons' element={<Home/>}/>
                <Route path='/PokemonSelected' element={<PokemonSelected/>}/>
            </Route>
        </Routes>
    )
}

export default MyRoutes