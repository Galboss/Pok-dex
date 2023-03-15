import React, { useContext, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/imgs/pokedex_logo.png"
import { FontAwesomeIcon, } from "@fortawesome/react-fontawesome";
import { faSearch, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import useAppContext from "../../hooks/appcontex/useAppContext";

function useResponsiveNav() {
  const burgerRef = useRef();
  const navMenuRef = useRef();
  const navSwitchRef = useRef();
  const computedStyles = getComputedStyle(document.documentElement);
  const { theme, handleThemeColor } = useAppContext();
  function handleSwitchTheme() {
    const navSwitch = navSwitchRef.current;
    if (navSwitch.checked)
      handleThemeColor(1);
    else
      handleThemeColor(0);
  }
  useEffect(() => {
    const burger = burgerRef.current;
    const navMenu = navMenuRef.current;
    const navSwitch = navSwitchRef.current;
    const handleBurgerClick = () => {
      burger.classList.toggle('active');
      navMenu.classList.toggle('active');
    };
    navSwitch.addEventListener("change", handleSwitchTheme);

    burger.addEventListener("click", handleBurgerClick);
    return () => {
      burger.removeEventListener("click", handleBurgerClick);
      navSwitch.removeEventListener("change", handleSwitchTheme);
    }
  }, []);

  return { burgerRef, navMenuRef, navSwitchRef, computedStyles, theme, handleSwitchTheme };
}

const Navbar = () => {
  const { burgerRef, navMenuRef, navSwitchRef, theme, handleSwitchTheme } = useResponsiveNav();
  return (
    <nav id='Navbar'>
      <a href="#" id="Nav-logo-container">
        <img src={logo} alt="Pokedex" />
      </a>
      <div id="Nav-menu-container" ref={navMenuRef}>
        <ul className="nav-list">
          <li><NavLink to="/" className="nav-link">Home</NavLink></li>
          <li><NavLink to="/About" className="nav-link">About</NavLink></li>
        </ul>
      </div>
      <label className="nav-switch-toggler" >
        <input type="checkbox" defaultChecked={theme == 1} ref={navSwitchRef} />
        <span className="slider round"> <FontAwesomeIcon icon={faSun} /> <FontAwesomeIcon icon={faMoon} /> </span>
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