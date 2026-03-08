const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

let estadoVideo = { url: "", tempo: 0 };

io.on('connection', (socket) => {
    // Envia o que está passando agora para quem acabou de entrar
    socket.emit('sincronizarEntrada', estadoVideo);

    socket.on('mudarVideo', (dados) => {
        estadoVideo = dados;
        io.emit('trocarVideoTodos', estadoVideo);
    });

    // Atualiza o tempo global para novos usuários
    socket.on('tempoAtual', (t) => { estadoVideo.tempo = t; });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Rodando em http://localhost:${PORT}`));
