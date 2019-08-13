import React from 'react';
import Modal from 'react-modal';

import './BoardModal.scss';

interface Props {
    modalIsOpen: boolean;
    openModal: any;
    closeModal: any;
}

const BoardModal = (props: Props): JSX.Element => {

        return (
            <div className="boardmodal">
              <Modal
                isOpen={props.modalIsOpen}
                onRequestClose={()=>props.closeModal()}
                className="boardmodal__modal"
              >
                <h3 className="boardmodal__header">Create new board</h3>
                <div className="boardmodal__header boardmodal__header--close" onClick={()=>props.closeModal()}>X</div>
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

export default BoardModal;