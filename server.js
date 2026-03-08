const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

// Serve os arquivos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Rota para receber a jogada
app.post('/jogar', (req, res) => {
    const dados = req.body;
    console.log("Jogada recebida:", dados);
    // Grita para todos os conectados atualizarem
    io.emit("atualizarDados", dados);
    res.status(200).send("OK");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
