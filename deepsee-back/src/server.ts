import express from 'express';

const app = express();
const port = 3000;

app.get('/api/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/hello', (req, res) => {
  res.send('Hello Woooooooooooooooooorld!');
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
