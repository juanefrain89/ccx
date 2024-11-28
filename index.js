// server-prod.js (Servidor de Producción)
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);  // Inicializar Socket.IO con el servidor HTTP

app.get("/", (req, res)=>{
    res.send("jdj")
  })

// Endpoint para cuando se detecte un cambio en producción
app.post('/update', (req, res) => {
    // Emitir un evento a todos los clientes conectados
    io.emit('update-notification', { message: 'El código ha sido actualizado en producción!' });
    res.send('Actualización enviada a los clientes.');
});

// Escuchar en el puerto 3000
server.listen(3000, () => {
    console.log('Servidor de producción escuchando en el puerto 3000');
});
