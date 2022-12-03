import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './app.css';
import AppRouter from './AppRouter';

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <AppRouter />
      </div>
    </BrowserRouter>

  );
}

export default App;
