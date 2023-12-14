import Player from "./Player";

export default function PlayerContainer({players}) {
  return (
    <ul id="players" className="highlight-player">
      {players.map((player) => (
        <Player key={player.name} player={player} />
      ))}
    </ul>
  );
}
