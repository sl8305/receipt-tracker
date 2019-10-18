$(document).ready(function() {
    // Getting references to our form and inputs
    var cardNumber = $("#cardNum");
    var storeName = $("#storeName");
    var purchaseDate = $("#purchaseDate");
    var totalCost = $("#totalCost");
    var category = $("#category");

    $.getJSON("/api/user_data", data => {
      console.log(data);
        // Make sure the data contains the username as expected before using it
        if (data.hasOwnProperty("id")) {
            return data;
        } else {
            console.log("ERROR: no user data!");
        }}).then(function(userInfo){

            console.log("userInfo ",userInfo);
        });
        

      // When the form is submitted, we validate there's an email and password entered
      $("#submitReceipt").on("click", function(event) {
        event.preventDefault();
        var receiptData = {
          cardNumber: cardNumber.val().trim(),
          storeName: storeName.val().trim(),
          purchaseDate: purchaseDate.val().trim(),
          totalCost: totalCost.val().trim(),
          category: category.val().trim()
        };
        console.log(receiptData.cardNumber, receiptData.storeName, receiptData.purchaseDate, receiptData.totalCost, receiptData.category);
        
        console.log("Adding Receipt");
        if (!receiptData.cardNumber || !receiptData.storeName || !receiptData.purchaseDate || !receiptData.totalCost || !receiptData.category ) {
          alert("Please fill out the form completely");
          return;
        }

        // If the form is filled out, we run the add Receipt function and clear the form
        // add card under user (if its in the database, move on, if not then add)
        // addCard(receiptData.card_number);

        // adding the receipt to the card under the user
        addReceipt(receiptData.cardNumber, receiptData.storeName, receiptData.purchaseDate, receiptData.totalCost, receiptData.category);
        
        // clearing values in the form
        cardNumber.val("");
        storeName.val("");
        purchaseDate.val("");
        totalCost.val("");
        category.val("");        
      });
  
// addReceipt adds the rest of the user input into the database as a receipt 
    function addReceipt(cardNumber, storeName, purchaseDate, totalCost, category) {
      console.log(cardNumber, storeName, purchaseDate, totalCost, category);
      $.post("/api/receipt", {
        card_number: cardNumber,
          store_name: storeName,
          purchase_date: purchaseDate,
          total_cost: totalCost,
          category: category
      })
        .then(function(data) {
          console.log(data);
          // move to the show cards page
          window.location.replace("/viewReceipt/" + data.id);
        })
        .catch(function(err) {
          // If there's an error, log the error
          alert("Invalid username or password. Please try again");
          console.log(err);
        });
    };
  });
