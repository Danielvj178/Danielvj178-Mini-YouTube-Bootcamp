const moment = require('moment')
/*
    @parameter1: Array to iterate
    @parameter2: Name of attribute to change
    @parameter3: New attribute add to model with convertion
*/
const convertDate = (arr, attribute, newAttribute) => {
    let convert = []
    arr.forEach((value, index) => {
        let jsonObject = value.toObject()
        jsonObject[newAttribute] = moment(jsonObject[attribute]).format('MMM Do YY, h:mm a')
        convert[index] = jsonObject
    })

    return convert
}

module.exports = {
    convertDate
}