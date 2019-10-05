var db = require("../models");

module.exports = function(app) {

  // get for the user information
  app.get("/api/user/:id", function(req, res) {
    // we are finding the user that matches the input id. 
    // we are 'including' all the receipts under this user id
    db.Users.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Receipts]
    }).then(function(dbUserReceipts) {
      // returning the data as a handlebar object to use in our handlebars files
      // res.json(dbUsers);
      let hbsObject = {
        userReceipts: dbUserReceipts
      };
      res.render("example", hbsObject);
    });
  });


  // create a user information
  app.post("/api/user", function(req, res) {
    // set the new username and password to the input
    db.Users.create({
      where: {
        username: req.params.username,
        password: req.params.password
      }
    }).then(function(dbUserLogIn) {
      let hbsObject = {
        userLogIn: dbUserLogIn
      };
      res.render("example",hbsObject);
    });
  });

  // delete a user information
  app.delete("/api/user/:id", function(req, res) {
    db.Users.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUsersRemove) {
      let hbsObject = {
        userRemove: dbUsersRemove
      };
      res.render("example",hbsObject);
    });
  });


  // change a user's information

  // get the receipts of a card #

  // add the receipt to a card #

  // maybe - edit the receipt of a card #

  // delete the receipt of a card #


  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.get("/api/card/:id", function(req, res) {
    db.Receipts.findOne({ where: { card_number: req.params.card_number } }).then(function(dbCard) {
      // res.json(dbUser);
      let hbsObject = {
        card: dbCard
      };
      res.render("example", hbsObject);
    });
  });







};
