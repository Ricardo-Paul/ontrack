import { SET_DAYS, SET_DATE } from "./action-types"

const initialState = {
    days: [],
    date: '28',
    dayId: '',

    tasks: []
}

export const dayReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_DAYS:
            return {
                ...state,
                days: action.payload
            }
        case SET_DATE: 
            return {
                ...state,
                date: action.payload
            }
        default: 
            return state
    }
}