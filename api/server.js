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
  const message = { message: process.env.MESSAGE };
  res.status(200).json({ message });
});

module.exports = server;
