import React, { useEffect, useRef } from "react";
import { Link,NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/imgs/pokedex_logo.png"
import { FontAwesomeIcon, } from "@fortawesome/react-fontawesome";
import { faSearch,faSun,faMoon } from "@fortawesome/free-solid-svg-icons";

function useResponsiveNav() {
  const burgerRef = useRef();
  const navMenuRef = useRef();
  const navSwitchRef= useRef();
  const computedStyles = getComputedStyle(document.documentElement);
  useEffect(() => {
    const burger = burgerRef.current;
    const navMenu = navMenuRef.current;
    const navSwitch = navSwitchRef.current;
    const handleBurgerClick = () => {
      burger.classList.toggle('active');
      navMenu.classList.toggle('active');
    };
    const handleSwitchTheme=()=>{
      
      const styles = document.documentElement.style;
      const bgDark = computedStyles.getPropertyValue("--bg-dark");
      const txtDark = computedStyles.getPropertyValue("--txt-dark");
      const bgLight = computedStyles.getPropertyValue("--bg-light");
      const txtLight = computedStyles.getPropertyValue("--txt-light");
      if(navSwitch.checked){
        styles.setProperty("--background-color",bgLight);
        styles.setProperty("--text-color",txtLight);
      }else{
        styles.setProperty("--background-color",bgDark);
        styles.setProperty("--text-color",txtDark);
      }
    }
    navSwitch.addEventListener("change",handleSwitchTheme);
    burger.addEventListener("click", handleBurgerClick);
    return () => {
      burger.removeEventListener("click", handleBurgerClick);
      navSwitch.removeEventListener("change",handleSwitchTheme);
    }
  }, []);
  return { burgerRef, navMenuRef, navSwitchRef,computedStyles };
}

const Navbar = () => {

  const { burgerRef, navMenuRef, navSwitchRef } = useResponsiveNav();
  return (
    <nav id='Navbar'>
      <a href="#" id="Nav-logo-container">
        <img src={logo} alt="Pokedex" />
      </a>
      <div id="Nav-menu-container" ref={navMenuRef}>
        <input id="Pokemon-search" type="text" placeholder="Pokémon name" />
        <a href="" id="Search-btn" className="btn"><FontAwesomeIcon icon={faSearch} />{' Search'}</a>
        <ul className="nav-list">
          <li><NavLink to="/" className="nav-link">Home</NavLink></li>
          <li><NavLink to="/About" className="nav-link">About</NavLink></li>
          <li><NavLink to="" className="nav-link">Nose 1</NavLink></li>
          <li><NavLink to="" className="nav-link">No se 2</NavLink></li>
        </ul>
      </div>
      <label className="nav-switch-toggler" >
        <input type="checkbox" defaultChecked ref={navSwitchRef}/>
          <span className="slider round"> <FontAwesomeIcon icon={faSun}/> <FontAwesomeIcon icon={faMoon}/> </span>
      </label>
      <div className="burger" ref={burgerRef}>
        <div className="burger-line"></div>
        <div className="burger-line"></div>
        <div className="burger-line"></div>
      </div>
    </nav>
  );
}

export default Navbar