const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const { notFound, ValidationError } = require('../../common/validationError');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const boards = await boardsService.getAll();
      res.status(200).json(boards.map(Board.toResponse));
   } catch (e) {
     if (e instanceof ValidationError) {
       res.status(e.status).send(e.text);
     }
     next(e);
  }
  })
  .post(async (req, res, next) => {
    try {
      const board = await boardsService.create(req.body);
      res.status(200).json(Board.toResponse(board));
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
      const board = await boardsService.get(req.params.id);
      if (board) {
        res.status(200).json(Board.toResponse(board));
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
        const board = await boardsService.update(req.params.id, req.body);
        if (board) {
          res.json(Board.toResponse(board));
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
      const deleted = await boardsService.remove(req.params.id, req.body);
      if (deleted) {
        res.status(204).send('The board has been deleted');
      } else {
        res.status(notFound).send();
      }    
    });

  module.exports = router;
