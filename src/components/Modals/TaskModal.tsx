import React from 'react';
import Modal from 'react-modal';

import './TaskModal.scss';

interface Props {
    taskModalIsOpen: boolean;
    openModal: any;
    closeModal: any;
}

const TaskModal = (props: Props): JSX.Element => {

        return (
            <div className="taskmodal">
              <Modal
                isOpen={props.taskModalIsOpen}
                onRequestClose={()=>props.closeModal()}
                className="taskmodal__modal"
              >
                <h3 className="taskmodal__header">Create new task</h3>
                <div className="taskmodal__header taskmodal__header--close" onClick={()=>props.closeModal()}>X</div>
                <form className="taskmodal__form">
                  <input className="taskmodal__text-input" type="text" name="task-name" placeholder="Category" />
                  <input className="taskmodal__text-input" type="text" name="task-name" placeholder="Name" />
                  <input className="taskmodal__date-input" type="date" name="task-due-date" />
                  <input className="taskmodal__text-input" type="text" name="task-status" placeholder="Status" />
                  <button className="taskmodal__button">+ Add Task</button>
                </form>
              </Modal>
            </div>
          );
}

export default TaskModal;