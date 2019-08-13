import React from 'react';

import './Panel.scss';

import Button from '../Button/Button';
import Task from '../Task/Task';

interface Props {
    panelTitle: string;
    panelQuantity: number;
}

const Panel = (props: Props): JSX.Element => {
        return (
            <div className="panel">
                <div className="panel__title">{props.panelTitle}</div>
                <div className="panel__quantity">{props.panelQuantity}</div>
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
                <Button buttonText="+ Add Task" />
            </div>
        );
}

export default Panel;