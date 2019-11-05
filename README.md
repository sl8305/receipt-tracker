# receipt-tracker

Overview: 
    Full stack app that allows a user to view their stored receipts in a meaningful way to help guide future spending behavior.

Technology:
    *  sequelize
    *  mySql
    *  bcrypt.js
    *  charts.js
    *  express
    *  handlebars
    *  passport


User Cases:
* User is able to create their own account and log in
    * creating a new user will redirect to the create user page.
    * after user is validated the user is redirected to the addReceipt page.

* On the addReceipt page the user can add a receipt and card (last 4 digits of card) to their account or skip the page.
    * if the card is already associated to the user the receipt will be added to it. if the card is not already associated to the user it is created and then receipt is added.
    * page redirects to display page for receipts

* Cards associated to the user are displayed in their own division
    * Each division will show the user's receipts in the form of visual graphs

Future Development:
* Display the users receipts using charts.js 
* Creating a settings page for the user to update the username, password and receipts
* 

