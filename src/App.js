import './App.css';
import { Outlet, Link } from "react-router-dom";

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <img className="App-logo" src="/RSPB_logo.png"/>
        <div className="App-title">The Big Garden Birdwatch</div>
      </header>
      <main className="App-content">
        <Outlet/>
      </main>
    </div>
  );
}

export default App;
