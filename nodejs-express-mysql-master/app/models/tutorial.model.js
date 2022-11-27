const sql = require("./db.js");

// constructor
const Tutorial = function (tutorial) {
  this.name = tutorial.name;
  this.desc = tutorial.desc;
  this.star = tutorial.star;
  this.start = tutorial.start;
  this.end = tutorial.end;
  this.author = tutorial.author;
};

Tutorial.create = (newTutorial, result) => {
  sql.query("INSERT INTO projects SET ?", newTutorial, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created project: ", { id: res.insertId, ...newTutorial });
    result(null, { id: res.insertId, ...newTutorial });
  });
};


Tutorial.login = (user, result) => {
  sql.query("SELECT * FROM users WHERE username = ? AND password = ?", [user.username, user.password], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res);
      return;
    }

    // not found user
    result({ kind: "not_found" }, null);
  });
};

Tutorial.findByName = (name, result) => {
  //query from tables with "projects" prefix
  sql.query(`SELECT * FROM projects WHERE name = '${name}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found project: ", res[0]);
      result(null, res);
      return;
    }

    // not found Tutorial with the name
    result({ kind: "not_found" }, null);
  });
};

Tutorial.getAll = (title, result) => {
  let query = "SELECT * FROM projects";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("project: ", res);
    result(null, res);
  });
};

Tutorial.findByGroup = (group, result) => {
  sql.query(`SELECT * FROM projects_${group}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found project: ", res);
      result(null, res);
      return;
    }

    // not found Tutorial with the name
    result({ kind: "not_found" }, null);
  });

};

Tutorial.createWithGroup = (newTutorial, groupName, result) => {
  sql.query(`INSERT INTO projects_${groupName} SET ?`, newTutorial, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created project: ", { id: res.insertId, ...newTutorial });
    result(null, { id: res.insertId, ...newTutorial });
  });
};

Tutorial.findByNameAndGroup = (name, group, result) => {
  //query from tables with "projects" prefix
  sql.query(`SELECT * FROM projects_${group} WHERE name = '${name}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found project: ", res[0]);
      result(null, res);
      return;
    }

    // not found Tutorial with the name
    result({ kind: "not_found" }, null);
  });
};


Tutorial.addCredit = (name, result) => {

  //query from users table, fine the user with the name and add 1 credit
  sql.query(`UPDATE users SET credit = credit + 1 WHERE username = '${name}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found project: ", res[0]);
      result(null, res);
      return;
    }

    // not found Tutorial with the name
    result({ kind: "not_found" }, null);
  }
  );
};

Tutorial.getRank = (result) => {
  sql.query(`SELECT * FROM users ORDER BY credit DESC`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found project: ", res[0]);
      result(null, res);
      return;
    }

    // not found Tutorial with the name
    result({ kind: "not_found" }, null);
  });
};




module.exports = Tutorial;
