const express = require('express');
const { SerialPort } = require('serialport');  // Desestructuración correcta

// Crea una instancia de Express
const app = express();
const port = 3000;  // El puerto en el que estará corriendo tu servidor

// Configura el puerto serial (ajusta el puerto según tu configuración)
const serialPort = new SerialPort({
  path: 'COM5',  // Cambia 'COM5' por el puerto correcto en tu sistema
  baudRate: 9600
});

// Verifica si el puerto serial está abierto y luego maneja las comunicaciones
serialPort.on('open', () => {
  console.log('Puerto serial abierto');
}).on('error', (err) => {
  console.log('Error en puerto serial:', err);
});

// Define la ruta a la que accederás para enviar "Hola"
app.get('/hola', (req, res) => {
  console.log('Ruta /hola accedida');

  // Asegúrate de que el puerto serial esté abierto antes de escribir
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
