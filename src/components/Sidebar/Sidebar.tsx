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
    boardsList: Array<{
        id: number, 
        img: string, 
        name: string, 
        dueDate: string, 
        todos: [],
        inprogress: [],
        done: []
    }>;
}

class Sidebar extends React.Component<Props, SidebarState> {

    initState() {
        this.setState({
          modalIsOpen: false
        });
    }
    
    UNSAFE_componentWillMount() {
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
                        <li className="sidebar__element" key={b.id}>
                            <BoardCard 
                                imgUrl={b.img}
                                boardTitle={b.name}
                                todos={0} />
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