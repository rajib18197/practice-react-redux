import { useState } from "react";
import "./styles.css";
import Header from "./Header";
import PlayerContainer from "./PlayerContainer";
import LogList from "./LogList";
import GameBoard from "./GameBoard";

export default function Game() {
  const [players, setPlayers] = useState([
    { name: "Player 1", symbol: "X", active: false },
    { name: "Player 2", symbol: "O", active: false },
  ]);
  const [list, setList] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  const [logs, setLogs] = useState([]);
  console.log(logs);

//   let logList = list.find(li => li.find(el => el !== null ? {}))
  const logList = list.reduce((acc, cur, i) => {
    const t = cur.map((el, index) => el !== null ? {row: i, col: index, symbol: el }: {})
    // console.log(t);
    return [...t.filter(el => Boolean(el.row)), ...acc]
  }, [])
  console.log(logList);
  const [hasGameStart, setHasGameStart] = useState(false);

  const currentActive = players.find((pl) => pl.active === true);
  console.log(currentActive);

  function handleStartGame() {
    setHasGameStart(true);
    setPlayers((prev) => {
      const updatedPlayers = prev.map((p) => ({ ...p }));
      updatedPlayers[0].active = true;
      console.log(updatedPlayers);
      return updatedPlayers;
    });
  }

  return (
    <>
      <Header />
      <StartGame onStart={handleStartGame} />
      {hasGameStart && (
        <Main>
          <PlayerContainer players={players} />
          <GameBoard
            list={list}
            setList={setList}
            currentActive={currentActive}
            setPlayers={setPlayers}
            setLogs = {setLogs}
          />
        </Main>
      )}
      <LogList logs={logs} />
    </>
  );
}

function Main({ children }) {
  return <main id="game-container">{children}</main>;
}

function StartGame({ onStart }) {
  return (
    <button style={{ color: "#121212" }} onClick={onStart}>
      Start
    </button>
  );
}
