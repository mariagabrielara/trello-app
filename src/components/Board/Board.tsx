import React from 'react';

import './Board.scss';

import Panel from '../Panel/Panel';

interface Props {
    boardName: string;
    boardDueDate: string;
}

const Board = (props: Props): JSX.Element => {
    return (
        <div className="board">
            <div className="board__name">{props.boardName}</div>
            <div className="board__due-date">Due date: {props.boardDueDate}</div>
            <Panel 
                panelTitle="TODO"
                panelQuantity={43}
            />
            <Panel 
                panelTitle="IN PROGRESS"
                panelQuantity={10}
            />
            <Panel 
                panelTitle="DONE"
                panelQuantity={50}
            />
        </div>
    );
}

export default Board;