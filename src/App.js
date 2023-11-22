import './App.css';
import RegisterPage from './views/registerPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img className="App-logo" src="/RSPB_logo.png"/>
        <div className="App-title">The Big Garden Birdwatch</div>
      </header>
      <main className="App-content">
        <RegisterPage/>
      </main>
    </div>
  );
}

export default App;
