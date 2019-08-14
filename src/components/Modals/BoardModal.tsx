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
  todos: Array<Task>,
  inprogress: Array<Task>,
  done: Array<Task>
}

interface Task {
  taskId: number,
  category: string,
  taskName: string,
  taskDueDate: string,
  taskStatus: string
}

interface BoardModalState {
<<<<<<< HEAD
  boardsList: Array<Board>;
  newBoardName: string;
  newBoardImg: string;
  newBoardDueDate: string;
}

interface Props {
    boardsList: Array<Board>;
=======
  boardsList: Array<{}>;
}

interface Props {
>>>>>>> parent of 042f5a01... Creates board, adds it to the global state and sets activeBoard variable at global state
    modalIsOpen: boolean;
    openModal: any;
    closeModal: any;
    onCreateNewBoard: typeof actions.onCreateNewBoard;
}

const actions = {
<<<<<<< HEAD
  onCreateNewBoard: (val: Board) => ({type: 'CREATE_NEW_BOARD', payload: val})
=======
  onCreateNewBoard: (val: {img: string, name: string, dueDate: string}) => ({type: 'CREATE_NEW_BOARD', payload: val})
>>>>>>> parent of 042f5a01... Creates board, adds it to the global state and sets activeBoard variable at global state
}

class BoardModal extends React.Component<Props, BoardModalState> {
    render () {
      return (
        <div className="boardmodal">
          <Modal
            isOpen={this.props.modalIsOpen}
            onRequestClose={()=>this.props.closeModal()}
            className="boardmodal__modal"
          >
            <h3 className="boardmodal__header">Create new board</h3>
            <div className="boardmodal__header boardmodal__header--close" onClick={()=>this.props.closeModal()}>X</div>
            <form className="boardmodal__form">
              <input className="boardmodal__text-input" type="text" id="board-name" placeholder="Board Name" />
              <input className="boardmodal__date-input" type="date" id="board-due-date" />
              <input className="boardmodal__img-input" type="file" id="board-img" accept="image/*" />
              <button 
                className="boardmodal__button" 
                onClick={()=>{
                  this.props.closeModal();
                  return this.props.onCreateNewBoard(
                    {
                      img: 'https://storage.googleapis.com/davivienda_tarjetas_virtual_imgs/alejandro_pineda.png', 
                      name: "Super Board", 
                      dueDate: "01-01-19"
                    }
                  )
                }}
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