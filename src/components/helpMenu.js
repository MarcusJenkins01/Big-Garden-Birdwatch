import './helpMenu.css';
import '../views/forms.css';
import '../components/popup.css';
import { useEffect, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';


function HelpMenu(props) {
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
        <div className="helpMenuContainer">
          <h1>Help guide</h1>
          <div className="helpMenuContent">
            <ol>
              <li>Record only up to the highest number of each type of bird you see at any one time.</li>
              <li>To record a bird, tap on its image to add one to its count.</li>
              <li>If you see any birds that aren’t listed then click “Report other” to add it as a new bird.</li>
            </ol>
          </div>

          <button className="closeButtonPopup" onClick={props.closePopup}>
            <FaTimes/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HelpMenu;
