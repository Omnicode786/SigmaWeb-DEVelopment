import { useContext, useState } from "react";
import { ThemeDataContext } from "./themes/ThemeContext";
import "./App.css";
import "./index.css";

function App() {
  const [count, setCount] = useState(0);
  const { theme, setTheme } = useContext(ThemeDataContext);

  const changeTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={`app ${theme}`}>
      <h1>Vite + React</h1>

      <button onClick={() => setCount(c => c + 1)}>
        count is {count}
      </button>

      <button onClick={changeTheme}>
        Change theme
      </button>

      <h1>Current Theme: {theme}</h1>
    </div>
  );
}

export default App;
