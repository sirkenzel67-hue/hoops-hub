export default function ScoreBoard({ score, setScore }) {
  return (
    <div>
      <h1>Score: {score}</h1>
      <button onClick={() => setScore(prev => prev + 1)}>+1</button>
      <button onClick={() => setScore(prev => prev + 2)}>+2</button>
      <button onClick={() => setScore(prev => prev + 3)}>+3</button>
    </div>
  );
}
