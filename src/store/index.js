import { createStore } from 'redux';

export const store = createStore((state, action) => {
  if (action.type === 1) {
    return 2;
  } else if (action.type === 2) {
    return 3;
  }
});

store.subscribe(() => {
  console.log(store.getState());
});

export default store;

