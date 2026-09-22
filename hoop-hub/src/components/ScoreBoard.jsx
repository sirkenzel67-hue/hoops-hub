// FIST version
// export default function ScoreBoard({ state, dispatch }) {
//   return (
//     <div>
//       <h2>ScoreBoard Component</h2>
//       <p>Count: {state.count}</p>
//       <button onClick={() => dispatch({ type: "add", amount: 1 })}>+1</button>
//       <button onClick={() => dispatch({ type: "add", amount: 2 })}>+2</button>
//       <button onClick={() => dispatch({ type: "add", amount: 3 })}>+3</button>
//       <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
//     </div>
//   );
// }

// export default function ScoreBoard({ team, score, dispatch }) {
//   return (
//     <div>
//       <h2>{team.toUpperCase()} Score: {score}</h2>
//       <button onClick={() => dispatch({ type: "ADD_POINTS", team, points: 1 })}>+1</button>
//       <button onClick={() => dispatch({ type: "ADD_POINTS", team, points: 2 })}>+2</button>
//       <button onClick={() => dispatch({ type: "ADD_POINTS", team, points: 3 })}>+3</button>
//     </div>
//   );
// }


export default function ScoreBoard({team, score, dispatch}) {
   

  return (
    <>
     <h1>Score Board for team {team} score: {score}</h1>
     <button onClick={() => dispatch({type: "ADD_POINTS", team, points: 1})}>+1</button>
     <button onClick={() => dispatch({type: "ADD_POINTS", team, points: 2})}>+2</button>
     <button onClick={() => dispatch({type: "ADD_POINTS", team, points: 3})}>+3</button>

    </>
  )
}
