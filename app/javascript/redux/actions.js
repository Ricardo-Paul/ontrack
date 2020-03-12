import axios from 'axios';

import { SET_DAYS, 
        SET_DATE, 
        SET_TASKS, 
        SET_DAY_ID, 
        ADD_TASK, 
        ADD_DAY,
        LOADING,
        SET_PAGE_NUMBER,
        SET_NOTE,
        SET_LESSONS,

        POST_NOTE
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

export const setNote = (payload) => {
    return {type: SET_NOTE, payload}
}

export const setLessons = (payload) => {
    return { type: SET_LESSONS, payload }
}

export const fetchNote = (dayId) => (dispatch) => {
        axios({
            method: 'get',
            url: '/api/getNotes/',
            params: {
                day_id: dayId
            }
        })
        .then(res => {
            dispatch(setNote(res.data))
        })
}

export const postNote = (title, content, dayId) => (dispatch) => {
    axios({
        method: 'post',
        url: '/api/notes',
        data: {
            note :{
                title: title,
                content: content,
                day_id: dayId
            }
        }
    })
    .then( res => {
        dispatch({type: POST_NOTE, payload: res.data})
    })
}


// lessons -------------------------------------
export const fetchLessons = (dayId) => (dispatch) => {
    axios({
        method: 'get',
        url: '/api/getLessons/',
        params: {
            day_id: dayId
        }
    })
    .then(res => {
        dispatch(setLessons(res.data))
    })
}

export const postLesson = (description, dayId) => (dispatch) => {
    axios({
        method: 'post',
        url: '/api/lessons',
        data: {
            description: description,
            day_id: dayId
        }
    })
    .then( res => {
        dispatch({type: "ADD_LESSON", payload: res.data})
    })
}

export const setEdit = () => (dispatch) => {
   dispatch({type: "EDITING"})
}

export const updateNote = (note_id, title, content, dayId) => (dispatch) => {
    axios({
        url: `/api/notes/${note_id}`,
        method: 'PUT',
        data: {
            title: title,
            content: content,
            day_id: dayId
        }
    })
    .then(res => {
        dispatch({type: SET_NOTE, payload: res.data})
    })
}

export const updateTask = (task_id, title, dayId) => (dispatch) => {
    axios({
        url: `/api/tasks/${task_id}`,
        method: 'PUT',
        data: {
            title: title,
            day_id: dayId
        }
    })
    .then(res => {
        dispatch({type: SET_TASKS, payload: res.data})
    })
}