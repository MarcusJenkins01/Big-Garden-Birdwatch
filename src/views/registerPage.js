import Input from "../components/input";
import './registerPage.css';


function RegisterPage() {
  return (
    <div className="registerPageContainer">
      <div className="registerFormContainer">
        <p>Full name</p>
        <Input/>
        <p>Email address</p>
        <Input/>
        <p>Postcode</p>
        <Input/>
      </div>
    </div>
  );
}

export default RegisterPage;
