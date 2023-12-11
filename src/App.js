import { useEffect, useState, useRef } from 'react';
import './App.css';
import Accessibility from './components/accessibility';
import { Outlet, Link } from "react-router-dom";
import ColorSchemes from './themes'
import { FaTimes } from 'react-icons/fa';

function App() {
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

  return (
    <div className="App" style={{ fontSize: `${fontSize}px` }}>
      <header className="App-header" ref={headerRef}>
        <div className="logoContainer">
          <img className="App-logo" src="/RSPB_logo.png"/>
          <div className="App-title">The Big Garden Birdwatch</div>
        </div>

        <div className="headerRightContainer">
          <div className="navigationContainer">
            <Link to="/login">Login</Link>
            <Link to="/">Register</Link>
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
