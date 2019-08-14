import React from 'react';

import './Board.scss';

import Panel from '../Panel/Panel';
import Task from '../Task/Task';

interface Props {
    id: number,
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

interface BoardState {
    tasks: { 
        key: string, 
        panel: string, 
        taskComponent: JSX.Element 
    }[],
    board: {
        id: number, 
        img: string, 
        name: string, 
        dueDate: string, 
        todos: [],
        inprogress: [],
        done: []
    }
}

class Board extends React.Component<Props, BoardState> {

    initState() {

        let currentBoard = this.props.boardsList.filter((b) => b.id === this.props.id)

        this.setState({
            tasks: [
                {   
                    key: Math.random().toString(), 
                    panel: "todo", 
                    taskComponent: (
                        <Task
                            taskCategory="TD"
                            taskName="TD 1"
                            taskDate="1-1-19"
                            taskStatus="Active"
                        />
                    )
                },
                {   
                    key: Math.random().toString(), 
                    panel: "inprogress", 
                    taskComponent: (
                        <Task
                            taskCategory="IP"
                            taskName="IP 1"
                            taskDate="1-1-19"
                            taskStatus="Active"
                        />
                    )
                }
            ],
            board: {
                id: currentBoard[0].id, 
                img: currentBoard[0].img, 
                name: currentBoard[0].name, 
                dueDate: currentBoard[0].dueDate, 
                todos: currentBoard[0].todos, 
                inprogress: currentBoard[0].inprogress, 
                done: currentBoard[0].done
            }
        });
    }

    UNSAFE_componentWillMount() {
        this.initState();
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
            if (task.key === id) {
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
                            onDragStart={(e) => this.onDragStart(e, t.key)} 
                            draggable> {t.taskComponent} </div>
                    );
                break;

                case 'inprogress':
                    tasks.inprogress.push( 
                        <div 
                            key={t.key} 
                            onDragStart={(e) => this.onDragStart(e, t.key)} 
                            draggable> {t.taskComponent} </div>
                    );
                break;

                case 'done':
                    tasks.done.push( 
                        <div 
                            key={t.key} 
                            onDragStart={(e) => this.onDragStart(e, t.key)} 
                            draggable> {t.taskComponent} </div>
                    );
                break;
            }
            
        });

        return (
            <div className="board">
                <div className="board__name">{this.state.board.name}</div>
                <div className="board__due-date">Due date: {this.state.board.dueDate}</div>
                <div 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, "todo")}}>
                    <Panel 
                        tasksList={tasks.todo}
                        panelTitle="TODO"
                        panelQuantity={this.state.board.todos.length}
                    />
                </div>
                <div 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, "inprogress")}}>
                    <Panel 
                        tasksList={tasks.inprogress}
                        panelTitle="IN PROGRESS"
                        panelQuantity={this.state.board.inprogress.length}
                    />
                </div>
                <div 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, "done")}}>
                    <Panel 
                        tasksList={tasks.done}
                        panelTitle="DONE"
                        panelQuantity={this.state.board.done.length}
                    />
                </div>
            </div>
        );
    }
    
}
export default Board;