import { useEffect, useState, useRef } from 'react';
import './App.css';
import Accessibility from './components/accessibility';
import { Outlet, Link } from "react-router-dom";
import ColorSchemes from './themes'

function App() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [fontSize, setFontSize] = useState(18);
  const [accessibilityOptions, setAccessibilityOptions] = useState(false);
  const headerRef = useRef(null);

  const setTheme = (theme) => {
    const colors = ColorSchemes[theme];
    const root = document.documentElement;
    Object.keys(colors).forEach(key => {
      root.style.setProperty(`--${key}`, colors[key]);
    });
  }

  const changeFontSize = (newSize) => {
    console.log(typeof newSize)
    if (typeof newSize === 'undefined' || newSize === 'undefined' || newSize === null) {
      console.log("hi");
      newSize = 18;
    }
    
    console.log(newSize);

    localStorage.setItem("fontSize", newSize);
    setFontSize(newSize);
  };
  const changeTheme = (theme) => {
    if (!(theme in ColorSchemes)) {
      theme = "normal";
    }

    localStorage.setItem("theme", theme);
    setTheme(theme);
  }

  const accessibilityPressed = () => {
    setAccessibilityOptions(true);
  }

  useEffect(() => {
    var savedFontSize = localStorage.getItem("fontSize");
    if (typeof savedFontSize === 'undefined' || savedFontSize === 'undefined' || savedFontSize === null) {
      savedFontSize = 18;
    }
    setFontSize(savedFontSize);
    
    var colourScheme = localStorage.getItem("theme");
    if (!(colourScheme in ColorSchemes)) {
      colourScheme = "normal";
    }
    setTheme(colourScheme);
  }, []);

  useEffect(() => {
    

    if (headerRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        const headerHeight = headerRef.current.offsetHeight;
        setHeaderHeight(headerHeight);
      });
      resizeObserver.observe(headerRef.current);
    }
  }, []);

  return (
    <div className="App" style={{ fontSize: `${fontSize}px` }}>
      <header className="App-header" ref={headerRef}>
        <div className="logoContainer">
          <img className="App-logo" src="/RSPB_logo.png"/>
          <div className="App-title">The Big Garden Birdwatch</div>
        </div>

        <div className="navigationContainer">

        </div>

        <div className="accessibilityTools">
          <button className="accessibilityButton" onClick={accessibilityPressed}>Accessibility</button>
        </div>
      </header>

      <main role="main" className="App-content">
        <Outlet context={[fontSize, headerHeight]}/>
        { accessibilityOptions && <Accessibility
          previewFontSize={setFontSize}
          changeFontSize={changeFontSize}
          previewTheme={setTheme}
          changeTheme={changeTheme}
          fontSize={fontSize}
          closePopup={() => setAccessibilityOptions(false)}/> }
      </main>
    </div>
  );
}

export default App;
