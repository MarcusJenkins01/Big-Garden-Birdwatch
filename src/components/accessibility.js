import './accessibility.css';
import '../views/forms.css';
import '../components/popup.css';
import { useState } from 'react';

function Accessibility(props) {
  const [chosenFontSize, setChosenFontSize] = useState(props.fontSize);
  const [chosenTheme, setChosenTheme] = useState(null);

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

    props.closePopup();
  }
  const cancel = () => {
    props.changeFontSize(localStorage.getItem("fontSize"));
    props.changeTheme(localStorage.getItem("theme"));
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

  return (
    <div className="popupBackground">
      <div className="popup">
        <h1>Accessibility Settings</h1>
        <div className="accessibilityContent">
          <div className="controlsContainer">
            <div className="fontButtons">
              <button onClick={() => selectFontSize("small")}>Small</button>
              <button onClick={() => selectFontSize("regular")}>Regular</button>
              <button onClick={() => selectFontSize("large")}>Large</button>
            </div>

            <div className="contrastButtons">
              <button onClick={() => setTheme("normal")}>Default</button>
              <button onClick={() => setTheme("high_contrast")}>High contrast</button>
            </div>
          </div>

          <div className="saveButtons">
            <button className="cancelButton" onClick={cancel}>Cancel</button>
            <button className="submitButton" onClick={saveOptions}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accessibility;
