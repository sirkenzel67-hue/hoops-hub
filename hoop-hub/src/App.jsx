
import { useEffect, useReducer, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import ScoreBoard from "./components/ScoreBoard";
import "./index.css";
import { GameContext } from "./GameContext";
import { PlayerForm } from "./components/PlayerForm";
import Roster from "./components/Roster";
import Statistics from "./components/Statistics";
import { useLocalStorage } from "./useLocalStorage";

function reducer(state, action) {
  switch (action.type) {
    case "ADD_POINTS":
      return {
        ...state,
        [action.team]: state[action.team] + action.points,
        history: [
          ...state.history,
          {
            home: state.home,
            away: state.away,
            quarter: state.quarter,
            team: action.team,
            points: action.points,
          },
        ],
      };
    case "NEXT_QUARTER":
      return {
        ...state,
        quarter: state.quarter < 4 ? state.quarter + 1 : state.quarter,
      };
    case "RESET_SCORE":
      return { ...state, home: 0, away: 0, history: [] };
    case "RESET_GAME":
      return { home: 0, away: 0, quarter: 1, history: [] };
    case "UNDO": {
      if (state.history.length === 0) return state;
      const prev = state.history[state.history.length - 1];
      return {
        home: prev.home,
        away: prev.away,
        quarter: prev.quarter,
        history: state.history.slice(0, -1),
      };
    }
  }
}

function Home({ state, dispatch, onResetGame }) {
  return (
    <div className="container">
      <h1>Quarter: {state.quarter}</h1>
      <button onClick={() => dispatch({ type: "NEXT_QUARTER" })}>
        Next Quarter
      </button>
      <button onClick={() => dispatch({ type: "RESET_SCORE" })}>
        Reset Scores
      </button>
      <button onClick={onResetGame}>Reset Game</button>
      <button onClick={() => dispatch({ type: "UNDO" })}>Undo</button>
      <ScoreBoard team="home" />
      <ScoreBoard team="away" />
    </div>
  );
}

export default function App() {
  const initialize = { home: 0, away: 0, quarter: 1, history: [] };
  const [state, dispatch] = useReducer(reducer, initialize, (initial) => {
    const saved = localStorage.getItem("hoops-game");
    return saved ? JSON.parse(saved) : initial;
  });

  useEffect(() => {
    localStorage.setItem("hoops-game", JSON.stringify(state));
  }, [state]);

  const [players, setPlayers] = useState([]);
  const [pastGames, setPastGames] = useLocalStorage("hoop-past-games", []);
  // small helper
  function handleResetGame() {
    if (state.home > 0 || state.away > 0) {
      setPastGames([
        ...pastGames,
        {
          home: state.home,
          away: state.away,
          date: Date.now(),
        },
      ]);
    }
    dispatch({ type: "RESET_GAME" });
  }
  function handleAddPlayer(player) {
    setPlayers([...players, player]);
  }
  function handleDeletePlayer(id) {
    setPlayers(players.filter((p) => p.id !== id));
  }

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      <nav>
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Scoreboard
        </NavLink>
        <NavLink
          to="/roster"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Roster
        </NavLink>
        <NavLink
          to="/statistics"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Statistics
        </NavLink>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              state={state}
              dispatch={dispatch}
              onResetGame={handleResetGame}
            />
          }
        />
        <Route
          path="/roster"
          element={
            <div className="container">
              <PlayerForm onAdd={handleAddPlayer} />
              <Roster players={players} onDelete={handleDeletePlayer} />
            </div>
          }
        />
        <Route
          path="/statistics"
          element={<Statistics pastGames={pastGames} />}
        />
      </Routes>
    </GameContext.Provider>
  );
}
