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
    todos: [],
    inprogress: [],
    done: []
  }>;
}

interface Props {
  onSetActiveBoard: typeof actions.onSetActiveBoard;
  activeBoard: number;
  boardsList: Array<{
    id: number, 
    img: string, 
    name: string, 
    dueDate: string, 
    todos: [],
    inprogress: [],
    done: []
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

    return (
      <div className="app">
        <Sidebar /> 
        {/*<label>{this.props.boardsList.length.toString()}</label>
        <button onClick={()=>this.props.onSetActiveBoard(this.props.boardsList.length.toString())}>CLICK</button>*/}
        {content}
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
