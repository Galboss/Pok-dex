import React from 'react';
import "./About.css";
import pokedexLogo from "../../assets/imgs/pokedex_logo_v2.png";
function About() {
  return (
    <main>
      <section className="p-2 column-container jc-space-around" id="Banner">
        <img src={pokedexLogo} alt="" />
      </section>
      <section className="p-2 max-w-90 row-container m-h-auto jc-space-around h-gap-1 ">
        <article className="column-container f-grow-4">
          <h2>Presentation</h2>
          <p>
            Hi everyone!, I am Bryan, a passionate software developer here in Costa Rica
            that really loves technology.
          </p>
          <p>
            The propuse of this project is for showing my abilities as <strong>Front-End </strong>
            developer using <strong>React</strong> as a framework to create nice appealing
            web applications.
          </p>
          <p>
            I decided to create this <strong>PokéDex</strong> application
            because the <strong>PokéApi</strong> is well structured, have a
            lot of structured data with different kind of information that
            can be obtain via <strong>RESTful APIs End-points</strong>.
            So, it just need to implement a good looking web interface
            to show the data to the user.
          </p>
        </article>
        <article className="column-container jc-space-around v-gap-3 f-grow-2">
          <div>
            <h2>My Role</h2>
            <p>
              Develop a web interface to show the data of the
              <strong> PokéApi</strong> to the user. Allowing the user to search any pokémon register on the <strong>pokéApi </strong>
              and read the information related with the pokémon.
            </p>
          </div>

          <div>
            <h2>My Goal</h2>
            <p>
              Demostrarte my abilities as a <strong>Front-End</strong> developer
              using <strong>React</strong> to develop Web Applications of any kind. Manipulating data and showing to the user in a attractive way.
            </p>
          </div>
        </article>
      </section>
      <section id='Definitions'>
        <article className="column-container max-w-90 m-h-auto v-gap-1">
          <h2 className='max-w txt-center'>Definitions</h2>
          <h3>Who are the Pokémon?</h3>
          <p>
            Pokémon are creatures of different sizes and shapes that can live
            in the wild or with humans. Those creatures can be
            very similar to some real animals that live in our world. The humans that
            lives with Pokémon as a friend or pet are called <strong>Trainers</strong>.
            While people go around with their Pokémon, the Pokémon creatures gain experience
            , and with that they become more stronger than when they were captured.
            Some species of Pokémons can evolve in a different creature that can be more
            stronger that it's regular form. There are hundreds of known types of Pokémons
            that inhabits in the Pokémons universe and there still more to be discovered.
          </p>
          <h3>What is PokéDex?</h3>
          <p>
            The Pokédex is an electronic device that appears on the Pokémon universe. Its
            function is to be a personal digital assistant for <strong>Trainers</strong>,
            it is designed to catalogue and and provide information, like and encyclopedia
            of Pokémon creatures.
          </p>
          <h3>Where did I get the information about Pokémon?</h3>
          <p>
            All the information about Pokémon have been retrieve the <a href="https://pokeapi.co/about"
              className="content-link"><strong>PokéApi</strong></a> project.This website provides a RESTful API
            interface to highly detailed objects built from thousands of lines of data related to Pokémon.
            They  specifically cover the video game franchise. Using this website, you can consume information on Pokémon,
            their moves, abilities, types and much, much more.
          </p>
          <h3>How the data will be display on the screen?</h3>
          <p>
            The data of the Pokémon will be displayed in a grid where you can see all the Pokémon 
            available on the API. Each Pokémon item will be a square that will have an image of 
            the Pokémon, the name of the Pokémon, and the ID. Actually, the Pokémon item can be
             hovered over, and if you hover over the item, it will bring you more information 
             related to the Pokémon, such as base experience, health points, defense, attacks, 
             types, etc. Another important aspect of the page is that you can actually filter the 
             Pokémon by its type and name. If you want to find a Pokémon by its name, you just need 
             to write the name of the Pokémon, and it will show all the Pokémon that match the name.
          </p>
          <p>
            If you want to filter all the Pokémon by their type, you can select the type of Pokémon you want to see.
            For example, if you want to see Water-type Pokémon, you can click the 'Water' button and the page will f
            ind all the Pokémon that match that type. Similarly, if you want to see Grass-type and Poison-type Pokémon,
            you just need to click each button and the page will find all the Pokémon that have both types and show them on the screen.
            <br />
            Finally, each Pokémon will have a button that will send you to a page that actually
            contains more details related to the Pokémon you selected.
          </p>
        </article>
      </section>
    </main>
  );
}

export default About;