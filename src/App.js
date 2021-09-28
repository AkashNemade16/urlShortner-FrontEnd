import React,{useEffect} from 'react';
import { persistStore, persistReducer } from 'redux-persist'
import Home from './Components/Home/Home';
import { Provider, } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { PersistGate } from 'redux-persist/integration/react';
import { loadUser } from './actions/authActions';

const store = createStore(reducers, compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
const persistor = persistStore(store)

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser())
  })
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Home />
      </PersistGate>
    </Provider>
  )
}

export default App;
