const { randomUUID } = require('crypto'); //Módulo 'crypto' para generar IDs únicos

let tasks = []; // Array para almacenar las tareas en memoria

//---------------------------------------- Funciones para manejar las tareas-----------------------------------------

// Obtiene todas las tareas
function getAllTasks(req, res) {
  res.json(tasks);
}

// Crea una nueva tarea
function createTask(req, res) {
  const { title, description } = req.body; // Extrae el título y la descripción del cuerpo de la solicitud
  if (!title || !description) {
    return res.status(400).json({ message: 'Título y descripción son obligatorios' });
  }
  const newTask = {
    id: randomUUID(), // Genera un ID único para la tarea
    title,
    description,
    completed: false,
    createAt: new Date() // Fecha de creación de la tarea
  };
  tasks.push(newTask); // Añade la nueva tarea al array de tareas
  res.status(201).json(newTask); // Responde con la tarea creada y un código de estado 201 (Creado)
}

// Actualiza una tarea existente
function updateTask(req, res) {
  const { id } = req.params; // Extrae el ID de la tarea de los parámetros de la solicitud
  const { title, description, completed } = req.body; // Extrae los campos a actualizar del cuerpo de la solicitud
  if (!title && !description && completed === undefined) {
    return res.status(400).json({ message: 'Al menos un campo debe ser actualizado' });
  }
  const task = tasks.find(t => t.id === id); // Busca la tarea por su ID
  if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

  task.title = title ?? task.title;
  task.description = description ?? task.description;
  task.completed = completed ?? task.completed;

  res.json(task);
}

// Elimina una tarea existente
function deleteTask(req, res) {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id === id); // Busca el índice de la tarea por su ID
  if (index === -1) return res.status(404).json({ message: 'Tarea no encontrada' }); // Si no se encuentra la tarea, responde con un error 404
  // Elimina la tarea del array
  tasks.splice(index, 1);
  res.status(204).send();
}

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
};
