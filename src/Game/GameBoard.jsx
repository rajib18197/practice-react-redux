import { useState } from "react";

export default function GameBoard({
  list,
  setList,
  currentActive,
  setPlayers,
  setLogs,
}) {
  console.log(list);

  function handleListClick(row, col) {
    setList((prev) => {
      const up = [...prev.map((cur) => [...cur])];
      up[row][col] = currentActive.symbol;
      return up;
    });

    setPlayers((prev) =>
      prev.map((p) =>
        p.name === currentActive.name
          ? { ...p, active: false }
          : { ...p, active: true }
      )
    );

    setLogs((prev) => [{ row, col, symbol: currentActive.symbol }, ...prev]);
  }

  return (
    <div id="game-board">
      <ol>
        {list.map((row, rowIindex) => (
          <li key={rowIindex}>
            <ol>
              {row.map((col, colIndex) => (
                <li key={colIndex}>
                  <button onClick={() => handleListClick(rowIindex, colIndex)}>
                    {col}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  );
}
