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
      
      // card_number: {
      //   type: DataTypes.STRING,
      //   allowNull: false
      // },
  
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
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      Receipt.belongsTo(models.Cards, {
        onDelete: "NO ACTION",
        // foreignKey: 'card_number'
      });
    };

    return Receipt;
  };
  