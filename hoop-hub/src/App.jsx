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
import { useReducer } from "react";
import ScoreBoard from "./components/ScoreBoard";

function reducer(state, action) {
  switch (action.type) {
    case "ADD_POINTS":
      return { ...state, [action.team]: state[action.team] + action.points };
    case "NEXT_QUARTER":
      return {
        ...state,
        quarter: state.quarter < 4 ? state.quarter + 1 : state.quarter,
      };
    case "RESET_SCORE":
      return { ...state, home: 0, away: 0 };
    case "RESET_GAME":
      return { home: 0, away: 0, quarter: 1 };
    default:
      return state;
  }
}
export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    home: 0,
    away: 0,
    quarter: 1,
  });

  return (
    <div className="container">
      <h1>Quarter: {state.quarter}</h1>
      <button onClick={() => dispatch({ type: "NEXT_QUARTER" })}>
        Next Quarter
      </button>
      <button onClick={() => dispatch({ type: "RESET_SCORE" })}>
        Reset Scores
      </button>
      <button onClick={() => dispatch({ type: "RESET_GAME" })}>
        Reset Game
      </button>
      {/* Pass each team’s score + dispatch */}
      <ScoreBoard team="home" score={state.home} dispatch={dispatch} />
      <ScoreBoard team="away" score={state.away} dispatch={dispatch} />
    </div>
  );
}
