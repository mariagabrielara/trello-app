import React from 'react';
import Modal from 'react-modal';

import './BoardModal.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface Board {
  id: number, 
  img: string, 
  name: string, 
  dueDate: string, 
  tasks: Array<Task>
}

interface Task {
  taskId: number,
  category: string,
  taskName: string,
  taskDueDate: string,
  taskStatus: string
}

interface BoardModalState {
  boardsList: Array<Board>;
  newBoardName: string;
  newBoardImg: string;
  newBoardDueDate: string;
}

interface Props {
    boardsList: Array<Board>;
    modalIsOpen: boolean;
    openModal: any;
    closeModal: any;
    onCreateNewBoard: typeof actions.onCreateNewBoard;
}

const actions = {
  onCreateNewBoard: (val: Board) => ({type: 'CREATE_NEW_BOARD', payload: val})
}

class BoardModal extends React.Component<Props, BoardModalState> {

    constructor(props: Props) {
      super(props);
      this.state = {
        boardsList: this.props.boardsList,
        newBoardName: 'Board Name',
        newBoardImg: 'https://storage.googleapis.com/davivienda_tarjetas_virtual_imgs/alejandro_pineda.png',
        newBoardDueDate: '01-01-20'
      };
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
      this.props.closeModal();
      return this.props.onCreateNewBoard(
        {
          id: this.props.boardsList.length + 1,
          img: this.state.newBoardImg, 
          name: `${this.state.newBoardName} ${this.props.boardsList.length + 1}`, 
          dueDate: this.state.newBoardDueDate,
          tasks: []
        }
      )
    }

    render () {
      return (
        <div className="boardmodal">
          <Modal
            isOpen={this.props.modalIsOpen}
            onRequestClose={()=>this.props.closeModal()}
            className="boardmodal__modal"
            ariaHideApp={false}
          >
            <h3 className="boardmodal__header">Create new board</h3>
            <div className="boardmodal__header boardmodal__header--close" onClick={()=>this.props.closeModal()}>X</div>
            <form className="boardmodal__form">
              <input className="boardmodal__text-input" type="text" name="boardName" placeholder="Board Name" 
                onChange={(e)=>this.setState({newBoardImg: e.target.value})} value={this.state.newBoardName}/>
              <input className="boardmodal__date-input" type="date" id="board-due-date" />
              <input className="boardmodal__img-input" type="file" id="board-img" accept="image/*" />
              <button 
                type="button"
                className="boardmodal__button" 
                onClick={this.handleSubmit}
                >
                + Create Board
              </button>
            </form>
          </Modal>
        </div>
      );
    }   
}


const mapStateToProps = (state: BoardModalState) => ({
  boardsList: state.boardsList
})

const mapDispatchToProps = (dispatch: any) => ({
...bindActionCreators({
    ...actions,
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardModal);