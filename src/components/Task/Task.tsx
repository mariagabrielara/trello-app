import React from 'react';

import './Task.scss';

interface Props {
    taskCategory: string;
    taskName: string;
    taskDate: any;
    taskStatus: string;
}

const Task = (props: Props): JSX.Element => {
    return (
        <div className="task">
            <div className="task__category">{props.taskCategory}</div>
            <div className="task__name">{props.taskName}</div>
            <div className="task__date">Date: {props.taskDate}</div>
            <div className="task__status">{props.taskStatus}</div>
        </div>
    );
}

export default Task;