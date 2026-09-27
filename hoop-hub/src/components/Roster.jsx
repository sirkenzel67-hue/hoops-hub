export default function Roster({ players, onDelete }) {
  return (
    <div>
      <h1>Roster</h1>
      {players.length === 0 && <p>No players yet.</p>}
      <ul className="roster-list">
        {players.map((p) => (
          <li key={p.id} className="roster-row">
            <div className="roster-info">
              {p.photo ? (
                <img src={p.photo} alt={p.name} className="roster-photo" />
              ) : (
                <div className="roster-photo roster-photo-placeholder" />
              )}
              <span className="roster-name">{p.name}</span>
            </div>
            <button onClick={() => onDelete(p.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}