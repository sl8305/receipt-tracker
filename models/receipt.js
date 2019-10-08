module.exports = function(sequelize, DataTypes) {
    var Receipt  = sequelize.define("Receipts", {
      id: { 
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: {
          args: true
        },
        autoIncrement: true,
      },
  
      store_name: {
        type: DataTypes.STRING,
        allowNull: false
      },

      purchase_date: {
        type: DataTypes.DATE,
        allowNull: false
      }, 

      total_cost: {
        type: DataTypes.FLOAT,
        allowNull: false
      }, 

      category: {
        type: DataTypes.STRING,
        allowNull: false
      }
      
    });

    Receipt.associate = function(models) {
      // Reciepts belong under a  card
      Receipt.belongsTo(models.Cards, {
        onDelete: "NO ACTION",
      });
    };

    return Receipt;
  };
  