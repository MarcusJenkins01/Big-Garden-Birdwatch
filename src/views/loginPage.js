import { useNavigate, useOutletContext, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import './loginPage.css';
import './forms.css';


function LoginPage(props) {
  const [fontSize, headerHeight, showNotification] = useOutletContext();
  const navigate = useNavigate();
  const { state } = useLocation();

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
      props.setLoggedIn(true);
      navigate("/begin", { state: { email: email, registered: false, logged_in: true } });
    } else {
      if (!pulseAnimation) {
        setPulseAnimation(true);
        setTimeout(() => setPulseAnimation(false), 300)
      }
    }
  }

  useEffect(() => {
    if (state !== null) {
      if (state.signed_out === true) {
        showNotification(`You are now signed out`, 5000);
      }
    }
  }, [])

  return (
    <div className="formPageContainer" style={{minHeight: `calc(100vh - ${headerHeight}px)`}}>
      <div className="formContainer">
      
      <div>
        <h1>Participant login</h1>

        <div className="inputGroup">
          <h2 style={{fontSize: Math.ceil(fontSize * 1.05)}}>Email address</h2>
          <input placeholder="e.g. johnsmith@gmail.com" type="text" className="input" onChange={(e) => setEmail(e.target.value)} value={email}/>
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
        <div style={{color: "var(--text_dark)"}}>
          Don't have an account? <Link style={{color: "var(--link_color)"}} to="/">Register now</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
