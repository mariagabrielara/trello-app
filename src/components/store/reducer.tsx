interface Action {
    type: string;
    payload: any;
}

interface Board {
    id: number, 
    img: string, 
    name: string, 
    dueDate: string, 
    tasks: Array<Task>
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
    activeBoardData: Board;
}

const initialState: State = {
    activeBoard: 0,
    boardsList: [],
    activeBoardData: {
        id: 0, 
        img: '', 
        name: '', 
        dueDate: '', 
        tasks: []
    }
};

const getActiveBoardData = (state: State) => {
    return (state.boardsList.filter((item) => item.id === state.activeBoard))[0];
}

const reducer = (state: State = initialState, action: Action) => {

    let newActiveBoard = getActiveBoardData(state);
    switch (action.type) {
        case 'SET_ACTIVE_BOARD':
                return {
                    ...state,
                    activeBoard: action.payload,
                    activeBoardData: {
                        id: newActiveBoard.id, 
                        img: newActiveBoard.img, 
                        name: newActiveBoard.name, 
                        dueDate: newActiveBoard.dueDate, 
                        tasks: newActiveBoard.tasks
                    }
                }
        case 'CREATE_NEW_BOARD':
            if (newActiveBoard) {
                return {
                    ...state,
                    activeBoard: action.payload.id,
                    boardsList: [...state.boardsList, action.payload],
                    activeBoardData: {
                        id: newActiveBoard.id, 
                        img: newActiveBoard.img, 
                        name: newActiveBoard.name, 
                        dueDate: newActiveBoard.dueDate, 
                        tasks: newActiveBoard.tasks
                    }
                } 
            } else {
                return {
                    ...state,
                    activeBoard: action.payload.id,
                    boardsList: [...state.boardsList, action.payload],
                    activeBoardData: {
                        id: action.payload.id, 
                        img: action.payload.img, 
                        name: action.payload.name, 
                        dueDate: action.payload.dueDate, 
                        tasks: action.payload.tasks
                    }
                } 
            } 
        default:
            return state;
    }
}

export default reducer;