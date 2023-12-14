// import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./Investment-calculator/App";
// import App from "./practice-Job/App";
// import { Provider } from "react-redux";
// import store from "./practice-Job/store/store";
// import Game from "./Game/Game";
// import CabinTable from "./Table-Practice/CabinTable";
// import App from "./reselect/App";
// import { Provider } from "react-redux";
// import store from "./reselect/store";
// import App from "./App.jsx";
// import '../src/Experiment/styles.css';
import { Provider } from "react-redux";
// import App from "./Blog-App/App";
// import store from "./Blog-App/store/store";
// import App from "./Experiment/App";
// import store from "./Experiment/store/store";
// import App from "./optimization/App";
// import { store } from "./optimization/store/store";
// import Editor from "./Experiment/features/editor/Editor";
// import App from "./Chat-App/App";
// import store from "./Chat-App/store/store";
// import App from "./Product-App/App";
// import store from "./Product-App/store/store";
// import App from "./Task-Management-App/App";
// import store from "./Task-Management-App/store/store";
// import App from "./Blog-App/App";
// import store from "./Blog-App/store/store";
// import App from "./book-store/App.jsx";
// import store from "./book-store/store/store.js";
import store from "./store/store.js";
import App from "./App.jsx";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   // <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   // </React.StrictMode>
// );

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   // <Provider store={store}>
//   // <App />
//   // <CabinTable />
//   <Provider store={store}>
//   <App />
//   </Provider>
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
  // <Game />
  // <App />
);
