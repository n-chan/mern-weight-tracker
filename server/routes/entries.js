const router = require("express").Router();
let Entry = require("../models/entry");

router.route("/").get((req, res) => {
  Entry.find()
    .then((entries) => res.json(entries))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/:username").get(function (req, res) {
  return Entry.find({ username: req.params.username })
    .then((entries) => res.json(entries))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const weight = Number(req.body.weight);
  const date = Date.parse(req.body.date);

  const newEntry = new Entry({
    username,
    weight,
    date,
  });

  newEntry.save(function (err, result) {
    if (err) {
      return res.json("Error when adding!");
    } else {
      return res.json(result);
    }
  });
});

router.route("/:id").get((req, res) => {
  Entry.findById(req.params.id)
    .then((entry) => res.json(entry))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/last/:weight").get(function (req, res) {
  console.log(req.params.weight);
  return Entry.find({ weight: req.params.weight }).then(function (entry) {
    console.log(entry);
    return res.json(entry);
  });
});

router.route("/:id").delete((req, res) => {
  Entry.findByIdAndDelete(req.params.id)
    .then(() => res.json("Entry deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").put(function (req, res) {
  return Entry.findById(req.params.id)
    .then(function (entry) {
      entry.username = entry.username;
      entry.weight = Number(req.body.weight);
      entry.date = Date.parse(req.body.date);

      entry
        .save()
        .then(() => res.json("Entry updated!"))
        .catch((err) => res.status(400).json("Error " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
