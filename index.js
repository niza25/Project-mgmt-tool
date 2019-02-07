const express = require('express');
const bodyParser = require('body-parser');
const projectsRouter = require('./projects/routes');
const todosRouter = require('./todos/routes');
const usersRouter = require('./users/routes');
const authRouter = require('./auth/routes');

const app = express();
const port = process.env.PORT || 4001;

app
// takes functions to be executed first through those routes
.use(bodyParser.json())
.use(authRouter)
.use(usersRouter)
.use(projectsRouter)
.use(todosRouter)
.listen(port, () => console.log(`Listening on port ${port}`));
