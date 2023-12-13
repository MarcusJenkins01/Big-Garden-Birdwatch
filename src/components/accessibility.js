import './accessibility.css';
import '../views/forms.css';
import '../components/popup.css';
import { useState } from 'react';
import { useLockBodyScroll } from "@uidotdev/usehooks";

function Accessibility(props) {
  const [chosenFontSize, setChosenFontSize] = useState(props.fontSize);
  const [chosenTheme, setChosenTheme] = useState(null);
  const [chosenDyslexic, setChosenDyslexic] = useState(null);

  const fontSizeSettings = {
    small: 16,
    regular: 18,
    large: 20
  }

  const saveOptions = () => {
    props.changeFontSize(chosenFontSize);

    if (chosenTheme !== null) {
      props.changeTheme(chosenTheme);
    }

    if (chosenDyslexic !== null) {
      props.changeDyslexic(chosenDyslexic);
    }

    props.closePopup();
  }
  const cancel = () => {
    props.changeFontSize(localStorage.getItem("fontSize"));
    props.changeTheme(localStorage.getItem("theme"));
    props.changeDyslexic(JSON.parse(localStorage.getItem("dyslexicFont")));
    props.closePopup();
  }

  const selectFontSize = (setting) => {
    var size = fontSizeSettings[setting];
    props.previewFontSize(size);
    setChosenFontSize(size);
  }

  const setTheme = (setting) => {
    props.previewTheme(setting);
    setChosenTheme(setting);
  }

  const setDyslexicFont = (setting) => {
    props.previewDyslexic(setting);
    setChosenDyslexic(setting);
  }

  useLockBodyScroll();

  return (
    <div className="popupBackground" style={{height: `calc(100vh - ${props.headerHeight}px)`, top: `${props.headerHeight}px`}}>
      <div className="popup">
        <div className="accessibilityContainer">
          <h1>Accessibility Settings</h1>
          <div className="accessibilityContent">
            <div className="controlsContainer">
              <div className="accessibilitySetting">
                <div className="labelText">Font size</div>
                <div className="buttonsContainer">
                  <button onClick={() => selectFontSize("small")}>Small</button>
                  <button onClick={() => selectFontSize("regular")}>Regular</button>
                  <button onClick={() => selectFontSize("large")}>Large</button>
                </div>
              </div>

              <div className="accessibilitySetting">
                <div className="labelText">High contrast</div>
                <div className="buttonsContainer">
                  <button onClick={() => setTheme("normal")}>Disable</button>
                  <button onClick={() => setTheme("high_contrast")}>Enable</button>
                </div>
              </div>

              <div className="accessibilitySetting">
                <div className="labelText">Dyslexic font</div>
                <div className="buttonsContainer">
                  <button onClick={() => setDyslexicFont(false)}>Disable</button>
                  <button onClick={() => setDyslexicFont(true)}>Enable</button>
                </div>
              </div>
            </div>

            <div className="saveButtons">
              <button className="cancelButton" onClick={cancel}>Cancel</button>
              <button className="submitButton" onClick={saveOptions}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accessibility;
