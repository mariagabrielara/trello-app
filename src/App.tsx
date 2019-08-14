import React from 'react';
import './App.scss';

import Sidebar from './components/Sidebar/Sidebar';
import Board from './components/Board/Board';

interface AppState {
  activeBoard: JSX.Element;
}

class App extends React.Component<{}, AppState> {
  activeBoard = 
    <Board 
      boardName="Board "
      boardDueDate="01-10-2019"
    />;

  render () {
    return (
      <div className="app">
        <Sidebar /> 
        {this.activeBoard}
      </div>
    );
  }
}

export default App;
