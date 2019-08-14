import React from 'react';

import './DragDropComponent.scss';

import Panel from '../Panel/Panel';
import Task from '../Task/Task';

interface DDState {
    tasks: { key: string, panel: string, taskComponent: JSX.Element }[]
}

class DragDropComponent extends React.Component<{}, DDState> {

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
            ]
        });
    }

    componentWillMount() {
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
            if (task.key == id) {
                task.panel = cat;
            }
            return task;
        });

        this.setState({
            ...this.state,
            tasks
        });
    }

    render() {
        let tasks: {
            todo: Array<JSX.Element>, 
            inprogress: Array<JSX.Element>, 
            done: Array<JSX.Element>} = {
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
            <div>
                <div 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, "todo")}}>
                    <Panel 
                        tasksList={tasks.todo}
                        panelTitle="TODO"
                        panelQuantity={10}
                    />
                </div>
                <div 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, "inprogress")}}>
                    <Panel 
                        tasksList={tasks.inprogress}
                        panelTitle="IN PROGRESS"
                        panelQuantity={10}
                    />
                </div>
                <div 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, "done")}}>
                    <Panel 
                        tasksList={tasks.done}
                        panelTitle="DONE"
                        panelQuantity={10}
                    />
                </div>
            </div>
        );
    }
}

export default DragDropComponent;