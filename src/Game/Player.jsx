import { useState } from "react";

export default function Player({ player }) {
  const [isUpdateSession, setIsUpdateSession] = useState(false);
  const [playerName, setPlayerName] = useState(player.name);

  function handleUpdateClick() {
    setIsUpdateSession((update) => !update);
  }

  function handleEnter(e) {
    if (e.key === "Enter") {
      setIsUpdateSession(false);
    }
  }

  return (
    <li className={`player ${player.active ? 'active': ''}`} key={player.symbol}>
      {isUpdateSession ? (
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          onKeyUp={handleEnter}
        />
      ) : (
        <h3 className="player-name">{playerName}</h3>
      )}
      <span className="player-symbol">{player.symbol}</span>
      <button onClick={handleUpdateClick}>
        {isUpdateSession ? "Save" : "Update"}
      </button>
    </li>
  );
}
