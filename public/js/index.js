var passport = require("../../config");


// Get references to page elements
var usernameInput = $("#loginUsername");
var passwordInput = $("#loginPassword");
var $submitBtn = $("#submit");

// The API object contains methods for each kind of request we'll make
// Only posting the userinformation when attempting to log in.
var API = {
  logIn: function(userInfo) {
    console.log(userInfo);
    return $.ajax({
      type: "POST",
      url: "api/user",
      data: JSON.stringify(userInfo)
    });
  }
};

// handleFormSubmit is called whenever we submit a new log in
var handleFormSubmit = function(event) {
  event.preventDefault();

  var logInAttempt = {
    username: usernameInput.val().trim(),
    password: passwordInput.val().trim()
  };

  if (!(logInAttempt.username && logInAttempt.password)) {
    alert("You must enter a username and password");
    return;
  }

  API.logIn(logInAttempt).then(function() {
    window.location.replace("/addReceipt");
    console.log("logged in under: " + username);
  });

  usernameInput.val("");
  passwordInput.val("");
};

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
