import { useEffect, useState } from 'react';
import './App.css';
import Accessibility from './components/accessibility';
import { Outlet, Link } from "react-router-dom";

function App(props) {
  const [fontSize, setFontSize] = useState(18);
  const [accessibilityOptions, setAccessibilityOptions] = useState(false);

  const colorSchemes = {
    normal: {
      header_bg: "white",
      main_bg: "rgb(236, 236, 236)",
      main_top_bar_bg: "white",
      main_controls_bg: "white",
      success_green: "rgb(23, 187, 119)",
      success_green_border: "transparent",
      negative_grey: "#e2e2e2",
      negative_grey_border: "transparent",
      grey1: "rgb(196, 196, 196)",
      report_other: "#1379A1",
      report_other_border: "transparent",
      plus_minus_bg: "#037789",
      plus_minus_border: "transparent",
      text_dark: "#444444",
      text_dark2: "#333333",
      text_light: "white",
      shadow1: "rgba(0, 0, 0, 0.2)",
      shadow2: "rgba(0, 0, 0, 0.15)",
      scrollbar_thumb_bg: "white",
      scrollbar_track: "#e9e9e9",
      scrollbar_thumb: "#c7c7c7",
      tile_bg: "white",
      tile_border: "rgba(0, 0, 0, 0.2)",
      tile_border_size: "1px",
      tile_sex_bg: "rgb(223, 223, 223)",
      tile_sex_text_selected: "black",
      tile_sex_bg_selected: "rgb(190, 190, 190)",
      tile_content_bg: "white",
      tile_count_bg: "#037789",
    },
    high_contrast: {
      header_bg: "black",
      main_bg: "black",
      main_top_bar_bg: "black",
      main_controls_bg: "black",
      success_green: "black",
      success_green_border: "white",
      negative_grey: "black",
      negative_grey_border: "white",
      grey1: "black",
      report_other: "black",
      report_other_border: "white",
      plus_minus_bg: "black",
      plus_minus_border: "white",
      text_dark: "white",
      text_dark2: "white",
      text_light: "white",
      shadow1: "rgba(0, 0, 0, 0.2)",
      shadow2: "rgba(0, 0, 0, 0.15)",
      scrollbar_thumb_bg: "white",
      scrollbar_track: "#e9e9e9",
      scrollbar_thumb: "#c7c7c7",
      tile_bg: "black",
      tile_border: "blue",
      tile_border_size: "3px",
      tile_sex_bg: "black",
      tile_sex_text_selected: "black",
      tile_sex_bg_selected: "yellow",
      tile_content_bg: "black",
      tile_count_bg: "blue",
    },
  };

  const changeFontSize = (newSize) => {
    localStorage.setItem("fontSize", newSize);
    setFontSize(newSize);
  };

  const accessibilityPressed = () => {
    setAccessibilityOptions(true);
  }

  useEffect(() => {
    const savedFontSize = localStorage.getItem("fontSize") || 18;
    setFontSize(savedFontSize);

    const colourScheme = localStorage.getItem("colorScheme") || "high_contrast";
    const colors = colorSchemes[colourScheme];
    const root = document.documentElement;
    Object.keys(colors).forEach(key => {
      root.style.setProperty(`--${key}`, colors[key]);
    });
  }, []);

  return (
    <div className="App" style={{ fontSize: `${fontSize}px` }}>
      <header className="App-header">
        <div className="logoContainer">
          <img className="App-logo" src="/RSPB_logo.png"/>
          <div className="App-title">The Big Garden Birdwatch</div>
        </div>

        <div className="navigationContainer">

        </div>

        <div className="accessibilityTools">
          <button onClick={accessibilityPressed}>Accessibility</button>
        </div>
      </header>

      <main role="main" className="App-content">
        <Outlet context={[fontSize]}/>
        { accessibilityOptions && <Accessibility
          previewFontSize={setFontSize}
          changeFontSize={changeFontSize}
          fontSize={fontSize}
          closePopup={() => setAccessibilityOptions(false)}/> }
      </main>
    </div>
  );
}

export default App;
