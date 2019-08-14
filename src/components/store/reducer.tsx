interface Action {
    type: string;
    payload: any;
}

interface State {
    activeBoard: string;

    boardsList: Array<{img: string, name: string, dueDate: string}>;
}

const initialState: State = {
    activeBoard: '1',
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
                boardsList: [...state.boardsList, action.payload]
            }
        default:
            return state;
    }
}

export default reducer;