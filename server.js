const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    // Quando alguém envia um novo link de vídeo
    socket.on('mudarVideo', (url) => {
        // Envia para TODOS os conectados
        io.emit('trocarSrcParaTodos', url);
    });
});

server.listen(3000, () => console.log("🚀 Rodando em http://localhost:3000"));
