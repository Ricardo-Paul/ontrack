import { SET_DAYS, SET_DATE } from "./action-types";

export const setDays = (payload) => {
    return { type: SET_DAYS, payload }
}

export const setDate = (payload) => {
    return { type: SET_DATE, payload}
}