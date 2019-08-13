import React from 'react';

import './Sidebar.scss';
import BoardCard from '../BoardCard/BoardCard';
import Button from '../Button/Button';

import googleImage from '../../img/google.jpg';

const Sidebar = (): JSX.Element => {
    return (
        <div className="sidebar">
            <div className="sidebar__title">Boards</div>
            <ul className="sidebar__list">
                <li className="sidebar__element">
                    <BoardCard 
                        imgUrl={googleImage}
                        boardTitle="BOARD 1"
                        todos={67} />
                </li>
                <li className="sidebar__element">
                    <BoardCard 
                        imgUrl={googleImage}
                        boardTitle="BOARD 2"
                        todos={67} />
                </li>
                <li className="sidebar__element">
                    <BoardCard 
                        imgUrl={googleImage}
                        boardTitle="BOARD 3"
                        todos={67} />
                </li>
            </ul>
            <div>
                <Button 
                    buttonText="+ Create Board"
                    buttonType="button--bottom"
                />
            </div>
        </div>
    );
}

export default Sidebar;