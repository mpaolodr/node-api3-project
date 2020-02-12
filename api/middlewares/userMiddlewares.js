const Users = require("../../users/userDb");

function validateUserId(req, res, next) {
  const { id } = req.params;

  Users.getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "Invalid user Id" });
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message });
    });
}

function validateUser(req, res, next) {
  const userData = req.body;
  if (userData) {
    if (userData.name) {
      next();
    } else {
      res.status(400).json({ errorMessage: "missing required name field" });
    }
  } else {
    res.status(400).json({ message: "missing user data" });
  }
}

function validatePost(req, res, next) {
  const postData = req.body;
  if (postData) {
    if (postData.text) {
      next();
    } else {
      res.status(400).json({ message: "missing required text field" });
    }
  } else {
    res.status(400).json({ message: "missing post data" });
  }
}

module.exports = {
  validateUserId,
  validateUser,
  validatePost
};
