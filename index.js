import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.set('view engine', 'ejs');

app.get('/', (req ,res) => {
    res.render('index', {
        title: 'RGC'
    })
})

let countUserOnline = 1
io.on('connection', (socket) => {
    socket.on("join", (param) => {
        countUserOnline++
        io.emit('countUserOnline' , countUserOnline)
    })

    socket.on("message", (data) => {
        socket.broadcast.emit("message", data)
    })

    socket.on('disconnect', (param) => {
        countUserOnline--
        io.emit('countUserOnline', countUserOnline)
    })
})

server.listen(3000)