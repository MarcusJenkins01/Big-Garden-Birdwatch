import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";
import './beginPage.css';
import './forms.css';


function BeginPage(props) {
  const [fontSize, headerHeight] = useOutletContext();
  const navigate = useNavigate();

  const start = () => {
    navigate("/main");
  }

  return (
    <div className="formPageContainer" style={{minHeight: `calc(100vh - ${headerHeight}px)`}}>
      <div className="formContainer">
        <div className="beginContent">
          <h1>Begin now?</h1>
          <h3>The suggested time to spend is up to an hour or so. You can cancel at any time.</h3>
        </div>
        <div className="formButtons">
          <button className="formSubmitButton" onClick={start}>Start</button>
        </div>
      </div>
    </div>
  );
}

export default BeginPage;
