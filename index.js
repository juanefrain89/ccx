const express = require('express');
const { SerialPort } = require('serialport');  

// Crea una instancia de Express
const app = express();
const port = 3000;  


const serialPort = new SerialPort({
  path: 'COM5',  
  baudRate: 9600
});


serialPort.on('open', () => {
  console.log('Puerto serial abierto');
}).on('error', (err) => {
  console.log('Error en puerto serial:', err);
});


app.get('/hola', (req, res) => {
  console.log('Ruta /hola accedida');


  if (serialPort.isOpen) {
    serialPort.write('Hola\n', (err) => {
      if (err) {
        console.log('Error al enviar datos:', err);
        res.status(500).send('Error al enviar mensaje');
      } else {
        res.send('Mensaje enviado a serial: Hola');
      }
    });
  } else {
    res.status(500).send('El puerto serial no está abierto');
  }
});

// Inicia el servidor en el puerto 3000
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
