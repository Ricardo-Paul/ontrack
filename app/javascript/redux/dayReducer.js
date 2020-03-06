import { SET_DAYS, 
    SET_DATE, 
    SET_TASKS, 
    SET_DAY_ID, 
    ADD_TASK, 
    ADD_DAY,
    LOADING,
    SET_PAGE_NUMBER
} from "./action-types"

const initialState = {
    days: [],
    date: '28',
    dayId: '',
    loading: false,
    tasks: [],
    notes: [],
    pageNumber: '1'
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
        default: 
            return state
    }
}

