import { createStore, combineReducers } from 'redux';
import correspondenceReducer from '../reducers/correspondences';
import filtersReducer from '../reducers/filters';

export default () => {
    const store = createStore(
        combineReducers({
            correspondence: correspondenceReducer,
            filters: filtersReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
};
