import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { useEffect } from 'react'

function App() {

  useEffect(() => {
    const ticker = 'amzn'
    axios.get(`http://localhost:8000/api/scrape/${ticker}/`)
      .then(response => {
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
