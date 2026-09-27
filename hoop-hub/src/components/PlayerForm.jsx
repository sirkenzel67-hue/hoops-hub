import { useState } from "react";

export function PlayerForm({onAdd}) {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    {if(!name.trim()) return;}
    onAdd({ id: Date.now(), name, photo })
    setName("");
    setPhoto(null);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Player name | Role"
      />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {photo && <img src={photo} alt="preview" width={80} />}
      <button type="submit">Add Player</button>
    </form>
  );
}
