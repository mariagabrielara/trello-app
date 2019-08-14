import React from 'react';

import './Sidebar.scss';
import BoardCard from '../BoardCard/BoardCard';
import Button from '../Button/Button';

import BoardModal from '../Modals/BoardModal';
import { connect } from 'react-redux';

interface SidebarState {
    modalIsOpen: boolean;
}

interface Props {
    boardsList: Array<{img: string, name: string, dueDate: string}>;
}

class Sidebar extends React.Component<Props, SidebarState> {

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
        console.log(this.props.boardsList);
        return (
            <div className="sidebar">
                <div className="sidebar__title">Boards</div>
                <ul className="sidebar__list">
                    {this.props.boardsList.map((b) => (
                        <li className="sidebar__element">
                            <BoardCard 
                                imgUrl={b.img}
                                boardTitle={b.name}
<<<<<<< HEAD
                                todos={0} />
=======
                                todos={10} />
>>>>>>> parent of 042f5a01... Creates board, adds it to the global state and sets activeBoard variable at global state
                        </li>
                    ))}
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

const mapStateToProps = (state: Props) => ({
    boardsList: state.boardsList
})

export default connect(mapStateToProps)(Sidebar);