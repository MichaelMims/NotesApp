import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { GetNote, InsertNote, GetNotes, UpdateNote, DeleteNote } from '../utils/datastore';
import { Note } from '../utils/utils'

const router = Router()

router.get('/', (req, res, next) => {

    GetNotes().then((result: any) => {
        if (result) {
            res.status(200).json({
                notes: result.map((note: any) => 
                { 
                    return { 
                        _id: note._id, 
                        title: note.title, 
                        content: note.content 
                    } 
                })
            })
        } else {
            res.status(404).json({
                err: "Could not get not"
            })
        }
    })

})

router.post('/', (req, res, next) => {
    const _id = uuidv4()
    const title = req.body.title
    const content = req.body.content

    const note: Note = {
        _id: _id,
        title: title,
        content: content
    }

    const success = InsertNote(note)

    if (success) {
        res.status(200).json({
            message: "success"
        })
    } else {
        res.status(500).json({
            err: "Could not add note"
        })
    }
})

router.patch('/:noteId', (req, res, next) => {
    const _id = req.params.noteId
    const title = req.body.title
    const content = req.body.content

    const note: Note = {
        _id: _id,
        title: title,
        content: content
    }

    UpdateNote(note)

    res.status(200).json({
        note: note
    })

})

router.get('/:noteId', (req, res, next) => {
    const _id = req.params.noteId
    GetNote(_id).then((note: any) => {
        if (note !== null) {
            res.status(200).json({
                note: note
            })
        } else {
            res.status(404).json({
                error: `Could not find note with id: ${_id}`
            })
        }
    })
})

router.delete('/:noteId', (req, res, next) => {
    const _id = req.params.noteId

    const deleted = DeleteNote(_id)

    if (deleted) {
        res.status(200).json({
            message: `Successfully deleted note: ${_id}`
        })
    } else {
        res.status(500).json({
            err: `Could not delete note: ${_id}`
        })
    }
})

export = router;