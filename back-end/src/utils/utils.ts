import mongoose from 'mongoose';
const { Schema } = mongoose;

export type Note = {
    _id: String,
    title: String,
    content: String
}

const noteSchema = new Schema({
    _id: String,
    title: String,
    content: String
})


export const NoteSchema = mongoose.model('Note', noteSchema)

