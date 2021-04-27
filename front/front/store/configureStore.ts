import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { useDispatch } from 'react-redux';
import logger from 'redux-logger';
import rootReducer from '../slices/index';

const reducer = rootReducer;

const isDev = process.env.NODE_ENV === 'development';

const createStore = () => {
  const middleware = getDefaultMiddleware();
  if (isDev) {
    middleware.push(logger);
  }

  const store = configureStore({
    reducer,
    middleware,
    devTools: isDev,
  });

  return store;
};

const wrapper = createWrapper(createStore, {
  debug: isDev,
});

// export type AppDispatch = typeof createStore.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();

export default wrapper;
