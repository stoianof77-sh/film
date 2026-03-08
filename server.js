const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

// Memória temporária do servidor
let estadoVideo = {
    url: "",
    tempo: 0,
    estaTocando: false
};

io.on('connection', (socket) => {
    // Envia o estado atual para quem acabou de ligar a página
    socket.emit('sincronizarEntrada', estadoVideo);

    socket.on('mudarVideo', (dados) => {
        estadoVideo = { ...estadoVideo, ...dados };
        io.emit('trocarSrcParaTodos', estadoVideo);
    });

    // Atualiza o tempo global periodicamente enviado pelo "mestre"
    socket.on('atualizarTempoGlobal', (tempo) => {
        estadoVideo.tempo = tempo;
    });
});

server.listen(3000, () => console.log("🚀 Rodando em http://localhost:3000"));
