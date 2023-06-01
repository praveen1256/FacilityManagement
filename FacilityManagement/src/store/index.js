import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { axiosClient } from '../networking/index';
import { rootReducer } from '../reducers/index';
import localStorage from 'redux-persist/es/storage';

const persistConfig = {
  key: 'root',
  storage: localStorage,
  blacklist: ['error', 'status'],
};

export const store = createStore(
  persistReducer(persistConfig, rootReducer),
  applyMiddleware(thunk.withExtraArgument({ axiosClient, demoMode: true }))
);

export const persistor = persistStore(store);
