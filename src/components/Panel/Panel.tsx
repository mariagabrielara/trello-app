import React from 'react';

import './Panel.scss';

import Button from '../Button/Button';
import Task from '../Task/Task';
import TaskModal from '../Modals/TaskModal';

interface Props {
    panelTitle: string;
    panelQuantity: number;
}

interface PanelState {
    taskModalIsOpen: boolean;
}

class Panel extends React.Component<Props, PanelState> {
    initState() {
        this.setState({
            taskModalIsOpen: false
        });
    }
    
    componentWillMount() {
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
                    <Task 
                        taskCategory="IT"
                        taskName="Implement redux to project"
                        taskDate="03-09-2019"
                        taskStatus="Active"
                    />
                    <Task 
                        taskCategory="IT"
                        taskName="Implement redux to project"
                        taskDate="03-09-2019"
                        taskStatus="Active"
                    />
                </div>
                <Button 
                    buttonText="+ Add Task"
                    openModal={this.openModal}
                />
                <TaskModal 
                    taskModalIsOpen={this.state.taskModalIsOpen}
                    openModal={this.openModal}
                    closeModal={this.closeModal}
                />
            </div>
        );
     } 
}

export default Panel;