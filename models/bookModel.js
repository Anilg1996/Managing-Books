const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    summary: {
        type: String,
        required: true,
        trim: true
    },
    authorId: {
        type: ObjectId,
        required: true,
        ref: 'Author',
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
      },
    updatedAt: {
        type: Date,
        default: Date.now
      },
},{ timestamps: true })
module.exports = mongoose.model('Book', bookSchema)