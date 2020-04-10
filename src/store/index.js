import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from './reducers'; // the value from combineReducers
import middleware from './middleware'

const persistConfig = {
 key: 'root',
 storage: storage,
};

const pReducer = persistReducer(persistConfig, reducers);

export const store = createStore(pReducer, middleware);
export const persistor = persistStore(store);