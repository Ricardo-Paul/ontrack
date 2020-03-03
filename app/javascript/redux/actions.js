import { SET_DAYS, 
        SET_DATE, 
        SET_TASKS, 
        SET_DAY_ID, 
        ADD_TASK, 
        ADD_DAY,
        LOADING } 
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