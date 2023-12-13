import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import RegisterPage from "./views/registerPage";
import MainPage from "./views/mainPage";
import LoginPage from "./views/loginPage";
import BeginPage from "./views/beginPage";
import FinishPage from "./views/finishPage";

export default function RoutedApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />}>
          <Route index element={<RegisterPage />} />
          <Route exact path="begin" element={<BeginPage />} />
          <Route exact path="login" element={<LoginPage />} />
          <Route exact path="main" element={<MainPage />} />
          <Route exact path="finish" element={<FinishPage />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RoutedApp />);
