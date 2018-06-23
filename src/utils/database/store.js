import { createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import reducers from "./reducers/index";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);
let store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
let persistor = persistStore(store);

persistStore(store);

export default { store, persistor };
