var db = require("../models");
var passport = require("../config/passport");

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
      console.log(dbUserCards + "card");
      // returning handlebars object
      let getAllUser = {
        
        userReceipts: dbUserCards
      };

      res.render("index", getAllUser);
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
    }).then(function(dbFindUser) {

      // returning the data as a handlebar object to use in our handlebars files
      res.json(dbFindUser);

      let findUserObj = {
        findUser: dbFindUser
      };
      res.render("index",findUserObj);
      res.render("addReciepts", findUserObj);
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
        model: db.Receipts
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

  // gets all Receipts
  app.get("/api/receipt", function(req, res) {

    db.Receipts.findAll({}).then(function(dbReceiptsList) {
      // returning json object to test route using postman
      res.json(dbReceiptsList);

      // returning handlebars object
      // let hbsObject = {
      //   userReceipts: dbUserReceipts
      // };
      // res.render("example", hbsObject);
    });
  });

  // +++++++++ POST CALLS +++++++++
  // create a user information
  // app.post("/api/user", function(req, res) {
  //   // set the new username and password to the input
  //   db.Users.create(req.body).then(function(dbUserLogIn) {
  //     res.json(dbUserLogIn);
  //     console.log("dbUserLogin: "+dbUserLogIn);
  //     let createUserObject = {
  //       userLogIn: dbUserLogIn
  //     };
  //     res.render("index",createUserObject);
  //   });
  // });

  // adding card
  app.post("/api/card", function(req, res) {
    db.Cards.create({
          UserId: req.body.userId,
          card_number: req.body.card_number,
      }).then(function(dbCardCreate) {
      res.json(dbCardCreate);

      let createCardObj = {
        cardCreate: dbCardCreate
      };
      res.render("addReceipt",createCardObj);

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
  app.delete("/api/card/:id", function (req, res){
    db.Cards.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbCardsRemove){
      res.json(dbCardsRemove);
    });
  });

  // delete receipt
  app.delete("/api/receipt/:id", function (req, res){
    db.Receipts.destroy({
      where: {
        id:req.params.id
      }
    }).then(function(dbReceiptsRemove){
      res.json(dbReceiptsRemove);
    });
  });

// ++++++++++++  PASSPORT - AUTHENTICATION ++++++++++++++++++
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
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

  // // Route for getting some data about our user to be used client side
  // app.get("/api/user_data", function(req, res) {
  //   if (!req.user) {
  //     // The user is not logged in, send back an empty object
  //     res.json({});
  //   } else {
  //     // Otherwise send back the user's email and id
  //     // Sending back a password, even a hashed password, isn't a good idea
  //     res.json({
  //       email: req.user.email,
  //       id: req.user.id
  //     });
  //   }
  // });

  // +++++++++++ PUT REQUESTS ++++++++
  // nice to have
};
