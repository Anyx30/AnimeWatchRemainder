const mongoose = require('mongoose')
const recordSchema = new mongoose.Schema({
    name: {type: String,
        required: true},
    age: {type: Number,
        required: true},
    animeName: {type: String,
        required: true},
    date: {type: Number,
        default: Date.now}
})

const model = mongoose.model('recordModel', recordSchema)
module.exports = model
