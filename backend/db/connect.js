const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;

const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      //Kolla så vi fick in ett bra db-objekt
      if (db) {
        _db = db.db("HamstersDb");
        console.log("Gick bra");
      }
      return callback(err);
    });
  },
  getDb: function () {
    return _db;
  },
};