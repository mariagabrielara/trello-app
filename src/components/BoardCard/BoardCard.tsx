import React from 'react';

import './BoardCard.scss';

interface Props {
    imgUrl: any;
    boardTitle: string;
    todos: number;
}

const BoardCard = (props: Props): JSX.Element => {
    return (
        <div className="boardcard">
            <img className="boardcard__image" alt="" src={props.imgUrl}></img>
            <div className="boardcard__info">
                <div className="boardcard__title">{props.boardTitle}</div>
                <div className="boardcard__todos-total">{props.todos} Active Tasks</div>
            </div>
        </div>
    );
}

export default BoardCard;