interface Action {
    type: string;
    payload: any;
}

interface Board {
    id: number, 
    img: string, 
    name: string, 
    dueDate: string, 
    todos: Array<Task>,
    inprogress: Array<Task>,
    done: Array<Task>
}

interface Task {
    taskId: number,
    category: string,
    taskName: string,
    taskDueDate: string,
    taskStatus: string
}

interface State {
    activeBoard: number;
    boardsList: Array<Board>;
}

const initialState: State = {
    activeBoard: 0,
    boardsList: []
};

const reducer = (state: State = initialState, action: Action) => {

    const addTaskToActiveBoardObject = (action: Action) => {

        let currentBoard: Board = (state.boardsList.filter((b)=>b.id===state.activeBoard))[0];
        switch (action.payload.panel) {
            case 'todos':
                currentBoard.todos.push(action.payload.task);
                break;
            case 'inprogress':
                currentBoard.inprogress.push(action.payload.task);
                break;
            case 'done':
                currentBoard.done.push(action.payload.task);
                break;
            default:
                currentBoard.todos.push(action.payload.task);
                break;
        }
        
        let newArr = state.boardsList.map(b => {
            if (b.id === state.activeBoard) {
                return currentBoard;
            }
            return b;
        });
        console.log(newArr);
        return newArr;
    }

    switch (action.type) {
        case 'SET_ACTIVE_BOARD':
            return {
                ...state,
                activeBoard: action.payload
            }

        case 'CREATE_NEW_BOARD':
            return {
                ...state,
                activeBoard: action.payload.id,
                boardsList: [...state.boardsList, action.payload]
            }
        case 'CREATE_NEW_TASK':
            let updatedBoardsList = addTaskToActiveBoardObject(action);
            return {
                ...state,
                boardsList: updatedBoardsList
            }
        default:
            return state;
    }
}

export default reducer;