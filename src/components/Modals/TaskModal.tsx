import React from 'react';
import Modal from 'react-modal';

import './TaskModal.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface GlobalState {
  activeBoard: number;
  boardsList: Array<BoardStructure>;
}

interface TaskModalState {
  currentBoard: BoardStructure;
  newTaskCategory: string;
  newTaskName: string;
  newTaskDueDate: string;
  newTaskStatus: string;
}

const actions = {
  onCreateNewTask: (val: {task: Task, panel: string}) => ({type: 'CREATE_NEW_TASK', payload: val})
}

interface Props {
    taskModalIsOpen: boolean;
    openModal: any;
    closeModal: any;
    board: BoardStructure;
    onCreateNewTask: typeof actions.onCreateNewTask;
}

interface Task {
  taskId: number,
  category: string,
  taskName: string,
  taskDueDate: string,
  taskStatus: string
}

interface BoardStructure {
  id: number, 
  img: string, 
  name: string, 
  dueDate: string, 
  todos: Array<Task>,
  inprogress: Array<Task>,
  done: Array<Task>
}

class TaskModal extends React.Component<Props, TaskModalState> {

  constructor(props: Props) {
    super(props);
    this.state = {
      currentBoard: this.props.board,
      newTaskCategory: 'Task Category',
      newTaskName: 'Task Name',
      newTaskDueDate: 'Task Date',
      newTaskStatus: 'Task Status'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.props.closeModal();
    return this.props.onCreateNewTask(
      {
        task: {
          taskId: Math.random(),
          category: this.state.newTaskCategory,
          taskName: this.state.newTaskName,
          taskDueDate: this.state.newTaskDueDate,
          taskStatus: this.state.newTaskStatus
        },
        panel: 'todos'
      }
    )
  }

  render () {
    return (
      <div className="taskmodal">
        <Modal
          isOpen={this.props.taskModalIsOpen}
          onRequestClose={()=>this.props.closeModal()}
          className="taskmodal__modal"
          ariaHideApp={false}
        >
          <h3 className="taskmodal__header">Create new task</h3>
          <div className="taskmodal__header taskmodal__header--close" onClick={()=>this.props.closeModal()}>X</div>
          <form className="taskmodal__form">
            <input className="taskmodal__text-input" type="text" name="task-category" placeholder="Category" />
            <input className="taskmodal__text-input" type="text" name="task-name" placeholder="Name" />
            <input className="taskmodal__date-input" type="date" name="task-due-date" />
            <input className="taskmodal__text-input" type="text" name="task-status" placeholder="Status" />
            <button 
                type="button"
                className="taskmodal__button" 
                onClick={this.handleSubmit}
              >
              + Add Task
            </button>
          </form>
        </Modal>
      </div>
    );
  }     
}

const mapStateToProps = (state: GlobalState) => ({
  activeBoard: state.activeBoard,
  boardsList: state.boardsList
})

const mapDispatchToProps = (dispatch: any) => ({
...bindActionCreators({
    ...actions,
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskModal);