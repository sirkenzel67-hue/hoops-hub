import { useMemo } from "react";
import { useGame } from "../useGame";

export default function Statistics({ pastGames }) {
  const { state } = useGame();

  const stats = useMemo(() => {
    const totals = { home: 0, away: 0 };
    const byQuarter = {};
    const shotCounts = {
      home: { 1: 0, 2: 0, 3: 0 },
      away: { 1: 0, 2: 0, 3: 0 },
    };

    state.history.forEach((entry) => {
      totals[entry.team] += entry.points;
      if (!byQuarter[entry.quarter])
        byQuarter[entry.quarter] = { home: 0, away: 0 };
      byQuarter[entry.quarter][entry.team] += entry.points;
      shotCounts[entry.team][entry.points]++;
    });

    return { totals, byQuarter, shotCounts };
  }, [state.history]);

  // NEW: derived from stats.totals, only recomputes when totals actually change
  const leader = useMemo(() => {
    const diff = stats.totals.home - stats.totals.away;
    if (diff === 0) return "Tied game";
    return diff > 0 ? `Home leads by ${diff}` : `Away leads by ${-diff}`;
  }, [stats.totals]);

  return (
    <div className="container">
      <h1>Statistics</h1>
      <p className="leader-banner">{leader}</p>

      <h2>Total Points</h2>
      <div className="stat-cards">
        <div className="stat-card home">
          <div className="label">Home</div>
          <div className="value">{stats.totals.home}</div>
        </div>
        <div className="stat-card away">
          <div className="label">Away</div>
          <div className="value">{stats.totals.away}</div>
        </div>
      </div>
      <div className="stats-section">
        <h2>Points per Quarter</h2>
        <table>
          <thead>
            <tr>
              <th>Q</th>
              <th>Home</th>
              <th>Away</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(stats.byQuarter).map(([q, s]) => (
              <tr key={q}>
                <td>{q}</td>
                <td>{s.home}</td>
                <td>{s.away}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="stats-section">
        <h2>Shots Made (misses not tracked yet)</h2>
        <table>
          <thead>
            <tr>
              <th>Team</th>
              <th>1PT</th>
              <th>2PT</th>
              <th>3PT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Home</td>
              <td>{stats.shotCounts.home[1]}</td>
              <td>{stats.shotCounts.home[2]}</td>
              <td>{stats.shotCounts.home[3]}</td>
            </tr>
            <tr>
              <td>Away</td>
              <td>{stats.shotCounts.away[1]}</td>
              <td>{stats.shotCounts.away[2]}</td>
              <td>{stats.shotCounts.away[3]}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="stats-section">
        <h2>Past Games</h2>
        {pastGames.length === 0 ? (
          <p>No past games yet.</p>
        ) : (
          <ul>
            {pastGames.map((g) => (
              <li key={g.date}>
                Home {g.home} – Away {g.away}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
