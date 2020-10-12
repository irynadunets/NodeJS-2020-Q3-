const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router
  .route('/')
  .get(async (req, res) => {
    try {
      const tasks = await tasksService.getTasksByBoard(req.params.boardId);
      res.status(200).json(tasks.map(Task.toResponse));
   } catch (e) {
     res.status(404).send(e.message);
   }
  })
  .post(async (req, res) => {
    try {
      const { boardId } = req.params;
      const task = await tasksService.create({ ...req.body, boardId });
      res.status(200).json(Task.toResponse(task));
    } catch (e) {
      res.status(404).send(e.message);
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const task = await tasksService.get(req.params.id);
      if (task) {
        res.status(200).json(Task.toResponse(task));
      } else {
        throw new Error(404, `Task with id ${req.params.id} was not found`);
      }
   } catch (e) {
    res.status(404).send(e.message);
   }
  })
  .put(async (req, res) => {
    try {
      const task = await tasksService.update(req.params.boardId, req.params.id, req.body);
      if (task) {
        res.status(200).json(Task.toResponse(task));
      } else {
        throw new Error(404, `Task with id ${req.params.id} was not found`);
      }
    } catch (e) {
     res.status(400).send(e.message);
   }
  })
  .delete(async (req, res) => {
    const deleted = await tasksService.remove(req.params.id);
    if (deleted) {
      res.status(204).send('The task has been deleted');
    } else {
      throw new Error(404, `Task with id ${req.params.id} was not found`);
    }
  });
module.exports = router;
