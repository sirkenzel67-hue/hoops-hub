import { useState } from "react";
import ScoreBoard from "./components/ScoreBoard";

export default function App() {
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [quarter, setQuarter] = useState(1);

  return (
    <div className="container">
      <div className="home">
        <h1>Home Team</h1>
        <ScoreBoard score={homeScore} setScore={setHomeScore} />
        {/* one more undo option */}
      </div>
      <div className="away">
        <h1>Away Team</h1>
        <ScoreBoard score={awayScore} setScore={setAwayScore} />
      </div>
      
      <div className="resetscore">
        <button
          onClick={() => {
            setHomeScore(0);
            setAwayScore(0);
          }}
        >
          Reset Score
        </button>
      </div>
      <div className="quater">
        <h1>Quarter: {quarter}</h1>
        <button
          onClick={() => {
            if (quarter < 4) {
              setQuarter(quarter + 1);
            }
          }}
        >
          Next Quarter
        </button>
      </div>
      <div className="resetGame">
        <button
          onClick={() => {
            setHomeScore(0);
            setAwayScore(0);
            setQuarter(1);
          }}
        >
          Reset Game
        </button>
      </div>
    </div>
  )
}
