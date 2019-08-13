import React from 'react';
import './App.scss';

import Sidebar from './components/Sidebar/Sidebar';
import Board from './components/Board/Board';
import BoardModal from './components/BoardModal/BoardModal';

const App: React.FC = () => {
  return (
    <div className="app">
      <Sidebar /> 
      <Board 
        boardName="Board 1"
        boardDueDate="01-10-2019"
      />
      <BoardModal />
    </div>
  );
}

export default App;
