// const extractDate = (date) => {
//     let dayNumber = date.split("-")[2]
//     return dayNumber
// }

const helpers = {
    extractDate: function(date){
        let dayNumber = date.split("-")[2]
        return dayNumber
    }
}

export default helpers;