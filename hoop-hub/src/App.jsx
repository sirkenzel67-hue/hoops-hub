// import { useState } from "react";
// import ScoreBoard from "./components/ScoreBoard";

// export default function App() {
//   const [homeScore, setHomeScore] = useState(0);
//   const [awayScore, setAwayScore] = useState(0);
//   const [quarter, setQuarter] = useState(1);

//   return (
//     <div className="container">
//       <div className="home">
//         <h1>Home Team</h1>
//         <ScoreBoard score={homeScore} setScore={setHomeScore} />
//         {/* one more undo option */}
//       </div>
//       <div className="away">
//         <h1>Away Team</h1>
//         <ScoreBoard score={awayScore} setScore={setAwayScore} />
//       </div>

//       <div className="resetscore">
//         <button
//           onClick={() => {
//             setHomeScore(0);
//             setAwayScore(0);
//           }}
//         >
//           Reset Score
//         </button>
//       </div>
//       <div className="quater">
//         <h1>Quarter: {quarter}</h1>
//         <button
//           onClick={() => {
//             if (quarter < 4) {
//               setQuarter(quarter + 1);
//             }
//           }}
//         >
//           Next Quarter
//         </button>
//       </div>
//       <div className="resetGame">
//         <button
//           onClick={() => {
//             setHomeScore(0);
//             setAwayScore(0);
//             setQuarter(1);
//           }}
//         >
//           Reset Game
//         </button>
//       </div>
//     </div>
//   )
// }

// FIRST Version
// import { useReducer } from "react";
// import ScoreBoard from "./components/ScoreBoard";

// // Reducer function lives here
// function reducer(state, action) {
//   switch (action.type) {
//     case "add":
//       return { count: state.count + action.amount };
//     case "reset":
//       return { count: 0 };
//     default:
//       return state;
//   }
// }

// export default function App() {
//   const [state, dispatch] = useReducer(reducer, { count: 0 });

//   return (
//     <>
//       <p>{state.count}</p>
//       <button onClick={() => dispatch({ type: "add", amount: 1 })}>+1</button>
//       <button onClick={() => dispatch({ type: "add", amount: 2 })}>+2</button>
//       <button onClick={() => dispatch({ type: "add", amount: 3 })}>+3</button>
//       <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
//       <ScoreBoard state={state} dispatch={dispatch} />
//     </>
//   );
// }
//Second version
// import { useEffect, useReducer } from "react";
// import ScoreBoard from "./components/ScoreBoard";
// import "./index.css";
// import { GameContext } from "./GameContext";
// import { Routes, Route } from "react-router-dom";

// function reducer(state, action) {
//   switch (action.type) {
//     case "ADD_POINTS":
//       return {
//         ...state,
//         [action.team]: state[action.team] + action.points,
//         history: [
//           ...state.history,
//           { home: state.home, away: state.away, quarter: state.quarter },
//         ],
//       };

//     case "NEXT_QUARTER":
//       return {
//         ...state,
//         quarter: state.quarter < 4 ? state.quarter + 1 : state.quarter,
//       };
//     case "RESET_SCORE":
//       return { ...state, home: 0, away: 0, history: [] };
//     case "RESET_GAME":
//       return { home: 0, away: 0, quarter: 1, history: [] };
//     default:
//       return state;
//     case "UNDO":
//       if (state.history.length === 0) return state;
//       const prev = state.history[state.history.length - 1];
//       return {
//         ...prev,
//         history: state.history.slice(0, -1),
//       }

//     default:
//      return state;
// }
// }

// function Home({ state, dispatch }) {
//   return (
//     <div className="container">
//       <h1>Quarter: {state.quarter}</h1>
//       <button onClick={() => dispatch({ type: "NEXT_QUARTER" })}>Next Quarter</button>
//       <button onClick={() => dispatch({ type: "RESET_SCORE" })}>Reset Scores</button>
//       <button onClick={() => dispatch({ type: "RESET_GAME" })}>Reset Game</button>
//       <button onClick={() => dispatch({ type: "UNDO" })}>Undo</button>
//       <ScoreBoard team="home" />
//       <ScoreBoard team="away" />
//     </div>
//   );
// }

// //added
// function Roster(){
//   return <h1>Roster</h1>
// }

// export default function App() {
//   const initialize = { home: 0, away: 0, quarter: 1, history: [] };
//   const [state, dispatch] = useReducer(reducer, initialize, (initial) => {
//     const saved = localStorage.getItem("hoops-game");
//     return saved ? JSON.parse(saved) : initial;
//   });
//   useEffect(() => {
//     localStorage.setItem("hoops-game", JSON.stringify(state));
//   }, [state]);

//   return (
//     <GameContext.Provider value={{ state, dispatch }}>
//       <div className="container">
//         <h1>Quarter: {state.quarter}</h1>
//         <button onClick={() => dispatch({ type: "NEXT_QUARTER" })}>
//           Next Quarter
//         </button>
//         <button onClick={() => dispatch({ type: "RESET_SCORE" })}>
//           Reset Scores
//         </button>
//         <button onClick={() => dispatch({ type: "RESET_GAME" })}>
//           Reset Game
//         </button>
//         <button onClick={() => dispatch({ type: "UNDO" })}>Undo</button>
//         <ScoreBoard team="home" />
//         <ScoreBoard team="away" />
//       </div>
//       <Routes>
//   <Route path="/" element={<Home />} />
//   <Route path="/roster" element={<Roster />} />
//   <Route path="/player/:id" element={<PlayerPage />} />
// </Routes>;
//     </GameContext.Provider>
//   );
// }
// third versino with roster page
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
