const express = require("express");

// helpers
const Posts = require("../posts/postDb.js");

// custom middleware
const { validatePostId } = require("../api/middlewares/postMiddleware.js");

const router = express.Router();

router.get("/", (req, res) => {
  Posts.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(400).json({ errorMessage: err.message });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  const { id } = req.params;

  Posts.getById(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(404).json({ errorMessage: err.message });
    });
});

router.delete("/:id", validatePostId, (req, res) => {
  const { id } = req.params;

  Posts.getById(id)
    .then(post => {
      Posts.remove(id)
        .then(deleted => {
          res.status(200).json(post);
        })
        .catch(err => {
          res.status(400).json({ errorMessage: "Post can't be deleted" });
        });
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message });
    });
});

router.put("/:id", (req, res) => {
  // do your magic!
});

module.exports = router;
