import { DASHBOARD_LOADING_END, STUDENT_DATA_LOADED } from './dashboardActions'

export const dashboardEndLoading = () => dispatch => {
    dispatch({
        type: DASHBOARD_LOADING_END
    })
}

export const fetchDashboardStudents = () => dispatch => {
    
    fetch('https://api.myjson.com/bins/1dlper')
    .then(res => res.json())
    .catch(function (e) {
        console.log("Error while fetching data", e);
    })
    .then (res => {

        dispatch({
            type: DASHBOARD_LOADING_END
        })

        //Dispatch Event with data
        dispatch({
            type: STUDENT_DATA_LOADED,
            payload: res
        })
    })

}