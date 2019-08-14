import React from 'react';

import './Panel.scss';

import Button from '../Button/Button';
import TaskModal from '../Modals/TaskModal';

interface Props {
    panelTitle: string;
    panelQuantity: number;
    tasksList: Array<JSX.Element>;
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
                />
            </div>
        );
     } 
}

export default Panel;