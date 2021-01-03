const router = require("express").Router();
let User = require("../models/user");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/:username").get((req, res) => {
  User.find({ username: req.params.username }).then(function (result) {
    if (result.length == 0) {
      return res.status(400).json("User does not exists.");
    } else {
      return res.json(result);
    }
  });
});

router.route("/add").post((req, res) => {
  User.find({ username: req.body.username }).then(function (result) {
    if (result.length === 0) {
      const username = req.body.username;
      const newUser = new User({ username });
      newUser
        .save()
        .then(() => res.json("User added"))
        .catch((err) => res.status(400).json("Error " + err));
    } else {
      return res.status(400).json("Already exists.");
    }
  });
});

module.exports = router;
