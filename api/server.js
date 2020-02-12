const express = require("express");
const helmet = require("helmet");

const server = express();

// middleware
server.use(express.json());
server.use(helmet());

server.get("/", (req, res) => {
  res.sendStatus(200);
});

module.exports = server;
