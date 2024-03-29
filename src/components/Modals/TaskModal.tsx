import React from 'react';
import Modal from 'react-modal';

import './TaskModal.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface GlobalState {
  activeBoard: number;
  boardsList: Array<BoardStructure>;
  activeBoardData: {
    id: number, 
    img: string, 
    name: string, 
    dueDate: string, 
    tasks: []
  };
}

interface TaskModalState {
  currentBoard: BoardStructure;
  newTaskCategory: string;
  newTaskName: string;
  newTaskDueDate: string;
  newTaskStatus: string;
}

interface Props {
    taskModalIsOpen: boolean;
    openModal: any;
    closeModal: any;
    board: BoardStructure;
    onCreateNewTask: typeof actions.onCreateNewTask;
    activeBoardData: {
      id: number, 
      img: string, 
      name: string, 
      dueDate: string, 
      tasks: []
    };
    panelType: string;
}

interface Task {
  taskId: number,
  category: string,
  taskName: string,
  taskDueDate: string,
  taskStatus: string
  taskPanel: string;
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

const actions = {
  onCreateNewTask: (val: Task) => ({type: 'CREATE_NEW_TASK', payload: val})
}

class TaskModal extends React.Component<Props, TaskModalState> {

  constructor(props: Props) {
    super(props);
    this.state = {
      currentBoard: this.props.board,
      newTaskCategory: '',
      newTaskName: '',
      newTaskDueDate: '',
      newTaskStatus: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.props.closeModal();
    return this.props.onCreateNewTask(
      {
        taskId: Math.random(),
        category: this.state.newTaskCategory,
        taskName: this.state.newTaskName,
        taskDueDate: this.state.newTaskDueDate,
        taskStatus: this.state.newTaskStatus,
        taskPanel: this.props.panelType
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
            <input 
              className="taskmodal__text-input" 
              type="text" name="task-category" 
              placeholder="Category" 
              onChange={(e)=>this.setState({newTaskCategory: e.target.value})} 
              value={this.state.newTaskCategory}
            />
            <input 
              className="taskmodal__text-input" 
              type="text" name="task-name" 
              placeholder="Name" 
              onChange={(e)=>this.setState({newTaskName: e.target.value})} 
              value={this.state.newTaskName}
            />
            <input 
              className="taskmodal__date-input" 
              type="date" 
              name="task-due-date" 
              onChange={(e)=>this.setState({newTaskDueDate: e.target.value})} 
              value={this.state.newTaskDueDate}
            />
            <input 
              className="taskmodal__text-input" 
              type="text"
              name="task-status" 
              placeholder="Status" 
              onChange={(e)=>this.setState({newTaskStatus: e.target.value})} 
              value={this.state.newTaskStatus}
            />
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
  boardsList: state.boardsList,
  activeBoardData: state.activeBoardData
})

const mapDispatchToProps = (dispatch: any) => ({
...bindActionCreators({
    ...actions,
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskModal);