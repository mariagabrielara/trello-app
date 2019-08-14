interface Action {
    type: string;
    payload: any;
}

interface State {
    activeBoard: number;

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

const initialState: State = {
    activeBoard: 0,
    boardsList: []
};

const reducer = (state: State = initialState, action: Action) => {
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
        default:
            return state;
    }
}

export default reducer;