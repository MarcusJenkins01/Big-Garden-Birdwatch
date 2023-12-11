import { useNavigate, useOutletContext, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import './beginPage.css';
import './forms.css';


function BeginPage(props) {
  const { state } = useLocation();
  const [fontSize, headerHeight, showNotification] = useOutletContext();
  const navigate = useNavigate();

  const start = () => {
    navigate("/main");
  }

  useEffect(() => {
    if (state !== null) {
      if (state.registered === true) {
        showNotification(`Successfully registered as ${state.email}`, 5000);
      } else if (state.logged_in === true) {
        showNotification(`You are now logged in as ${state.email}`, 5000);
      }
    }
  }, [])

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
