import React from 'react';

import DiagramView from '../components/DiagramDesigner/DiagramView';
import { Provider } from 'react-redux';

export default function App() {
    return (
      // <Provider store={store}>
          <DiagramView />
      // </Provider>
    );
}
