import { useReducer } from "react";
import "../App.css";

function reducer(state, action) {
  if (action === "login") return true;
  if (action === "logout") return false;
  return state;
}

export default function UseReducerPage() {
  /*
  useReducer complex cheezon ke liye
  login / logout type logic
  */

  const [loggedIn, dispatch] = useReducer(reducer, false);

  return (
    <div className="page">
      <h1>useReducer – Rule based logic</h1>

      <div className="comment">
        useReducer complex cheezon ke liye
        login / logout type logic
      </div>

      <p>{loggedIn ? "Logged In" : "Logged Out"}</p>

      <button onClick={() => dispatch("login")}>Login</button>
      <button onClick={() => dispatch("logout")}>Logout</button>
    </div>
  );
}
