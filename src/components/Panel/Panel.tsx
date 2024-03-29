import React from 'react';

import './Panel.scss';

import Button from '../Button/Button';
import TaskModal from '../Modals/TaskModal';

import { connect } from 'react-redux';

interface Props {
    panelTitle: string;
    panelQuantity: number;
    tasksList: Array<JSX.Element>;
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
    activeBoardData: Board;
    panelType: string;
}

interface PanelState {
    taskModalIsOpen: boolean;
}

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
    taskPanel: string;
}

interface PanelGlobalState {
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
    activeBoardData: Board
}

class Panel extends React.Component<Props, PanelState> {
    initState() {
        this.setState({
            taskModalIsOpen: false
        });
    }
    
    UNSAFE_componentWillMount() {
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.initState();
    }

    openModal() {
        this.setState({
            taskModalIsOpen: true
        });
    }
     
    closeModal() {
        this.setState({
            taskModalIsOpen: false
        });
    }

     render() {

        return (
            <div className="panel">
                <div className="panel__title">{this.props.panelTitle}</div>
                <div className="panel__quantity">{this.props.panelQuantity}</div>
                <div className="panel__content">
                    {this.props.tasksList.map((t) => {
                        return t;
                    })}
                </div>
                <Button 
                    buttonText="+ Add Task"
                    openModal={this.openModal}
                />
                <TaskModal 
                    taskModalIsOpen={this.state.taskModalIsOpen}
                    openModal={this.openModal}
                    closeModal={this.closeModal}
                    board={this.props.boardsList[this.props.activeBoard]}
                    panelType={this.props.panelType}
                />
            </div>
        );
     } 
}

const mapStateToProps = (state: PanelGlobalState) => ({
    activeBoard: state.activeBoard,
    boardsList: state.boardsList,
    activeBoardData: state.activeBoardData
})

export default connect(mapStateToProps)(Panel);