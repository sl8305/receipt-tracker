$(document).ready(function() {
    // Getting references to our form and inputs
    var newUse = $("#newUser");
    var newPass = $("#newPass");

    // When the form is submitted, we validate there's an email and password entered
    $("#pushNewUser").on("click", function(event) {
      event.preventDefault();
      
      var userData = {
        username: newUse.val().trim(),
        password: newPass.val().trim(),
      };
      
      console.log("logged in");
      if (!userData.username || !userData.password) {
        // no username or password
        alert("no information was input. please try again");
        return;
      }

      // post the user information and check if its in the database
      // createUser(userData.username, userData.password);

      // If we have an email and password we run the loginUser function and clear the form
      createNewUser(userData.username, userData.password);
      usernameInput.val("");
      passwordInput.val("");
    });

    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function createNewUser(username, password) {

      $.post("/api/signup", {
        username: username,
        password: password
      })
        .then(function(data) {
          // redirecting to the next page (add receipts)
          console.log("logged in under: ", data.username);
          window.location.replace("/addReceipt/" + data.id);
      })
        .catch(function(err) {
          // If there's an error, log the error
          alert("Invalid username or password. Please try again");
          console.log(err);
      });
    };

  });