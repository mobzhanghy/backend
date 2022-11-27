const Tutorial = require("../models/tutorial.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Tutorial
  const tutorial = new Tutorial({
    name: req.body.name,
    desc: req.body.desc,
    star: req.body.star || false,
    start: req.body.start,
    end: req.body.end,
    author: req.body.author
  });



  // Save Tutorial in the database
  Tutorial.create(tutorial, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    else res.send(data);
  });
};

// Login
exports.login = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const user = {
    username: req.body.username,
    password: req.body.password
  }

  Tutorial.login(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    else res.send(data);
  });
}

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Tutorial.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Find a single Tutorial by Name
exports.findOne = (req, res) => {
  Tutorial.findByName(req.params.name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with name ${req.params.name}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tutorial with name " + req.params.name
        });
      }
    } else res.send(data);
  });
};

// Find a group of Tutorials by Group
exports.findGroup = (req, res) => {
  Tutorial.findByGroup(req.params.group, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with group ${req.params.group}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tutorial with group " + req.params.group
        });
      }
    } else res.send(data);
  });
};

exports.createWithGroup = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Tutorial
  const tutorial = new Tutorial({
    name: req.body.name,
    desc: req.body.desc,
    star: req.body.star || false,
    start: req.body.start,
    end: req.body.end,
    author: req.body.author,
  });

  //arrayify the group
  const groups = req.body.groups.split(",");
  // Save Tutorial in the database
  for (let i = 0; i < groups.length; i++) {
    Tutorial.createWithGroup(tutorial, groups[i], (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      //else res.send(data);
    });
  }
};

// Find a single Tutorial by Name and Group
exports.findByNameAndGroup = (req, res) => {
  Tutorial.findByNameAndGroup(req.params.name, req.params.group, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with name ${req.params.name}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tutorial with name " + req.params.name
        });
      }
    } else res.send(data);
  });
}


exports.addCredit = (req, res) => {
  Tutorial.addCredit(req.params.name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with name ${req.params.name}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tutorial with name " + req.params.name
        });
      }
    } else res.send(data);
  });
}

exports.getRank = (req, res) => {
  Tutorial.getRank((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with name ${req.params.name}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tutorial with name " + req.params.name
        });
      }
    } else res.send(data);
  });
}
