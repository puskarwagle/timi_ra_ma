import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    socket.on('chat message', (data) => {
        const user = data.user;
        const message = data.message;
        io.emit('chat message', user, message);
    });
});

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});