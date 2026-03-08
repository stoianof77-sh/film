const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

let conteudoAtual = ""; // Guarda o último iframe enviado

io.on('connection', (socket) => {
    // Envia o filme atual para quem acabou de conectar
    socket.emit('atualizarTela', conteudoAtual);

    socket.on('enviarEmbed', (html) => {
        conteudoAtual = html;
        io.emit('atualizarTela', conteudoAtual);
    });
});

server.listen(3000, () => console.log("🚀 Rodando em http://localhost:3000"));
