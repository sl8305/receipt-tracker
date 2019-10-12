$(document).ready(function() {
    // Getting references to our form and inputs
    var cardNumber = $("#cardNum");
    var storeName = $("#storeName");
    var purchaseDate = $("#purchaseDate");
    var totalCost = $("#totalCost");
    var category = $("#category");
    // var userData;




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
        // console.log(receiptData.cardNumber, receiptData.storeName, receiptData.purchaseDate, receiptData.totalCost, receiptData.category);
        
        console.log("Adding Receipt");
        if (!receiptData.cardNumber || !receiptData.storeName || !receiptData.purchaseDate || !receiptData.totalCost || !receiptData.category ) {
          alert("Please fill out the form completely");
          return;
        }

        // If the form is filled out, we run the add Receipt function and clear the form
        // add card under user (if its in the database, move on, if not then add)
        addCard(receiptData.card_number);

        // adding the receipt to the card under the user
        // addReceipt(receiptData.storeName, receiptData.purchaseDate, receiptData.totalCost, receiptData.category, receiptData.card_number);
        
        // clearing values in the form
        cardNumber.val("");
        storeName.val("");
        purchaseDate.val("");
        totalCost.val("");
        category.val("");        
      });
  
      // addCard posts the card to the database
      function addCard (cardNumber){

    // grabbing user ID
    $.getJSON("/api/user_data", data => {
        // Make sure the data contains the username as expected before using it
        if (data.hasOwnProperty("user")) {
            return data;
        } else {
            console.log("ERROR: no user data!");
        }}).then(function(userInfo){
            // userData = userInfo;
            console.log("userInfo "+userInfo);
            // check if the account already has the card.
        $.get("api/user/"+userInfo.id).then(function(data){
            console.log(data);
            // compare that information with the cardNumber
        });
        });

        
    };









        // $.post("/api/card", {
        //     userId: userId,
        //     card_number: cardNumber
        // })
        // .then(function(data) {
        //     // redirecting to the next page (add receipts)
        //     console.log("Card number: ", data.card_number);
        //     console.log("id: "+ userId);

        //   })
        //   .catch(function(err) {
        //     // If there's an error, log the error
        //     console.log(err);
        //   });
          
        // if the card is not attatched to the account, add the card
        // if they have the card do nothing.

      });

//       // addReceipt does a post to our "api/login" route and if successful
//       function addReceipt(storeName, purchaseDate, totalCost, category, cardId) {
//         $.post("/api/receipt", {
//             store_name: storeName,
//             purchase_date: purchaseDate,
//             total_cost: totalCost,
//             category: category,
//             CardId: cardId
//         })
//           .then(function(data) {
            
//             // move to the show cards page
//             window.location.replace("/viewReceipt/" + data.id);
//           })
//           .catch(function(err) {
//             // If there's an error, log the error
//             alert("Invalid username or password. Please try again");
//             console.log(err);
//           });
//       };
//   });
  