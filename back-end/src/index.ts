import express, { Router } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import notesRoutes, { connect } from './routes/notes'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

if (process.env.MONGOOSE_ADDRESS) {
    connectWithRetry(process.env.MONGOOSE_ADDRESS)
} else {
    console.log('No Mongo Address has been found in .env')
}

function CorsMiddleware(req: any, res: any, next: any) {
    const origin = req.get('origin')

    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma')
    console.log(res)
    next()
}

function startServer() {
    app.use(CorsMiddleware)

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json())

    app.use('/check', (req, res, next) => {
        res.sendStatus(200).json({
            msg: 'site is working'
        })
    })
    app.use('/notes', notesRoutes)

    app.listen(PORT, () => {
        console.log(`Listening on port:${PORT}`)
    })
}

function connectWithRetry(mongourl: string){
    return mongoose.connect(mongourl, (err) => {
        if (err) {
            console.error('Failed to connect to mongo on startup - retrying');
            setTimeout(() => {connectWithRetry(mongourl)}, 5000);
        } else {
            startServer()
        }
    })
}