// Correspondence Reducer

const correspondenceReducerDefaultState = [];

export default (state = correspondenceReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_CORRESPONDENCE':
            return [
                ...state,
                action.correspondence
            ];
        case 'REMOVE_CORRESPONDENCE':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_CORRESPONDENCE':
            return state.map((correspondence) => {
                if (correspondence.id === action.id) {
                    return {
                        ...correspondence,
                        ...action.updates
                    }
                } else {
                    return correspondence;
                }
            });
        default:
            return state
    }
};