import './countPopup.css';
import { useEffect, useRef } from 'react';


function CountPopup(props) {
  var birds = {...props.birds}

  const plusClicked = (key) => {
    birds[key].count += 1;
    props.setBirds(birds);
  }

  const minusClicked = (key) => {
    birds[key].count = Math.max(birds[key].count - 1, 0);
    props.setBirds(birds);
    console.log(key);
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

  var birdImage = props.birds[props.birdKey].image ? props.birds[props.birdKey].image : props.birds[props.birdKey].imageMale;

  return (
    <div className="countPopupBackground">
      <div className="countPopup" ref={ref}>
        <div className="birdImageContainer">
          <img className="birdImage" src={birdImage}/>
        </div>
        <div className="birdDescription">{props.birds[props.birdKey].description}</div>
        <div className="countControls">
          <input className="adjustButtons" type="button" value="-" onClick={() => minusClicked(props.birdKey)}/>
          <p>{props.birds[props.birdKey].count}</p>
          <input className="adjustButtons" type="button" value="+" onClick={() => plusClicked(props.birdKey)}/>
        </div>
      </div>
    </div>
  );
}

export default CountPopup;
