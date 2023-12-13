import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import RegisterPage from "./views/registerPage";
import MainPage from "./views/mainPage";
import LoginPage from "./views/loginPage";
import BeginPage from "./views/beginPage";
import FinishPage from "./views/finishPage";
import { useState } from "react";

export default function RoutedApp() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}>
          <Route index element={<RegisterPage loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
          <Route exact path="begin" element={<BeginPage loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
          <Route exact path="login" element={<LoginPage loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
          <Route exact path="main" element={<MainPage loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
          <Route exact path="finish" element={<FinishPage loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RoutedApp />);
