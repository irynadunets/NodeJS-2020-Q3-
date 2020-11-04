const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { notFound, ValidationError } = require('../../common/validationError');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const users = await usersService.getAll();
      res.status(200).json(users.map(User.toResponse));
   } catch (e) {
     if (e instanceof ValidationError) {
       res.status(e.status).send(e.text);
     }
     next(e);
  }
  })
  .post(async (req, res, next) => {
    try {
      const user = await usersService.create(req.body);
      res.status(200).json(User.toResponse(user));
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
      const user = await usersService.get(req.params.id);
    if (user) {
      res.status(200).json(User.toResponse(user));
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
      const user = await usersService.update(req.params.id, req.body);
      if (user) {
        res.status(200).json(User.toResponse(user));
      } else {
        throw new ValidationError();
      }
    } catch (e) {
      if (e instanceof ValidationError) {
        res.status(e.status).send(e.text);
      }
      next(e);
   }
  })
  .delete(async (req, res, next) => {
     const user = await usersService.remove(req.params.id);
     if (user) {
      res.status(204).send();
    } else {
      res.status(notFound).send();
    }
  });

module.exports = router;
