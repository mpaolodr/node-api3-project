const express = require("express");
const helmet = require("helmet");

// routers
const postRouter = require("../posts/postRouter.js");
const userRouter = require("../users/userRouter.js");

// custom middleware imports
const { logger } = require("./middlewares/globalMiddleware");

const server = express();

// middleware
server.use(express.json());
server.use(helmet());
server.use(logger);

server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.status(200).end();
});

module.exports = server;
