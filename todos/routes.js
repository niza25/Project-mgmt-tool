const { Router } = require('express');
const ToDo = require('./model')

const router = new Router();

router.get('/todos', (req, res, next) => {
  const limit = req.query.limit || 25;
  const offset = req.query.offset || 0;

  Promise.all([
    ToDo.count(),
    ToDo.findAll({ limit, offset })
  ])
    .then(([total, todos]) => {
      res.send({ todos, total })
    })
    .catch(error => next(error))
});

router.get('/todos/:id', (req, res, next) => {
  ToDo
    .findById(req.params.id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send({
          message: `ToDo does not exist`
        })
      }
      return res.send(todo)
    })
    .catch(error => next(error))
});

router.post('/todos', (req, res, next) => {
  ToDo
    .create(req.body)
    .then(todo => {
      if (!todo) {
        return res.status(404).send({
          message: `ToDo does not exist`
        })
      }
      return res.status(201).send(todo)
    })
    .catch(error => next(error))
});

router.delete('/todos/:id', (req, res, next) => {
  ToDo
    .findById(req.params.id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send({
          message: `ToDo does not exist`
        })
      }
      return todo.destroy()
        .then(() => res.send({
          message: `ToDo was deleted`
        }))
    })
    .catch(error => next(error))
})

module.exports = router;