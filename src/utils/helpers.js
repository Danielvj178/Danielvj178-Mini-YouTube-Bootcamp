const moment = require('moment')
/*
    @parameter1: Model to iterate
    @parameter2: Name of attribute to change
    @parameter3: New attribute add to model with convertion
*/
const convertDate = (model, attribute, newAttribute) => {
    model.forEach((value, index) => {
        value[newAttribute] = moment(value[attribute]).format('MMM Do YY, h:mm a')
        model[index] = value
    })

    return model
}

module.exports = {
    convertDate
}