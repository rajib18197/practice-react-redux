const createStore = function (reducer) {
  let state = reducer(undefined, {});
  const subscribedComponents = [];

  return {
    getState() {
      return state;
    },

    dispatch(action) {
      const newState = reducer(this.getState(), action);
      state = newState;

      subscribedComponents.forEach((component) => component());
    },

    subscribe(component) {
      subscribedComponents.push(component);
      console.log(subscribedComponents);
      component();
    },
  };
};

export default createStore;
