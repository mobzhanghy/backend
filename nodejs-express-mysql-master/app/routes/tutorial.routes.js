module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", tutorials.create);

  router.get("/addCredit/:name",tutorials.addCredit);

  router.post("/withGroup", tutorials.createWithGroup);

  // Retrieve all Tutorials
  router.get("/", tutorials.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:name", tutorials.findOne);

  router.post("/login", tutorials.login);

  router.get("/group/:group", tutorials.findGroup);

  router.get("/nameGroup/:name/:group",tutorials.findByNameAndGroup);

  router.get("/rank/rank",tutorials.getRank);

 

  app.use('/api/tutorials', router);
};
