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
} from "./action-types"

const initialState = {
    days: [],
    date: '28',
    dayId: '',
    loading: false,
    tasks: [],
    notes: [],
    pageNumber: '1',
    lessons: [],

    editing: false
}

export const dayReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_DAYS:
            return {
                ...state,
                days: action.payload,
                loading: false
            }
        case SET_DATE: 
            return {
                ...state,
                date: action.payload
            }
        case SET_TASKS: 
            return {
                ...state,
                editing: false,
                tasks: action.payload
            }
        case SET_DAY_ID:
            return {
                ...state,
                dayId: action.payload
            }
        case ADD_TASK:
            return {
                ...state,
                tasks: state.tasks.concat(action.payload)
            }
        case ADD_DAY: 
            return {
                ...state,
                days: state.days.concat(action.payload),
                loading: false
            }
        case LOADING: 
            return {
                ...state,
                loading: true
            }
        case SET_PAGE_NUMBER:
            return {
                ...state,
                pageNumber: action.payload
            }
        case SET_NOTE:
            return{
                ...state,
                editing: false,
                notes: action.payload
            }
        case SET_LESSONS:
            return{
                ...state,
                lessons: action.payload
            }
        case "ADD_LESSON":
            return{
                ...state,
                lessons: state.lessons.concat(action.payload)
            }
        case POST_NOTE:
            console.log("note payload", action.payload)
            return {
                ...state, 
                notes: state.notes.concat(action.payload)
            }
        case "EDITING":
            return{
                ...state,
                editing: true
            }
        default: 
            return state
    }
}


// 