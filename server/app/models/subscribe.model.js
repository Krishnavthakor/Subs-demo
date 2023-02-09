const sql = require("./db.js");

// constructor
const Subscribe = function (subscribe) {
  this.name = subscribe.name;
  this.email = subscribe.email;
};

Subscribe.create = (subscribe, result) => {
  sql.query("INSERT INTO subscribe SET ?", subscribe, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...subscribe });
  });
};

module.exports = Subscribe;
