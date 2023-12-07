import http from 'http'
import { Express } from 'express'
import { Server } from 'socket.io'
import { setupFFmpegStream } from './ffmpeg-stream.js'

const app = Express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {
  console.log('A user connected')
})

io.on('disconnect', socket => {
  console.log('A user disconnected')
})

setupFFmpegStream(io)

server.listen(3000, () => {
  console.log('Listening on 127.0.0.1:3000')
})