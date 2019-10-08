module.exports = function(sequelize, DataTypes) {
    var Card  = sequelize.define("Cards", {
      id: { 
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: {
          args: true
        },
        autoIncrement: true,
      },

      card_number: {
        type: DataTypes.STRING,
        allowNull: false
      }

    });

    Card.associate = function(models) {
      // Associating card with user
      Card.belongsTo(models.Users, {
        onDelete: "CASCADE",
      });

      Card.hasMany(models.Receipts, {
        onDelete: "CASCADE",
        primaryKey: "card_number"
        // joined via the card_number column
        // when the card is deleted, all associated reciepts will also be deleted
      });
    };

    return Card;
  };
  