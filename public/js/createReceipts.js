$(document).ready(function() {
    // Getting references to our form and inputs
    var recieptObj = {
        cardNum: $("#cardNum")
    }
    

    var cardNum = $("#cardNum");
    var storeName = $("#storeName");
    var purchaseDate = $("#purchaseDate");
    var totalCost = $("#totalCost");
    var category = $("#category");

    

    
      // When the form is submitted, we validate there's an email and password entered
      $("#logIn").on("click", function(event) {
        event.preventDefault();
        console.log(recieptObj);
        console.log(cardNum);

        var userData = {
          username: usernameInput.val().trim(),
          password: passwordInput.val().trim(),
          // userId: userId
        };
        
        console.log("logged in");
        if (!userData.username || !userData.password) {
          return;
          // no username or password
        }
  
        // If we have an email and password we run the loginUser function and clear the form
        loginUser(userData.username, userData.password);
        usernameInput.val("");
        passwordInput.val("");
      });
  
      // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
      function loginUser(username, password) {
        $.post("/api/user", {
          username: username,
          password: password
        })
          .then(function() {
            window.location.replace("/addReceipt");
            console.log("logged in under: " + username);
          })
          .catch(function(err) {
            // If there's an error, log the error
            console.log(err);
          });
      };
  });
  