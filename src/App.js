import logo from './logo.svg';
import './App.css';
import RegisterPage from './views/registerPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logo">Logo</div>
        <div className="App-title">The Big Garden Birdwatch</div>
      </header>
      <main className="App-content">
        <RegisterPage/>
      </main>
    </div>
  );
}

export default App;
