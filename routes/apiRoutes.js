var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {

  // GET all users + associated cards
  app.get("/api/user", function(req, res) {
    db.Users.findAll({
      include: [db.Cards]
    }).then(function(dbUserCards) {
      // returns all user objects and includes the cards associated to each user
      res.json(dbUserCards);
    });
  });

  // GET specific user and return their cards 
  app.get("/api/user/:id", function(req, res) {
    db.Users.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        // returns the all the cards associated with the userid
        model: db.Cards,
        attributes: ["card_number", "id"]
      }
    }).then(function(dbFindUser) {
      res.json(dbFindUser);
    });
  });

  // GET all cards and returns their assosiated receipts
  app.get("/api/card", function(req, res) {
    db.Cards.findAll({
      include: [db.Receipts]
    }).then(function(dbShowCards) {
      // console.log(dbShowCards[0].dataValues);
      // returning json object to test route using postman
      res.json(dbShowCards);
    });
  });

  // GET specific card and return all receipts associated to that card #
  app.get("/api/card/:card_number", function(req, res) {
    db.Cards.findOne({
      where: {
        card_number: req.params.card_number
      },  
      include: {
        // returns the all the receipts associated with the userid
        model: db.Receipts
      }
    }).then(function(dbCardReceipts) {

      // returning the data as a handlebar object to use in our handlebars files
      res.json(dbCardReceipts);
    });
  });

  // GET all Receipts
  app.get("/api/receipt", function(req, res) {
    db.Receipts.findAll({}).then(function(dbReceiptsList) {
      // returns all the receipts
      res.json(dbReceiptsList);
    });
  });

  //GET receipts from 
  app.get("/api/receipt", function(req, res) {
    db.Receipts.findOne({
      where: {
        card_number: req.params.card_number
      },  
      include: {
        // returns the all the receipts associated with the userid
        model: db.Receipts
      }

    }).then(function(dbReceiptsList) {
      // returns all the receipts
      res.json(dbReceiptsList);
    });
  });


  // GET Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
      if (!req.user || req.user=== null || req.user === undefined) {
        // The user is not logged in, send back an empty object
        console.log("user isn't logged in");
        res.json({});
      } else {
        console.log("user id: " + req.user.id);
        // Otherwise send back the user's id
        res.json({
          id: req.user.id
        });
      }
  });


  // POST new card
  app.post("/api/card", function(req, res) {
    db.Cards.create({
          UserId: req.body.userId,
          card_number: req.body.card_number,
      }).then(function(dbCardCreate) {
      res.json(dbCardCreate);
    });
  });

  // posting new user credentials
  app.post("/createUser", function(req, res){
    db.Users.create();
  });
  
  // POST new receipt
  // using findOrCreate - creates the input card if it is not already in the databse
  app.post("/api/receipt", function(req, res) {
    // find or create call to estabilish the user's card
    
    db.Cards.findOrCreate({
      
      where: {
        card_number: req.body.card_number
      }, defaults:{
        UserId: req.user.id,
        card_number: req.body.card_number
      }}).then(([card, created]) => {
        // console.log(card.dataValues.id);
        console.log(card.dataValues.card_number);
        console.log(created);

        // create call to post the receipt information under the card' number passed from above

        db.Receipts.create({
          store_name: req.body.store_name,
          purchase_date: req.body.purchase_date,
          total_cost: req.body.total_cost,
          category: req.body.category,
          CardId: card.dataValues.id
          }).then(function(dbCreateReceipt) {
          res.json(dbCreateReceipt);
          console.log("receiptcreated", dbCreateReceipt);
        });
      });  
  });

  // posting new user credentials
  app.post("/", function(req, res){
    db.Users.create(req.body).then(function(dbNewUser){
      res.json(dbNewUser);
    });
  });


  // DELETE a specific user 
  app.delete("/api/user/:id", function(req, res) {
    db.Users.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUsersRemove) {
      res.json(dbUsersRemove);
    });
  });

  // DELETE a specific card
  app.delete("/api/card/:id", function (req, res){
    db.Cards.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbCardsRemove){
      res.json(dbCardsRemove);
    });
  });

  // DELETE a specific receipt
  app.delete("/api/receipt/:id", function (req, res){
    db.Receipts.destroy({
      where: {
        id:req.params.id
      }
    }).then(function(dbReceiptsRemove){
      res.json(dbReceiptsRemove);
    });
  });

  // ++++++++++++  PASSPORT - AUTHENTICATION ++++++++
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely
  // If the user is created successfully, proceed to log the user in, otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.Users.create({
      username: req.body.username,
      password: req.body.password
    })
      .then(function() {
        console.log("logged in");
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
        console.log("error with logging in");
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    console.log("logged out");
    res.redirect("/");
  });

  // +++++++++++ PUT REQUESTS ++++++++
  // nice to have
};
