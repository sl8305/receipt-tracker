// requires the database models to find data
// sends retrieved data to handlebars 
var db = require("../models");

module.exports = function(app) {
  // Load index page - log in page
  app.get("/", function(req, res) {
    res.render("index", {});
  });

  // Creating User page
  app.get("/createUser", function(req, res) {
    res.render("createUser", {});
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};