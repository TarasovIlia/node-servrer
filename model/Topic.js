const {Schema, model} = require('mongoose')

const schema = new Schema({
    topic: {type: String, required: true},
    level: {type: Number, required: true},
})

module.exports = model('Topic', schema)