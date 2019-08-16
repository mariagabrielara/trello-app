import React from 'react';
import './App.scss';

import Sidebar from './components/Sidebar/Sidebar';
import Board from './components/Board/Board';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface AppState {
  activeBoard: number;
  boardsList: Array<{
    id: number, 
    img: string, 
    name: string, 
    dueDate: string, 
    tasks: []
  }>;
  activeBoardData: {}
}

interface Props {
  onSetActiveBoard: typeof actions.onSetActiveBoard;
  activeBoard: number;
  boardsList: Array<{
    id: number, 
    img: string, 
    name: string, 
    dueDate: string, 
    tasks: []
  }>;
}

const actions = {
  onSetActiveBoard: (val: string) => ({type: 'SET_ACTIVE_BOARD', payload: val})
}

class App extends React.Component<Props> {

  render () {
    let content: JSX.Element = <div>NO BOARDS CREATED</div>;
    if (this.props.activeBoard !== 0) {
      content = (
        <Board 
          id={this.props.activeBoard}
          boardsList={this.props.boardsList} 
        />
      );
    } 

   // console.log(this.props);

    return (
      <div className="app">
        <Sidebar /> 
        {content}
      </div>
    );

  }

}

const mapStateToProps = (state: AppState) => ({
    activeBoard: state.activeBoard,
    boardsList: state.boardsList,
    activeBoardData: state.activeBoardData
});

const mapDispatchToProps = (dispatch: any) => ({
  ...bindActionCreators({
      ...actions,
    }, dispatch)
  });

export default connect(mapStateToProps, mapDispatchToProps)(App);
