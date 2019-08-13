import React from 'react';
import Modal from 'react-modal';

import './BoardModal.scss';

interface BoardModalState {
    modalIsOpen: boolean;
}

class BoardModal extends React.Component<{}, BoardModalState> {

    initState() {
        this.setState({
          modalIsOpen: true
        });
    }
    
    componentWillMount() {
        this.initState();
    }

    openModal() {
        this.setState({
            modalIsOpen: true
        });
    }
     
    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    render() {
        return (
            <div className="boardmodal">
              <button onClick={()=>this.openModal()}>Open Modal</button>
              <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={()=>this.closeModal()}
                className="boardmodal__modal"
              >
                <h3 className="boardmodal__header">Create new board</h3>
                <div className="boardmodal__header boardmodal__header--close" onClick={()=>this.closeModal()}>X</div>
                <form className="boardmodal__form">
                  <input className="boardmodal__text-input" type="text" name="board-name" placeholder="Board Name" />
                  <input className="boardmodal__date-input" type="date" name="board-due-date" />
                  <input className="boardmodal__img-input" type="file" name="board-img" accept="image/*" />
                  <button className="boardmodal__button">+ Create Board</button>
                </form>
              </Modal>
            </div>
          );
    }
}

export default BoardModal;