const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    question: {type: String, required: true},
    topic: {type: String, required: true},
    resolved: {type: Boolean, required: true},
})

module.exports = model('Question', schema)