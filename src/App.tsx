import React from 'react';
import './App.scss';

import Sidebar from './components/Sidebar/Sidebar';
import Board from './components/Board/Board';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface AppState {
  activeBoard: string;
  boardsList: Array<{}>;
}

interface Props {
  onSetActiveBoard: typeof actions.onSetActiveBoard;
  activeBoard: string;
  boardsList: Array<{}>;
}

const actions = {
  onSetActiveBoard: (val: string) => ({type: 'SET_ACTIVE_BOARD', payload: val})
}

class App extends React.Component<Props> {

  render () {
    return (
      <div className="app">
        <Sidebar /> 
        <label>{this.props.boardsList.length.toString()}</label>
        <button onClick={()=>this.props.onSetActiveBoard(this.props.boardsList.length.toString())}>CLICK</button>
      </div>
    );

  }

}

const mapStateToProps = (state: AppState) => ({
    activeBoard: state.activeBoard,
    boardsList: state.boardsList
})

const mapDispatchToProps = (dispatch: any) => ({
  ...bindActionCreators({
      ...actions,
    }, dispatch)
  });

export default connect(mapStateToProps, mapDispatchToProps)(App);
