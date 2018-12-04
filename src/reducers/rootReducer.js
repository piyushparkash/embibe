import { combineReducers } from 'redux';
import { DASHBOARD_LOADING_END, STUDENT_DATA_LOADED } from '../actions/dashboardActions'
const initialState = {
    isLoading: true,
}


const dashboard = function(state = initialState, action) {
    switch (action.type) {
        case DASHBOARD_LOADING_END:
            return {
                ...state,
                isLoading: false
            }
        case STUDENT_DATA_LOADED:
            return {
                ...state,
                studentList: action.payload
            }

        default:
            return state;
    }
}
export default combineReducers({
    dashboard: dashboard,
});