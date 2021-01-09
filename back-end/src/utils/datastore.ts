import { Note } from './utils'
import mongoose from 'mongoose'
import { NoteSchema } from './utils'

let notes: Note[] = [
    {
        _id: "1",
        title: "Note1",
        content: "Note1 is nothing"
    },
    {
        _id: "2",
        title: "Note2",
        content: "Note2 is nothing"
    }
]

export const GetNotes = () => {
    return NoteSchema
        .find()
        .select('-__v')
        .exec()
        .then((notes: any) => {
            return notes
        }).catch((err: any) => { console.log(err) })
}

export const InsertNote = (note: Note) => {
    let newNote = new NoteSchema({
        _id: note._id,
        title: note.title,
        content: note.content
    })

    return newNote.save()
        .then((result: any) => {
            return result
        })
        .catch((err: any) => { console.log(err) })
}
export const UpdateNote = (note: Note) => {
    return NoteSchema
        .updateOne({ _id: note._id }, { title: note.title, content: note.content }).exec().then((res: any) => { return res }).catch((err: any) => { console.log(err) })
}

export const GetNote = (_id: String) => {
    return NoteSchema.findById(_id, '_id title content').exec().then((note: any) => { return note }).catch((err: any) => { console.log(err) })
}

export const DeleteNote = (_id: String) => {

    return NoteSchema.deleteOne({ _id: _id }).then((res: any) => { return res }).catch((err: any) => { console.log(err) })

}