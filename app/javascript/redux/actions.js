import axios from 'axios';

import { SET_DAYS, 
        SET_DATE, 
        SET_TASKS, 
        SET_DAY_ID, 
        ADD_TASK, 
        ADD_DAY,
        LOADING,
        SET_PAGE_NUMBER
    } 
        from "./action-types";

export const setDays = (payload) => {
    return { type: SET_DAYS, payload }
}

export const setDate = (payload) => {
    return { type: SET_DATE, payload}
}

export const setTasks = (payload) => {
    return { type: SET_TASKS, payload }
}

export const setDayId = (payload) => {
    return {type: SET_DAY_ID, payload}
}

export const addTask = (payload) => {
    return {type: ADD_TASK, payload}
}

export const addDay = (payload) => {
    return {type: ADD_DAY, payload}
}

export const setLoading = () => {
    return {type: LOADING}
}

export const setPageNumber = (payload) => {
    return {type: SET_PAGE_NUMBER, payload}
}

export const fetchNote = (dayId) => {
    // const { dayId } =  this.props;
    return function(dispatch){
        dispatch(setLoading())
        console.log('dayId here', dayId)
        axios({
            method: 'get',
            url: '/api/getNotes/',
            params: {
                day_id: dayId
            }
        })
        .then(res => {
            console.log(res.data)
        })
    }
}