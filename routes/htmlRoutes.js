var db = require("../models");

module.exports = function(app) {
  // Load index page - log in page
  app.get("/", function(req, res) {
    res.render("index", {});
  });

  // posting new user credentials
  app.post("/", function(req, res){
    db.Users.create(req.body).then(function(dbNewUser){
      res.json(dbNewUser);
    });
  });

  // Load "logged in" page and pass in the id of the user 
  app.get("/addReceipt/:id", function(req, res) {
    db.Users.findOne({ 
      where: { 
        id: req.params.id 
      } 
    }).then(function(dbLoggedIn) {
      // console.log(dbLoggedIn.dataValues);

      let addReceiptObj = {
        id: dbLoggedIn.dataValues.id,
        username: dbLoggedIn.dataValues.username,
        password: dbLoggedIn.dataValues.password
      };

      res.render ("addReceipt", addReceiptObj);
    });
    
  });

  // Load card display
  app.get("/viewReceipt/:userId", function(req, res) {
    db.Users.findOne({ 
      where: { 
        id: req.params.userId 
      },
      include: {
        // returns the all the cards associated with the userid
        model: db.Cards,
        attributes: ["card_number"]
      }
    }).then(function(dbLoadCards) {
      // console.log(dbLoadCards.dataValues);
      
      let loadCardObj = {
        id: dbLoadCards.dataValues.id,
        username: dbLoadCards.dataValues.username,
        password: dbLoadCards.dataValues.password,
        // create loop for showing all cards
        cards: dbLoadCards.dataValues.Cards[0].dataValues.card_number
      };

      res.render ("loadCards", loadCardObj);
      // console.log(loadCardObj.cards);
    });
    
  });

  app.get("/settings/:userId", function (req, res) {
    db.Users.findOne({
      where: {
        id: req.params.userId
      },
      include:{
        model: db.Cards,
        attributes:["card_number"]
      }
    }).then(function(dbUserSetting) {
      // console.log(dbUserSetting.dataValues);
      let hbsObject = {
        id: dbUserSetting.dataValues.id,
        username: dbUserSetting.dataValues.username,
        password: dbUserSetting.dataValues.password,
        cards: dbUserSetting.dataValues.Cards
      };
      // console.log(hbsObject);
      // console.log(hbsObject.id);
      res.render("setting", hbsObject);
    });
  });

    // Creating User page
    app.get("/createUser", function(req, res) {
      res.render("createUser", {});
    });
  
    // posting new user credentials
    app.post("/createUser", function(req, res){
      db.Users.create();
    });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
