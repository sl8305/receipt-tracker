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

    //   userId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    //   },

      card_number: {
        type: DataTypes.STRING,
        allowNull: false
      }

    });

    Card.associate = function(models) {
      // Associating card with user
      Card.belongsTo(models.Users, {
        onDelete: "CASCADE",
        // foreignKey: 'userId'
      });

      Card.hasMany(models.Receipts, {
        onDelete: "CASCADE",
        primaryKey: "card_number"
      });
    };

    return Card;
  };
  