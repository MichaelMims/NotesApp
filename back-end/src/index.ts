import express, { Router } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import notesRoutes from './routes/notes'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

if (process.env.MONGOOSE_ADDRESS) {
    mongoose.connect(process.env.MONGOOSE_ADDRESS, { useNewUrlParser: true })
        .then((res) => {
            startServer()
        })
        .catch((err) => {
            console.log(err)
        })
} else {
    console.log('Could not connect to database')
}

function startServer() {
    app.use(cors())

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json())

    app.use('/notes', notesRoutes)

    app.listen(PORT, () => {
        console.log(`Listening on port:${PORT}`)
    })
}