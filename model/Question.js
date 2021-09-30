const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    question: {type: String},
    topic: {type: String},
    resolved: {type: Boolean},
    id: {type: String},
})

module.exports = model('Question', schema)