import React from 'react';

import './Board.scss';

import Panel from '../Panel/Panel';
import Task from '../Task/Task';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface Props {
    id: number,
    boardsList: Array<{
        id: number, 
        img: string, 
        name: string, 
        dueDate: string, 
        tasks: []
    }>;
    activeBoardData: {
        id: number, 
        img: string, 
        name: string, 
        dueDate: string, 
        tasks: []
    };
    onSetActiveBoard: typeof actions.onSetActiveBoard;
}

interface BoardState {
    tasks: Array<FormattedTask>,
    board: {
        id: number, 
        img: string, 
        name: string, 
        dueDate: string, 
        tasks: []
    }
}

interface BoardGlobalState {
    activeBoardData: {
        id: number, 
        img: string, 
        name: string, 
        dueDate: string, 
        tasks: []
    }
}

interface FormattedTask {
   key: number;
   panel: string;
   taskComponent: JSX.Element; 
}

const actions = {
    onSetActiveBoard: (val: number) => ({type: 'SET_ACTIVE_BOARD', payload: val})
}

class Board extends React.Component<Props, BoardState> {

    initState() {

        let tasksList = this.props.activeBoardData.tasks;

        let formattedTasks: Array<FormattedTask> = tasksList.map(task => ({
            key: Math.random(),
            panel: 'todos',
            taskComponent: (
                <Task
                    taskCategory="TD"
                    taskName="TD 1"
                    taskDate="1-1-19"
                    taskStatus="Active"
                />
            )
        }));

        console.log(formattedTasks.length);

        this.setState({
            tasks: formattedTasks,
            // tasks: [
            //     {   
            //         key: Math.random().toString(), 
            //         panel: "todo", 
            //         taskComponent: (
            //             <Task
            //                 taskCategory="TD"
            //                 taskName="TD 1"
            //                 taskDate="1-1-19"
            //                 taskStatus="Active"
            //             />
            //         )
            //     },
            //     {   
            //         key: Math.random().toString(), 
            //         panel: "inprogress", 
            //         taskComponent: (
            //             <Task
            //                 taskCategory="IP"
            //                 taskName="IP 1"
            //                 taskDate="1-1-19"
            //                 taskStatus="Active"
            //             />
            //         )
            //     }
            // ],
            board: {
                id: this.props.activeBoardData.id, 
                img: this.props.activeBoardData.img, 
                name: this.props.activeBoardData.name, 
                dueDate: this.props.activeBoardData.dueDate, 
                tasks: this.props.activeBoardData.tasks
            }
        });
    }

    UNSAFE_componentWillMount() {
        this.initState();
        return this.props.onSetActiveBoard(this.props.id);
    }

    onDragStart = (e: React.DragEvent, id: string) => {
        console.log('dragstart:', id);
        e.dataTransfer.setData("id",id);
    }

    onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    }

    onDrop = (e: React.DragEvent, cat: string) => {
        let id = e.dataTransfer.getData("id");
        let tasks = this.state.tasks.filter((task) => {
            if (task.key.toString() === id) {
                task.panel = cat;
            }
            return task;
        });

        this.setState({
            ...this.state,
            tasks
        });
    }

    render () {
        console.log('reder');
        let tasks: {
            todo: Array<JSX.Element>, 
            inprogress: Array<JSX.Element>, 
            done: Array<JSX.Element>
        } = {
            todo: [],
            inprogress: [],
            done: []
        }

        this.state.tasks.forEach((t) => {
            switch (t.panel) {
                case 'todo':
                    tasks.todo.push( 
                        <div 
                            key={t.key} 
                            onDragStart={(e) => this.onDragStart(e, t.key.toString())} 
                            draggable> {t.taskComponent} </div>
                    );
                break;

                case 'inprogress':
                    tasks.inprogress.push( 
                        <div 
                            key={t.key} 
                            onDragStart={(e) => this.onDragStart(e, t.key.toString())} 
                            draggable> {t.taskComponent} </div>
                    );
                break;

                case 'done':
                    tasks.done.push( 
                        <div 
                            key={t.key} 
                            onDragStart={(e) => this.onDragStart(e, t.key.toString())} 
                            draggable> {t.taskComponent} </div>
                    );
                break;
            }
            
        });

        return (
            <div className="board">
                <div className="board__name">{this.props.activeBoardData.name}</div>
                <div className="board__due-date">Due date: {this.props.activeBoardData.dueDate}</div>
                <div 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, "todo")}}>
                    <Panel 
                        tasksList={tasks.todo}
                        panelTitle="TODO"
                        panelQuantity={this.props.activeBoardData.tasks.length}
                    />
                </div>
                <div 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, "inprogress")}}>
                    <Panel 
                        tasksList={tasks.inprogress}
                        panelTitle="IN PROGRESS"
                        panelQuantity={this.props.activeBoardData.tasks.length}
                    />
                </div>
                <div 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, "done")}}>
                    <Panel 
                        tasksList={tasks.done}
                        panelTitle="DONE"
                        panelQuantity={this.props.activeBoardData.tasks.length}
                    />
                </div>
            </div>
        );
    }
    
}

const mapStateToProps = (state: BoardGlobalState) => {
    return ({
        activeBoardData: state.activeBoardData
    });
}

const mapDispatchToProps = (dispatch: any) => ({
    ...bindActionCreators({
        ...actions,
      }, dispatch)
    });

export default connect(mapStateToProps, mapDispatchToProps)(Board);