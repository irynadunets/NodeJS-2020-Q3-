const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');
const { notFound, ValidationError } = require('../../common/validationError');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const tasks = await tasksService.getTasksByBoard(req.params.boardId);
      res.status(200).json(tasks.map(Task.toResponse));
   } catch (e) {
     if (e instanceof ValidationError) {
       res.status(e.status).send(e.text);
     }
     next(e);
   }
  })
  .post(async (req, res, next) => {
    try {
      const { boardId } = req.params;
      const task = await tasksService.create({ ...req.body, boardId });
      res.status(200).json(Task.toResponse(task));
    } catch (e) {
      if (e instanceof ValidationError) {
        res.status(e.status).send(e.text);
      }
      next(e);
    }
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const task = await tasksService.get(req.params.id);
      if (task) {
        res.status(200).json(Task.toResponse(task));
      } else {
        throw new ValidationError();
      }
   } catch (e) {
     res.status(notFound).send();
     next(e);
   }
  })
  .put(async (req, res, next) => {
    try {
      const task = await tasksService.update(req.params.boardId, req.params.id, req.body);
      if (task) {
        res.status(200).json(Task.toResponse(task));
      } else {
        throw new ValidationError();
      }
    } catch (e) {
      if (e instanceof ValidationError) {
        res.status(e.status).send(e.text);
      }
      res.status(notFound).send();
      next(e);
   }
  })
  .delete(async (req, res, next) => {
    const deleted = await tasksService.remove(req.params.id);
    if (deleted) {
      res.status(204).send('The task has been deleted');
    } else {
      res.status(notFound).send();
    }    
  });
module.exports = router;
