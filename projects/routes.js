const { Router } = require('express');
const Project = require('./model');
const ToDo = require('../todos/model');
const auth = require('../auth/middleware');

const router = new Router();

router.get('/projects', (req, res, next) => {
  // if there is no limit from query than take 5
  const limit = req.query.limit || 5;
  const offset = req.query.offset || 0;

  Promise.all([
    Project.count(),
    Project.findAll({ limit, offset })
  ])
    .then(([total, projects]) => {
      res.send({ projects, total })
    })
    .catch(error => next(error))
});

 // before you exectu the func, first execute the middleware, if returns true
router.get('/projects/:id', auth, (req, res, next) => {
  Project
    .findById(req.params.id, { include: [ToDo] })
    .then(project => {
      if (!project) {
        return res.status(404).send({
          message: `Project does not exist`
        })
      }
      return res.send(project)
    })
    .catch(error => next(error))
});

router.post('/projects', auth, (req, res, next) => {
  Project
    .create(req.body)
    .then(project => {
      if (!project) {
        return res.status(404).send({
          message: `Project does not exist`
        })
      }
      return res.status(201).send(project)
    })
    .catch(error => next(error))
});

router.delete('/projects/:id', auth, (req, res, next) => {
  Project
    .findById(req.params.id)
    .then(project => {
      if (!project) {
        return res.status(404).send({
          message: `Project does not exist`
        })
      }
      return project.destroy()
        .then(() => res.send({
          message: `Project was deleted`
        }))
    })
    .catch(error => next(error))
})

module.exports = router;