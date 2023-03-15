import React, { createContext, useEffect, useState } from 'react'

export const AppContext = createContext()

function AppContextProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 1);
  function handleThemeColor(param = null) {
    let theme = localStorage.getItem('theme');
    if (param) {
      setTheme(param);
      localStorage.setItem('theme', param);
    }
    if (theme == 1) {
      setTheme(0);
      localStorage.setItem('theme', 0);
    } else {
      setTheme(1);
      localStorage.setItem('theme', 1);
    }
  }

  useEffect(() => {
    const computedStyles = getComputedStyle(document.documentElement);
    const styles = document.documentElement.style;
    const bgDark = computedStyles.getPropertyValue("--bg-dark");
    const txtDark = computedStyles.getPropertyValue("--txt-dark");
    const bgLight = computedStyles.getPropertyValue("--bg-light");
    const txtLight = computedStyles.getPropertyValue("--txt-light");
    if (theme == 1) {
      styles.setProperty("--background-color", bgLight);
      styles.setProperty("--text-color", txtLight);
    } else {
      styles.setProperty("--background-color", bgDark);
      styles.setProperty("--text-color", txtDark);
    }
  }, [theme])

  return (
    <AppContext.Provider value={{
      theme, handleThemeColor
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;