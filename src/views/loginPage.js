import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";
import './loginPage.css';
import './forms.css';


function LoginPage(props) {
  const [fontSize, headerHeight] = useOutletContext();
  const navigate = useNavigate();

  // Input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [pulseAnimation, setPulseAnimation] = useState(false);

  const login = () => {
    setEmailError("");
    setPasswordError("");

    var errors = false;

    if (email.length === 0) {
      setEmailError("Please enter your email");
      errors = true;
    }

    if (password.length === 0) {
      setPasswordError("Please enter your password");
      errors = true;
    }

    if (!errors) {
      navigate("/begin");
    } else {
      if (!pulseAnimation) {
        setPulseAnimation(true);
        setTimeout(() => setPulseAnimation(false), 300)
      }
    }
  }

  return (
    <div className="formPageContainer" style={{minHeight: `calc(100vh - ${headerHeight}px)`}}>
      <div className="formContainer">
      
      <div>
        <h1>Participant login</h1>

        <div className="inputGroup">
          <h2 style={{fontSize: Math.ceil(fontSize * 1.05)}}>Email address</h2>
          <input type="text" className="input" onChange={(e) => setEmail(e.target.value)} value={email}/>
          <p className={`errorMessage ${pulseAnimation ? "pulse" : ""}`}>{emailError}</p>
        </div>

        <div className="inputGroup">
          <h2 style={{fontSize: Math.ceil(fontSize * 1.05)}}>Password</h2>
          <input type="password" className="input" onChange={(e) => setPassword(e.target.value)} value={password}/>
          <p className={`errorMessage ${pulseAnimation ? "pulse" : ""}`}>{passwordError}</p>
        </div>
      </div>
        <div className="formButtons">
          <button className="formSubmitButton" onClick={login}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
