import './reportOther.css';
import '../views/forms.css';
import '../components/popup.css';
import { useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';


function ReportOther(props) {
  const [birdName, setBirdName] = useState("");
  const [nameError, setNameError] = useState("");
  const [vibrateAnimation, setVibrateAnimation] = useState(false);

  var birds = {...props.birds}

  const addNewBird = () => {
    if (birdName.length === 0) {
      setNameError("Please enter a name");
      setVibrateAnimation(true);
      setTimeout(() => setVibrateAnimation(false), 300);
      return;
    }

    // Generate random key for new bird
    var randomRadixNum = Math.random().toString(36);
    var randomKey = "bird_" + randomRadixNum.substring(2, randomRadixNum.length);
    while (randomKey in birds) {
      randomRadixNum = Math.random().toString(36);
      randomKey = "bird_" + randomRadixNum.substring(2, randomRadixNum.length);
    }

    birds[randomKey] = { displayName: birdName, count: 0, description: "This bird was added by you.",
      image: "bird_images/new/placeholder.webp", customBird: true }
    
    setBirdName("");
    props.closePopup();
    props.setBirds(birds);
  }

  const ref = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        props.closePopup();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [ props.closePopup ]);

  return (
    <div className="popupBackground" style={{height: `calc(100vh - ${props.headerHeight}px)`, top: `${props.headerHeight}px`}}>
      <div className="popup" ref={ref}>
        <div className="reportOtherContainer">
          <h1>Report another bird</h1>
          <div className="reportOtherContent">
            <h3>If you spot a bird that isn't on the list, you can add it here.</h3>
            <div className="inputGroup">
              <h2 style={{fontSize: Math.ceil(props.fontSize * 1.2)}}>Bird name</h2>
              <input type="text" className="input" onChange={(e) => setBirdName(e.target.value)} value={birdName}/>
              { nameError && <p class={`errorMessage ${vibrateAnimation ? "vibrate" : ""}`}>{nameError}</p> }
            </div>

            <div className="reportOtherButtons">
              <button className="cancelButton" onClick={() => props.closePopup()}>Cancel</button>
              <button className="submitButton" onClick={addNewBird}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportOther;
