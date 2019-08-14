import React from 'react';
import './App.scss';

import Sidebar from './components/Sidebar/Sidebar';
import Board from './components/Board/Board';
import DragDropComponent from './components/DragDropComponent/DragDropComponent';
import Panel from './components/Panel/Panel';
import Task from './components/Task/Task';

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
