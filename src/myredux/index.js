import Store from './Store';

function createStore(updaters, defaultState) {
  const store = new Store(defaultState);
  store.setUpdates(updaters);
  return store;
}

function useMiddleware(store, middles) {
  middles.reverse();
  middles.forEach((middle) => {
    let next = store.dispatch;
    store.dispatch = middle(store)(next.bind(store));
  });
  return store;
}

export {createStore, useMiddleware};
