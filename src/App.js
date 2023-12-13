import { useEffect, useState, useRef } from 'react';
import './App.css';
import Accessibility from './components/accessibility';
import { Outlet, Link, useNavigate } from "react-router-dom";
import ColorSchemes from './themes'
import { FaTimes } from 'react-icons/fa';

function App(props) {
  const navigate = useNavigate();

  const [notification, setNotification] = useState("");
  const [notificationHide, setNotificationHide] = useState(false);
  const [notificationTimeOut, setNotificationTimeOut] = useState(null);
  const [hideTimeOut, setHideTimeOut] = useState(null);
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

  const setDyslexicFont = (enabled) => {
    const root = document.documentElement;
    if (enabled === true) {
      root.style.setProperty(`--font_family`, "'OpenDyslexic'");
    } else {
      root.style.setProperty(`--font_family`, "'Poppins'");
    }
  }
  const changeDyslexicFont = (enabled) => {
    localStorage.setItem("dyslexicFont", enabled);
    setDyslexicFont(enabled);
  }

  const changeFontSize = (newSize) => {
    if (typeof newSize === 'undefined' || newSize === 'undefined' || newSize === null) {
      newSize = 18;
    }

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
    // Set font size
    var savedFontSize = localStorage.getItem("fontSize");
    if (typeof savedFontSize === 'undefined' || savedFontSize === 'undefined' || savedFontSize === null) {
      savedFontSize = 18;
    }
    setFontSize(savedFontSize);
    
    // Set colour scheme
    var colourScheme = localStorage.getItem("theme");
    if (!(colourScheme in ColorSchemes)) {
      colourScheme = "normal";
    }
    setTheme(colourScheme);

    // Set font
    var dyslexicFont = localStorage.getItem("dyslexicFont");
    console.log(dyslexicFont)
    if (typeof dyslexicFont === 'undefined' || dyslexicFont === 'undefined' || dyslexicFont === null) {
      dyslexicFont = false;
    } else {
      dyslexicFont = JSON.parse(dyslexicFont);
    }
    setDyslexicFont(dyslexicFont);
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        if (headerRef.current) {
          const headerHeight = headerRef.current.offsetHeight;
          setHeaderHeight(headerHeight);
        }
      });
      resizeObserver.observe(headerRef.current);
    }
  }, []);

  const hideNotification = () => {
    setNotificationHide(true);
    if (notificationTimeOut !== null) {
      clearTimeout(notificationTimeOut);
    }

    var timeout = setTimeout(() => {
      setNotification("");
      setNotificationHide(false);
    }, 400);
    setHideTimeOut(timeout);
  }
  const showNotification = (text, time) => {
    console.log(notificationTimeOut)
    if (notificationTimeOut !== null) {
      clearTimeout(notificationTimeOut);
    }
    if (hideTimeOut !== null) {
      clearTimeout(hideTimeOut);
    }
    setNotification(text);
    
    var timeout = setTimeout(() => {
      hideNotification();
    }, time);
    setNotificationTimeOut(timeout);
  }

  const signOut = () => {
    props.setLoggedIn(false);
    navigate('/login', { state: { signed_out: true } });
  }

  return (
    <div className="App" style={{ fontSize: `${fontSize}px` }}>
      <header className="App-header" ref={headerRef}>
        <div className="logoContainer">
          <img className="App-logo" src="/RSPB_logo.png"/>
          <div className="App-title">The Big Garden Birdwatch</div>
        </div>

        <div className="headerRightContainer">
          <div className="navigationContainer">
            { props.loggedIn ? <button className="signout" onClick={signOut}>Sign out</button> : <>
              <Link to="/login">Login</Link>
              <Link to="/">Register</Link>
            </> }
            
          </div>

          <div className="accessibilityTools">
            <button className="accessibilityButton" onClick={accessibilityPressed}>Accessibility</button>
          </div>
        </div>
      </header>

      <main role="main" className="App-content">
        <Outlet context={[fontSize, headerHeight, showNotification]}/>

        { accessibilityOptions && <Accessibility
          previewFontSize={setFontSize}
          changeFontSize={changeFontSize}
          previewTheme={setTheme}
          changeTheme={changeTheme}
          previewDyslexic={setDyslexicFont}
          changeDyslexic={changeDyslexicFont}
          fontSize={fontSize}
          headerHeight={headerHeight}
          closePopup={() => setAccessibilityOptions(false)}/> }

          { notification && <div className="notificationContainer">
              <div className={`notification ${notificationHide ? "hide" : ""}`}>
                <div className="notificationTop">
                  <div className="timerText"></div>
                  <button onClick={hideNotification} className="closeButton"><FaTimes/></button>
                </div>
                <div className="notificationText">
                  {notification}
                </div>
              </div>
            </div> }
      </main>
    </div>
  );
}

export default App;
