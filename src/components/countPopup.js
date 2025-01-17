import './countPopup.css';
import './popup.css';
import { useEffect, useRef, useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';

function CountPopup(props) {
  var birds = {...props.birds}

  const [popAnimation, setPopAnimation] = useState(false);
  const [deniedAnimation, setDeniedAnimation] = useState(false);
  const [imageWidth, setImageWidth] = useState(0);

  var bird = props.birds[props.birdKey];
  var hasSex = bird.imageMale && bird.imageFemale;
  const [sex, setSex] = useState("m");
  var imageSrc = hasSex ? (sex === "f" ? bird.imageFemale : bird.imageMale) : bird.image;

  const doPopAnimation = () => {
    setPopAnimation(true);
    setTimeout(() => setPopAnimation(false), 200);
  }

  const doDeniedAnimation = () => {
    setDeniedAnimation(true);
    setTimeout(() => setDeniedAnimation(false), 200);
  }

  const plusClicked = () => {
    birds[props.birdKey].count += 1;
    props.setBirds(birds);
    doPopAnimation();
  }

  const minusClicked = () => {
    if (birds[props.birdKey].count === 0) {
      doDeniedAnimation();
    } else {
      birds[props.birdKey].count = Math.max(birds[props.birdKey].count - 1, 0);
      props.setBirds(birds);
      doPopAnimation();
    }
  }

  const deleteBird = () => {
    if (bird.customBird === true) {
      delete birds[props.birdKey];
      props.setBirds(birds);
      props.showNotification(`You have deleted "${bird.displayName}"`, 5000);
      props.closePopup();
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

  const imageRef = useRef(null);
  useEffect(() => {
    if (imageRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        if (imageRef.current) {
          const width = imageRef.current.offsetWidth;
          setImageWidth(width);
        }
      });
      resizeObserver.observe(imageRef.current);
    }
  }, []);

  return (
    <div className="popupBackground" style={{maxHeight: `calc(100vh - ${props.headerHeight}px)`, top: `${props.headerHeight}px`}}>
      <div className="popup" ref={ref}>
        <div className="countPopupContent">
          <div className="birdImageContainer" ref={imageRef} style={{maxHeight: Math.floor(imageWidth * 0.75), minHeight: Math.floor(imageWidth * 0.55)}}>
            <img className="birdImage" src={imageSrc}/>
          </div>
          { hasSex ?
            <div className="sexControls">
                <button className={sex === "m" ? "selected" : ""} onClick={() => setSex("m")}>MALE</button>
                <button className={sex === "f" ? "selected" : ""} onClick={() => setSex("f")}>FEMALE</button>
            </div>
          : <></> }
          <h1>{bird.displayName}</h1>
          <div className="birdDescription">{bird.description}</div>
        </div>
        
        <div className="countControls">
          <button className="adjustButtons" onClick={minusClicked}>
            <FaMinus/>
          </button>
          <p className={deniedAnimation ? "denied-animation" : (popAnimation ? "pop-animation" : "")}>{bird.count}</p>
          <button className="adjustButtons" onClick={plusClicked}>
            <FaPlus/>
          </button>
        </div>
        
        <button className="closeButtonPopup" onClick={props.closePopup}><FaTimes/></button>

        {bird.customBird === true && <div className="deleteBirdContainer">
          <button class="deleteBirdButton" onClick={deleteBird}>Delete</button>
        </div>}
      </div>
    </div>
  );
}

export default CountPopup;
