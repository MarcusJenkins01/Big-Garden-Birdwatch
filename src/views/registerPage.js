import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './registerPage.css';


function RegisterPage() {
  const navigate = useNavigate();

  const testPostcodes = {
    "NR1 4DH": [
      "60 The Cl, Norwich, NR1 4DH",
      "61 The Cl, Norwich, NR1 4DH",
      "62 The Cl, Norwich, NR1 4DH",
      "63 The Cl, Norwich, NR1 4DH",
      "64 The Cl, Norwich, NR1 4DH",
      "65 The Cl, Norwich, NR1 4DH"],
    "NR1 3DH": [
      "15 Castle Mdw, Norwich, NR1 3DH",
      "16 Castle Mdw, Norwich, NR1 3DH",
      "17 Castle Mdw, Norwich, NR1 3DH",
      "18 Castle Mdw, Norwich, NR1 3DH",
      "19 Castle Mdw, Norwich, NR1 3DH",
      "20 Castle Mdw, Norwich, NR1 3DH"]
  };
  const [suggestedPostcodes, setSuggestPostcodes] = useState({});
  const [selectedPostcode, setSelectedPostcode] = useState(null);
  const [displayAddress, setDisplayAddress] = useState(false);
  const [manualAddress, setManualAddress] = useState(false);
  
  // Input values
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [postcodeText, setPostcodeText] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [city, setCity] = useState("");

  // Error states
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [postcodeError, setPostcodeError] = useState("");
  const [addressLine1Error, setAddressLine1Error] = useState("");
  const [cityError, setCityError] = useState("");
  const [pulseAnimation, setPulseAnimation] = useState(false);

  const register = () => {
    setNameError("");
    setEmailError("");
    setPostcodeError("");
    setAddressLine1Error("");
    setCityError("");

    var errors = false;

    if (fullName.length === 0) {
      setNameError("Please enter your full name");
      errors = true;
    }

    if (email.length === 0) {
      setEmailError("Please enter your email");
      errors = true;
    }

    if (postcodeText.length === 0) {
      setPostcodeError("Please enter your postcode");
      errors = true;
    }

    if (addressLine1.length === 0) {
      setAddressLine1Error("Please enter the first line of your address");
      errors = true;
    }

    if (city.length === 0) {
      setCityError("Please enter your city");
      errors = true;
    }

    if (!errors) {
      navigate("/main");
    } else {
      if (!pulseAnimation) {
        setPulseAnimation(true);
        setTimeout(() => setPulseAnimation(false), 500)
      }
    }
  }

  const postcodeChange = (e) => {
    setPostcodeText(e.target.value);

    if (manualAddress) return;

    setPostcodeError("");

    var postcode = e.target.value.toLowerCase().replace(" ", "");
    var newPostcodes = {};

    if (selectedPostcode) setSelectedPostcode(null);

    Object.keys(testPostcodes).forEach(k => {
      if (postcode && k.toLowerCase().replace(" ", "").startsWith(postcode)) {
        newPostcodes[k] = testPostcodes[k];
      }
    });
    
    setSuggestPostcodes(newPostcodes);
  }

  const enterAddressManually = () => {
    setSelectedPostcode(null);
    setSuggestPostcodes({});
    setDisplayAddress(true);
    setManualAddress(true);
  }

  const handleSelectAddress = (address) => {
    var addressSplit = address.split(", ");
    setAddressLine1(addressSplit[0]);
    setCity(addressSplit[1]);
    setPostcodeText(addressSplit[2]);
    setSelectedPostcode(null);
    setSuggestPostcodes({});
    setDisplayAddress(true);

    setPostcodeError("");
    setAddressLine1Error("");
    setCityError("");
  }

  return (
    <div className="registerPageContainer">
      <div className="registerFormContainer">
      
      <div>
      <h1>Register to participate</h1>

        <div className="inputGroup">
          <p>Full name</p>
          <input type="text" className="input" onChange={(e) => setFullName(e.target.value)} value={fullName}/>
          <p className={`errorMessage ${pulseAnimation ? "pulse" : ""}`}>{nameError}</p>
        </div>

        <div className="inputGroup">
          <p>Email address</p>
          <input type="text" className="input" onChange={(e) => setEmail(e.target.value)} value={email}/>
          <p className={`errorMessage ${pulseAnimation ? "pulse" : ""}`}>{emailError}</p>
        </div>

        {
          displayAddress ?
          <>
            <div className="inputGroup">
              <p>Address line 1</p>
              <input type="text" className="input" onChange={(e) => setAddressLine1(e.target.value)} value={addressLine1}/>
              <p className={`errorMessage ${pulseAnimation ? "pulse" : ""}`}>{addressLine1Error}</p>
            </div>
            <div className="inputGroup">
              <p>City</p>
              <input type="text" className="input" onChange={(e) => setCity(e.target.value)} value={city}/>
              <p className={`errorMessage ${pulseAnimation ? "pulse" : ""}`}>{cityError}</p>
            </div>
          </>
          :
          <></>
        }

        <div className="inputGroupPostcode">
          <div className="header">
            <p>Postcode</p>
            { !displayAddress && <button className="enterManuallyButton" onClick={enterAddressManually}>Enter address manually</button> }
          </div>
          <input type="text" className="input" onChange={postcodeChange} value={postcodeText}/>
          <p className={`errorMessage ${pulseAnimation ? "pulse" : ""}`}>{postcodeError}</p>
          {
            (Object.keys(suggestedPostcodes).length > 0 || selectedPostcode) &&
            <div className="addressList">
              { selectedPostcode ? selectedPostcode.addresses.map(v => <button onClick={() => handleSelectAddress(v)}>{v}</button>) :
                Object.entries(suggestedPostcodes).map( ([key, value]) =>
                  <button onClick={() => setSelectedPostcode({postcode: key, addresses: value})}>{key}</button> )
              }
            </div>
          }
        </div>
      </div>
        
        <div className="registerButtons">
          <button className="registerButton" onClick={register}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
