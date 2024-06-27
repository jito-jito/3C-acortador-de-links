import express from 'express';

const app = express();
const port = 3000;

app.get('/generate-url', (req, res) => {
  try {
    res.send('Hello, TypeScript with Express!');
  } catch (error) {
    res.send('error')
  }
 
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// rutas protegidas con auth
// servicio post que recibe url principal y retorna url acortada