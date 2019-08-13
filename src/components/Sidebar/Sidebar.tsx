import React from 'react';

import './Sidebar.scss';
import BoardCard from '../BoardCard/BoardCard';
import Button from '../Button/Button';

import googleImage from '../../img/google.jpg';

import BoardModal from '../Modals/BoardModal';

interface SidebarState {
    modalIsOpen: boolean;
}

class Sidebar extends React.Component<{}, SidebarState> {

    initState() {
        this.setState({
          modalIsOpen: false
        });
    }
    
    componentWillMount() {
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.initState();
    }

    openModal() {
        this.setState({
            modalIsOpen: true
        });
    }
     
    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    render () {
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
                        openModal={this.openModal}
                    />
                </div>
                <BoardModal 
                    modalIsOpen={this.state.modalIsOpen}
                    openModal={this.openModal}
                    closeModal={this.closeModal}
                />
            </div>
        );
    }
}

export default Sidebar;