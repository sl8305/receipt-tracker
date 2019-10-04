module.exports = function(sequelize, DataTypes) {
    var Receipt  = sequelize.define("Receipts", {
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
    return Receipt;
  };
  