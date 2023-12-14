export default function LogList({ logs }) {
  return (
    <ul id="log">
      {logs.map((log, i) => (
        <li key={i}>
          {log.symbol} selected {log.row} {log.col}
        </li>
      ))}
    </ul>
  );
}
