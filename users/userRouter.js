const express = require("express");

// helpers
const Users = require("../users/userDb.js");
const Posts = require("../posts/postDb.js");

// users custom middleware
const {
  validateUserId,
  validateUser,
  validatePost
} = require("../api/middlewares/userMiddlewares.js");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  const userData = req.body;

  Users.insert(userData)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  const user_id = req.user.id;
  const postData = { ...req.body, user_id };

  Posts.insert(postData)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message });
    });
});

router.get("/", (req, res) => {
  // do your magic!
});

router.get("/:id", (req, res) => {
  // do your magic!
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

module.exports = router;
