const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { PrismaClient } = require('@prisma/client');
const path = require('path');

const app = express();
const prisma = new PrismaClient();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/tasks', async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

app.post('/tasks', upload.single('photo'), async (req, res) => {
  const { title, description } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  const task = await prisma.task.create({
    data: { title, description, photo },
  });
  res.status(201).json(task);
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  await prisma.task.delete({ where: { id: parseInt(id) } });
  res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
