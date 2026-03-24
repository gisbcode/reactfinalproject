import React from "react";
import "./App.css";
import Weather from "./Weather";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Weather App</h1>
        <Weather />
        <footer>
          This project was coded by{" "}
          <a
            href="https://github.com/gisbcode"
            target="_blank"
            rel="noreferrer"
          >
            Giovanna Bellon
          </a>{" "}
          and is open-sourced on{" "}
          <a
            href="https://github.com/gisbcode/reactfinalproject"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>{" "}
          and hosted on{" "}
          <a
            href="https://reactweatherappgio.netlify.app/"
            target="_blank"
            rel="noreferrer"
          >
            Netlify
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;
