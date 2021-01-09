import axios from 'axios'

export const GetAllNotes = () => {
    return axios
        .get('/notes')
        .then((res) => {
            return Promise.resolve(res.data.notes)
        })
        .catch((err) => {
            return Promise.reject(err)
        })
}

export const GetANote = (_id: String) => {
    return axios
        .get(`/notes/${_id}`)
        .then((res) => {
            return Promise.resolve(res.data.note)
        })
        .catch((err) => {
            return Promise.reject(err)
        })
}

export type NoteType = {
    _id: String,
    title: String,
    content: String
}
export type FormProp = {
    config: {
        type: "create" | "update",
        _id?: String
    },
    onSubmit: (e: any) => void,
    onDelete?: (e: any) => void,
    onPatch?: (e: any, noteId: any) => void
}

export type NoteListProp = {
    notes: NoteType[]
    onListSelect: (_id: String) => void
}