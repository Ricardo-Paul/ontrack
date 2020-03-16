import { func } from "prop-types"

// const extractDate = (date) => {
//     let dayNumber = date.split("-")[2]
//     return dayNumber
// }

const helpers = {
    extractDate: function(date){
        let dayNumber = date.split("-")[2]
        return dayNumber
    },
    extractMonth: function(date){
        let month = new Date(date).toDateString().split(" ")[1]
        return month
    },
    fieldIsEmpty: (field) => field.trim().length === 0
}


export default helpers;