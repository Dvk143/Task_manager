import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import "./styles/App.css";

function App() {
  const [dark, setDark] = useState(true);

  return (
    <div className={dark ? "app dark" : "app light"}>
      <div className="container">
        <header className="header">
          <h1>Task Manager</h1>

          {/* DARK MODE TOGGLE */}
          <button
            className="theme-toggle"
            onClick={() => setDark(!dark)}
          >
            {dark ? "🌞 Light" : "🌙 Dark"}
          </button>
        </header>

        <Dashboard />
      </div>
    </div>
  );
}

export default App;
