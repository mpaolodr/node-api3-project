const Posts = require("../../posts/postDb.js");

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;

  Posts.getById(id)
    .then(post => {
      if (post) {
        next();
      } else {
        res.status(404).json({ errorMessage: "Post not found" });
      }
    })
    .catch(err => {
      res.status(404).json({ errorMessage: "Post not found" });
    });
}

module.exports = {
  validatePostId
};
