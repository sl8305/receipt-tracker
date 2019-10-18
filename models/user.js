// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
  var User  = sequelize.define("Users", {
    id: { 
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: {
        args: true
      },
      autoIncrement: true,
    },
    
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User.associate = function(models) {
    // Associating User with Receipts
    // When an User is deleted, also delete any associated Receipts
    User.hasMany(models.Cards, {
      onDelete: "CASCADE",
      foreignKey: 'UserId'
      // linked via UserId
      // when the User is deleted, it cards associated will also be deleted
    });
  };

  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  return User;
};