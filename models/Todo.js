const mongoose = require('mongoose')
const { Schema } = mongoose

const todoSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    state: {
        type: Boolean,
        default: false,
        required: true
    }
})


const Todo = mongoose.model("todo", todoSchema)

module.exports = Todo