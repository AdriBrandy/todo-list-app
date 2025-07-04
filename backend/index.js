
const express = require('express');
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
} = require('./tasks');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rutas de la API
app.get('/api/tasks', getAllTasks);
app.post('/api/tasks', createTask);
app.put('/api/tasks/:id', updateTask);
app.delete('/api/tasks/:id', deleteTask);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
