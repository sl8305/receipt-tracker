module.exports = function(sequelize, DataTypes) {
  var User  = sequelize.define("Users", {
    id: { 
      primaryKey: true,
      type: DataTypes.INT,
      unique: {
        args: true
      },
      autoIncrement: true,
    },
    
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },

    password: {
      type: DataTypes.STRING,

      // validation function
      allowNull: false
    }
  });

  User.associate = function(models) {
    // Associating User with Receipts
    // When an User is deleted, also delete any associated Receipts
    User.hasMany(models.Receipts, {
      onDelete: "CASCADE"
    });
  };

  return User;
};
