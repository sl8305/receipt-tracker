var db = require("../models");
var isAuthenticated = require("../config/isAuthenticated");

module.exports = app => {
    // Load "logged in" page and pass in the id and name of the user 
    app.get("/addReceipt/:id", isAuthenticated, function(req, res) {
        db.Users.findOne({ 
            where: { 
                id: req.params.id 
            } 
        }).then(function(dbLoggedIn) {
            
            // returning the username and id of the logged in user
            let addReceiptObj = {
                id: dbLoggedIn.dataValues.id,
                username: dbLoggedIn.dataValues.username
            };

            res.render ("addReceipt", addReceiptObj);
        });
    });

    // Load card display - passes the user id, username and cards associated
    app.get("/viewReceipt/:userId", isAuthenticated, function(req, res) {
        db.Users.findOne({ 
            where: { 
                id: req.params.userId 
            },
            include: {
                // returns the all the cards associated with the userid
                model: db.Cards,
                attributes: ["card_number","id"]
            }
        }).then(function(dbLoadCards) {
            let loadCardObj = {
                id: dbLoadCards.dataValues.id,
                username: dbLoadCards.dataValues.username,
                // pass in array of cards
                cards: dbLoadCards.dataValues.Cards 
            };

            res.render ("loadCards", loadCardObj);
        });
    });

    // Passes the user's id, username, password and cards 
    app.get("/settings/:userId", isAuthenticated, function (req, res) {
        db.Users.findOne({
            where: {
                id: req.params.userId
            },
            include:{
                model: db.Cards,
                attributes:["card_number"]
            }
        }).then(function(dbUserSetting) {
        let hbsObject = {
            id: dbUserSetting.dataValues.id,
            username: dbUserSetting.dataValues.username,
            password: dbUserSetting.dataValues.password,
            cards: dbUserSetting.dataValues.Cards
        };
        // renders to the handlebars page "setting"
        res.render("setting", hbsObject);
        });
    });
}