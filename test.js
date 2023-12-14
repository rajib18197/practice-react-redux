import createStore from "./customRedux.js";

const INCREMENT = "counter/increment";
const DECREMENT = "counter/decrement";
const RESET = "counter/reset";

const increment = function (value) {
  return { type: INCREMENT, payload: value };
};

const decrement = function (value) {
  return { type: DECREMENT, payload: value };
};

const reset = function () {
  return { type: RESET };
};

const initialState = {
  counter: 0,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        counter: {
          ...state.counter,
          counter: state.counter + action.payload,
        },
      };

    case DECREMENT:
      return { ...state, counter: state.counter.counter - action.payload };

    case RESET:
      return { ...state, counter: 0 };

    default:
      return state;
  }
}

// const store = createStore(reducer);

// const r = [increment(5), increment(5)].reduce(reducer, store.getState());
// console.log(r);

const initialTodoState = [
  { id: 0, text: "Learn React", completed: true },
  { id: 1, text: "Learn Redux", completed: false, color: "purple" },
  { id: 2, text: "Build something fun!", completed: false, color: "blue" },
];

function todosReducer(state = initialTodoState, action) {
  switch (action.type) {
    case "todos/todoAdded": {
      return [
        ...state,
        {
          id: Math.trunc(Math.random() * 6) + 1,
          text: action.payload,
          completed: false,
        },
      ];
    }

    default:
      return state;
  }
}

const initialStatusState = {
  status: "All",
  colors: [],
};

function filtersReducer(state = initialStatusState, action) {
  switch (action.type) {
    case "filters/statusFilterChanged": {
      return {
        ...state,
        status: action.payload,
      };
    }
    default:
      return state;
  }
}

export default function combineReducers(reducersObj) {
  return function (state, action) {
    return [action].reduce((acc, cur) => {
      const r = Object.keys(reducersObj).map((obj) => {
        const t = reducersObj[obj](state, cur);
        return { [obj]: t };
      });
      console.log(r);
      let obj = {};
      r.forEach((el, i) => {
        // console.log(Object.keys(el), Object.values(el)[0]);
        obj[Object.keys(el)[0]] = Object.values(el)[0];
      });
      console.log(obj);

      return obj;
    }, state);
  };
}

const rootReducer = combineReducers({
  todos: todosReducer,
  filters: filtersReducer,
  counter: reducer,
});

const store2 = createStore(rootReducer);
console.log(store2.getState());
// store2.dispatch({type: 'todos/todoAdded', payload: 'Applying Principles'})
// console.log(store2.getState());

const render = function () {
  console.log(store2.getState());
  countElement.textContent = store2.getState().counter.counter.toString();
};

const countElement = document.querySelector(".count");
const btnIncElement = document.querySelector(".btn-inc");
const btnDecElement = document.querySelector(".btn-dec");
const btnResetElement = document.querySelector(".btn-reset");

btnIncElement.addEventListener("click", function () {
  store2.dispatch(increment(5));
});

btnDecElement.addEventListener("click", function () {
  store2.dispatch(decrement(2));
});

btnResetElement.addEventListener("click", function () {
  store2.dispatch(reset());
});

store2.subscribe(render);
