const express = require("express");
const hamsterRoutes = express.Router();
// connect till db
const dbo = require("../db/connect");
// Detta hjälper att konvertera id från en
// sträng till ett objekt-id (_id)
const ObjectId = require("mongodb").ObjectId;

// Här får man en lista på alla hamstarar
hamsterRoutes.route("/hamsters").get(function (req, res) {
  let db_connect = dbo.getDb("HamstersDb");
  db_connect
    .collection("Hamsters")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Här får man enbart en hamster via id
hamsterRoutes.route("/hamster/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = {
    _id: ObjectId(req.params.id),
  };
  db_connect.collection("Hamsters").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result)
    res.status(404)
    
  });

});

// Här skapap man en ny hamster
hamsterRoutes.route("/hamsters").post(function (req, response) {
  let db_connect = dbo.getDb();
  let newHamster = {
    name: req.body.name,
    age: req.body.age,
    imgName: req.body.imgName,
    favFood: req.body.favFood,
    loves: req.body.loves,
    // Noll från början
    wins: 0,
    defeats: 0,
    games: 0,
  };
  db_connect.collection("Hamsters").insertOne(newHamster, function (err) {
    if (err) {
      response.status(404).json(err)
    } else {
      response.status(200).json(newHamster)
      
    }
  });
});

// Här man uppdatera hamsterns poänglista via id
hamsterRoutes.route("/hamsters/:id").put(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = {
    _id: ObjectId(req.params.id),
  };
  let updatedHamster = {
    $set: {
      wins: req.body.wins,
      defeats: req.body.defeats,
      games: req.body.games,
    },
  };
  db_connect
    .collection("Hamsters")
    .updateOne(myquery, updatedHamster, function (err, result) {
      if (err) throw err;
      res.status(404)
      res.json(result)
    });
});

// Här tar man bort en hamster via id
hamsterRoutes.route("/hamsters/delete/:id").delete(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = {
    _id: ObjectId(req.params.id),
  };
  db_connect.collection("Hamsters").deleteOne(myquery, function (err, result) {
    if (err) throw err;
    res.status(200).json(result);
   
  });
});

// Här väljer man ett slumpat hamseter objekt
hamsterRoutes.route("/hamsters/random").get(function (req, res) {
  let db_connect = dbo.getDb("HamstersDb");
  db_connect
    .collection("Hamsters")
    .find({})
    .toArray(function (err, result) {
      //göra kopia på hamster array
      let hamstersArray = [...result];
      //id på första hamstern
      let hamsterOneId = Math.floor(Math.random() * result.length);
      //spara hamster i variabel
      let randomHamsterOne =
        hamstersArray[Math.floor(Math.random() * result.length)];
      //ta bort hamstern från listkopian
      //för att den inte ska råka komma med igen som motståndare
      console.log(randomHamsterOne);
      hamstersArray.splice(hamsterOneId, 1);
      let randomHamsterTwo =
        hamstersArray[Math.floor(Math.random() * result.length)];
      //spara båda hamstrarna i en lista som vi returnerar till frontenden
      let randomHamsters = [randomHamsterOne, randomHamsterTwo];
      if (err) throw err;
      res.json(randomHamsters);
    });
});
module.exports = hamsterRoutes;
