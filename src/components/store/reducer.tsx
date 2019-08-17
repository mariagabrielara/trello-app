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
    todosQuantity: number;
    inprogressQuantity: number;
    doneQuantity: number;
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
    }, 
    todosQuantity: 0,
    inprogressQuantity: 0,
    doneQuantity: 0
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

const getTasksQuantityCategories = (updatedBoards: Array<Board>, state: State) => {

    let currentUpdatedBoard = (updatedBoards.filter(b => b.id === state.activeBoard))[0];
    
    let currentBoardTasks = currentUpdatedBoard.tasks;
    
    let todosCounter = 0;
    let inprogressCounter = 0;
    let doneCounter = 0;

    for (let i = 0; i < currentBoardTasks.length; i++) {
        switch (currentBoardTasks[i].taskPanel) {
            case 'todo':
                todosCounter++;
                break;
            case 'inprogress':
                inprogressCounter++;
                break;
            case 'done':
                doneCounter++;
                break;
            default: 
                todosCounter = 0;
        }
    }

    return [todosCounter, inprogressCounter, doneCounter];
}

const reducer = (state: State = initialState, action: Action) => {

    let newActiveBoard = getActiveBoardData(state);

    switch (action.type) {
        case 'SET_ACTIVE_BOARD':
                let quantities = getTasksQuantityCategories(state.boardsList, state);
                return {
                    ...state,
                    activeBoard: action.payload,
                    activeBoardData: {
                        id: newActiveBoard.id, 
                        img: newActiveBoard.img, 
                        name: newActiveBoard.name, 
                        dueDate: newActiveBoard.dueDate, 
                        tasks: newActiveBoard.tasks
                    },
                    todosQuantity: quantities[0],
                    inprogressQuantity: quantities[1],
                    doneQuantity: quantities[2]
                }
        case 'CREATE_NEW_BOARD':
            if (newActiveBoard) {
                let quantitiesNB = getTasksQuantityCategories(state.boardsList, state);
                return {
                    ...state,
                    activeBoard: action.payload.id,
                    boardsList: [...state.boardsList, action.payload],
                    activeBoardData: {
                        id: newActiveBoard.id, 
                        img: newActiveBoard.img, 
                        name: newActiveBoard.name, 
                        dueDate: newActiveBoard.dueDate, 
                        tasks: newActiveBoard.tasks,
                        todosQuantity: quantitiesNB[0],
                        inprogressQuantity: quantitiesNB[1],
                        doneQuantity: quantitiesNB[2]
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
            let quantitiesNT = getTasksQuantityCategories(boardsUpdated, state);
            return {
                    ...state,
                    boardsList: boardsUpdated,
                    todosQuantity: quantitiesNT[0],
                    inprogressQuantity: quantitiesNT[1],
                    doneQuantity: quantitiesNT[2]
                } 
        case 'ON_CHANGE_PANEL':
            let updatedBoards = updateBoardTask(state, action);
            let quantitiesCP = getTasksQuantityCategories(updatedBoards, state);
            return {
                    ...state,
                    boardsList: updatedBoards,
                    todosQuantity: quantitiesCP[0],
                    inprogressQuantity: quantitiesCP[1],
                    doneQuantity: quantitiesCP[2]
                } 
        default:
            return state;
    }
}

export default reducer;