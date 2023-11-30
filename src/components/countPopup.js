import './countPopup.css';
import { useEffect, useRef, useState } from 'react';


function CountPopup(props) {
  var birds = {...props.birds}

  const [popAnimation, setPopAnimation] = useState(false);
  const [deniedAnimation, setDeniedAnimation] = useState(false);

  const doPopAnimation = () => {
    setPopAnimation(true);
    setTimeout(() => setPopAnimation(false), 200);
  }

  const doDeniedAnimation = () => {
    setDeniedAnimation(true);
    setTimeout(() => setDeniedAnimation(false), 200);
  }

  const plusClicked = (key) => {
    birds[key].count += 1;
    props.setBirds(birds);
    doPopAnimation();
  }

  const minusClicked = (key) => {
    if (birds[key].count === 0) {
      doDeniedAnimation();
    } else {
      birds[key].count = Math.max(birds[key].count - 1, 0);
      props.setBirds(birds);
      doPopAnimation();
    }
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
          <p className={deniedAnimation ? "denied-animation" : (popAnimation ? "pop-animation" : "")}>{props.birds[props.birdKey].count}</p>
          <input className="adjustButtons" type="button" value="+" onClick={() => plusClicked(props.birdKey)}/>
        </div>
      </div>
    </div>
  );
}

export default CountPopup;
