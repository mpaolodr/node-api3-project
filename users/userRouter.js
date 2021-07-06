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
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  const { id } = req.user;

  Users.getById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  const { id } = req.user;

  Users.getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  const { id } = req.user;

  Users.remove(id)
    .then(success => {
      res.status(200).json(req.user);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message });
    });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  const { id } = req.user;
  const userData = req.body;

  Users.update(id, userData)
    .then(success => {
      Users.getById(id)
        .then(updatedUser => {
          res.status(200).json(updatedUser);
        })
        .catch(err => {
          res.status(500).json({ errorMessage: err.message });
        });
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message });
    });
});

module.exports = router;
