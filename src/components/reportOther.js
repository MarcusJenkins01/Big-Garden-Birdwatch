import './reportOther.css';
import { useEffect, useRef, useState } from 'react';


function ReportOther(props) {
  const [birdName, setBirdName] = useState("");
  var birds = {...props.birds}

  const addNewBird = () => {
    let randomRadixNum = Math.random().toString(36);
    let randomKey = "bird_" + randomRadixNum.substring(2, randomRadixNum.length);
    birds[randomKey] = { displayName: birdName, count: 0, description: "This bird was added by you.",
      image: "bird_images/new/placeholder.webp" }
    
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
    <div className="reportOtherBackground">
      <div className="reportOther" ref={ref}>
          <h1>Report another bird</h1>
          <h3>If you spot a bird that isn't on the list, you can add it here.</h3>
          <div className="inputGroup">
            <h2>Bird name</h2>
            <input type="text" className="input" onChange={(e) => setBirdName(e.target.value)} value={birdName}/>
          </div>

          <div className="reportOtherButtons">
            <button className="cancelButton" onClick={() => props.closePopup()}>Cancel</button>
            <button className="submitButton" onClick={addNewBird}>Submit</button>
          </div>
      </div>
    </div>
  );
}

export default ReportOther;
