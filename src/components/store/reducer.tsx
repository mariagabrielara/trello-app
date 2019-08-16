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
    taskPanel: string;
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
        tasks: [{
            taskId: 0,
            category: '',
            taskName: '',
            taskDueDate: '',
            taskStatus: '',
            taskPanel: 'todo'
        }]
    }
};

const getActiveBoardData = (state: State) => {
    return (state.boardsList.filter((item) => item.id === state.activeBoard))[0];
}

const updateBoardsList = (state: State, action: Action) => {
    let newTask = {
        taskId: action.payload.taskId,
        category: action.payload.category,
        taskName: action.payload.taskName,
        taskDueDate: action.payload.taskDueDate,
        taskStatus: action.payload.taskStatus,
        taskPanel: action.payload.taskPanel
    }

    let currentBoardUpdated = state.activeBoardData;
    currentBoardUpdated.tasks.push(newTask);

    let boardsArray = [...state.boardsList];
    let mapedBoardsArray = boardsArray.map(board => {
        if (board.id === state.activeBoard) {
            board = currentBoardUpdated;
        } 
        return board;
    })
    return mapedBoardsArray;
}

const updateBoardTask = (state: State, action: Action) => {

    let currentBoard = state.activeBoardData;
    let currentBoardUpdate = currentBoard.tasks.map(ts => {
        if (ts.taskId === action.payload.taskId) {
            return ({
                taskId: ts.taskId,
                category: ts.category,
                taskName: ts.taskName,
                taskDueDate: ts.taskDueDate,
                taskStatus: ts.taskStatus,
                taskPanel: action.payload.newPanel
            });
        } else {
            return ts;
        }
    });

    currentBoard.tasks = currentBoardUpdate;
    
    let boardsArray = [...state.boardsList];
    let mapedBoardsArray = boardsArray.map(board => {
        if (board.id === state.activeBoard) {
            board = currentBoard;
        } 
        return board;
    })
    return mapedBoardsArray;

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
        case 'CREATE_NEW_TASK':
            let boardsUpdated = updateBoardsList(state, action);
            return {
                    ...state,
                    boardsList: boardsUpdated
                } 
        case 'ON_CHANGE_PANEL':
            let updatedBoards = updateBoardTask(state, action);
            return {
                    ...state,
                    boardsList: updatedBoards
                } 
        default:
            return state;
    }
}

export default reducer;