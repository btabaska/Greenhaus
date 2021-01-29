//exports that create the table for plants in the database
module.exports = (sequelize, DataTypes) => {
  const Plant = sequelize.define("Plant", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1],
    },
    lastfed: {
      type: DataTypes.STRING,
    },
    info: {
      type: DataTypes.TEXT,
    },
    gif: {
      type: DataTypes.BLOB("long"),
    },
  });

  Plant.associate = (models) => {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Plant.hasMany(models.Image, {
      onDelete: "cascade",
    });
  };

  Plant.associate = (models) => {
    // We're saying that a Plant should belong to an User
    // A Plant can't be created without a User due to the foreign key constraint
    Plant.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Plant;
};
