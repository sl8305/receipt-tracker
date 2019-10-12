$(document).ready(function() {
  // Getting references to our form and inputs
  var usernameInput = $("#loginUsername");
  var passwordInput = $("#loginPassword");
  // var userId = ;

  console.log("username: "+ usernameInput + "\npassword: "+passwordInput);
    // When the form is submitted, we validate there's an email and password entered
    $("#logIn").on("click", function(event) {
      event.preventDefault();
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
      $.post("/api/login", {
        username: username,
        password: password
      })
        .then(function(data) {
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
