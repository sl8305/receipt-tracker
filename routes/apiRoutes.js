var db = require("../models");

module.exports = function(app) {

  // ++++++++++ GET CALLS ++++++++++++
  // gets all users and returns their assosiated cards
  app.get("/api/user", function(req, res) {
    // we are finding the all users. 
    // we are 'including' all the cards under all users.
    db.Users.findAll({
      include: [db.Cards]
    }).then(function(dbUserCards) {
      // returning json object to test route using postman
      res.json(dbUserCards);

      // returning handlebars object
      // let hbsObject = {
      //   userReceipts: dbUserReceipts
      // };
      // res.render("example", hbsObject);
    });
  });

  // get specific user and return their cards 
  app.get("/api/user/:id", function(req, res) {
    // we are finding the user that matches the input id. 
    // we are 'including' all the cards under this user id.
    db.Users.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        // returns the all the cards associated with the userid
        model: db.Cards,
        attributes: ["card_number"]
      }
    }).then(function(dbUserCards) {

      // returning the data as a handlebar object to use in our handlebars files
      res.json(dbUserCards);
      // let hbsObject = {
      //   userReceipts: dbUserCards
      // };
      // res.render("example", hbsObject);
    });
  });

   // gets all cards and returns their assosiated receipts
   app.get("/api/card", function(req, res) {
    // we are finding the all Cards. 
    // we are 'including' all the receipts under all Cards.
    db.Cards.findAll({
      include: [db.Receipts]
    }).then(function(dbCardsReceipts) {
      // returning json object to test route using postman
      res.json(dbCardsReceipts);

      // returning handlebars object
      // let hbsObject = {
      //   userReceipts: dbUserReceipts
      // };
      // res.render("example", hbsObject);
    });
  });

  // get specific card and return all receipts associated to that card #
  app.get("/api/card/:card_number", function(req, res) {
    // we are finding the user that matches the input id. 
    // we are 'including' all the cards under this user id.
    db.Cards.findOne({
      where: {
        card_number: req.params.card_number
      },  
      include: {
        // returns the all the receipts associated with the userid
        model: db.Receipts,
        // attributes: ["store_name", "purchase_date", "total_cost", "category"]
      }
    }).then(function(dbCardReceipts) {

      // returning the data as a handlebar object to use in our handlebars files
      res.json(dbCardReceipts);
      // let hbsObject = {
      //   userReceipts: dbCardReceipts
      // };
      // res.render("example", hbsObject);
    });
  });



  // +++++++++ POST CALLS +++++++++
  // create a user information
  app.post("/api/user", function(req, res) {
    // set the new username and password to the input
    console.log("name: " +req.body.username + " password: " + req.body.password + " id: " + req.body.userId);
    db.Users.create(req.body).then(function(dbUserLogIn) {
      console.log(dbUserLogIn);
      res.json(dbUserLogIn);
      
      // let hbsObject = {
      //   userLogIn: dbUserLogIn
      // };
      // res.render("example",hbsObject);
    });
  });

  // adding card
  app.post("/api/card", function(req, res) {
    db.Cards.create({
          UserId: req.body.userId,
          card_number: req.body.card_number,
      }).then(function(dbUserLogIn) {
      res.json(dbUserLogIn);

    });
  });


  // adding receipt
  app.post("/api/receipt", function(req, res) {
    db.Receipts.create({
      store_name: req.body.store_name,
      purchase_date: req.body.purchase_date,
      total_cost: req.body.total_cost,
      category: req.body.category,
      CardId: req.body.cardId
      }).then(function(dbUserLogIn) {
      res.json(dbUserLogIn);

    });
  });



  // ++++++++ DELETE POSTS ++++++++++
  // delete a user information
  app.delete("/api/user/:id", function(req, res) {
    db.Users.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUsersRemove) {
      res.json(dbUsersRemove);

      
      // let hbsObject = {
      //   userRemove: dbUsersRemove
      // };
      // res.render("example",hbsObject);
    });
  });

  // delete card

  // delete receipt

  // +++++++++++ PUT REQUESTS ++++++++
};
