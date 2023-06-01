import React from 'react';
import { RootNavigator } from './navigation';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <RootNavigator/>
    </Provider>
  );
}

export default App;
