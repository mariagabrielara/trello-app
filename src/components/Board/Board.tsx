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
    onChangePanel: typeof actions.onChangePanel;
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
   key: string;
   panel: string;
   taskComponent: JSX.Element; 
}

interface TaskData {
    taskId: number,
    category: string,
    taskName: string,
    taskDueDate: string,
    taskStatus: string
    taskPanel: string;
}

const actions = {
    onSetActiveBoard: (val: number) => ({type: 'SET_ACTIVE_BOARD', payload: val}),
    onChangePanel: (val: {taskId: number, newPanel: string}) => ({type: 'ON_CHANGE_PANEL', payload: val})
}

class Board extends React.Component<Props, BoardState> {

    initState() {
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
                }
             ],
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
        e.dataTransfer.setData("id",id);
    }

    onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    }

    onDrop = (e: React.DragEvent, cat: string) => {
        let id = e.dataTransfer.getData("id");
        return this.props.onChangePanel({
            taskId: +id, 
            newPanel: cat
        });
    }

    render () {
        let globalStateTasks: Array<TaskData> = this.props.activeBoardData.tasks;

        let globalStateTasksFormatted = globalStateTasks.map(st => {
            return {
                key: st.taskId, 
                panel: st.taskPanel, 
                taskComponent: (
                    <Task
                        taskCategory={st.category}
                        taskName={st.taskName}
                        taskDate={st.taskDueDate}
                        taskStatus={st.taskStatus}
                    />
                )
            }
        });

        let tasks: {
            todo: Array<JSX.Element>, 
            inprogress: Array<JSX.Element>, 
            done: Array<JSX.Element>
        } = {
            todo: [],
            inprogress: [],
            done: []
        }

        globalStateTasksFormatted.forEach((t) => {
            switch (t.panel) {
                case 'todo':
                    tasks.todo.push( 
                        <div 
                            key={t.key} 
                            onDragStart={(e) => this.onDragStart(e, t.key.toString())} 
                            draggable> 
                            {t.taskComponent} 
                        </div>
                    );
                break;

                case 'inprogress':
                    tasks.inprogress.push( 
                        <div 
                            key={t.key} 
                            onDragStart={(e) => this.onDragStart(e, t.key.toString())} 
                            draggable> 
                            {t.taskComponent} 
                        </div>
                    );
                break;

                case 'done':
                    tasks.done.push( 
                        <div 
                            key={t.key} 
                            onDragStart={(e) => this.onDragStart(e, t.key.toString())} 
                            draggable> 
                            {t.taskComponent} 
                        </div>
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
                        panelType='todo'
                    />
                </div>
                <div 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, "inprogress")}}>
                    <Panel 
                        tasksList={tasks.inprogress}
                        panelTitle="IN PROGRESS"
                        panelQuantity={this.props.activeBoardData.tasks.length}
                        panelType='inprogress'
                    />
                </div>
                <div 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, "done")}}>
                    <Panel 
                        tasksList={tasks.done}
                        panelTitle="DONE"
                        panelQuantity={this.props.activeBoardData.tasks.length}
                        panelType='done'
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