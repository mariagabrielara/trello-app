import React from 'react';
import './App.scss';

import Sidebar from './components/Sidebar/Sidebar';
import Board from './components/Board/Board';

const App: React.FC = () => {
  return (
    <div className="app">
      <Sidebar /> 
      <Board 
        boardName="Board 1"
        boardDueDate="01-10-2019"
      />
    </div>
  );
}

export default App;
