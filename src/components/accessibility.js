import './accessibility.css';
import { useState } from 'react';

function Accessibility(props) {

  const [chosenFontSize, setChosenFontSize] = useState(props.fontSize);
  const fontSizeSettings = {
    small: 16,
    regular: 18,
    large: 20
  }

  const saveOptions = () => {
    props.changeFontSize(chosenFontSize);
    props.closePopup();
  }

  const cancel = () => {
    props.changeFontSize(localStorage.getItem("fontSize") || 18);
    props.closePopup();
  }

  const selectFontSize = (setting) => {
    var size = fontSizeSettings[setting];
    props.previewFontSize(size);
    setChosenFontSize(size);
  }

  return (
    <div className="accessibilityBackground">
      <div className="accessibility">
          <div className="controlsContainer">
            <h1>Accessibility Settings</h1>

            <div className="fontButtons">
              <button onClick={() => selectFontSize("small")}>Small</button>
              <button onClick={() => selectFontSize("regular")}>Regular</button>
              <button onClick={() => selectFontSize("large")}>Large</button>
            </div>

            <div className="highContrast">
              <button onClick={() => selectFontSize("small")}>Small</button>
              <button onClick={() => selectFontSize("regular")}>Regular</button>
              <button onClick={() => selectFontSize("large")}>Large</button>
            </div>
          </div>

          <div className="saveButtons">
            <button className="cancelButton" onClick={cancel}>Cancel</button>
            <button className="saveButton" onClick={saveOptions}>Save</button>
          </div>
      </div>
    </div>
  );
}

export default Accessibility;
