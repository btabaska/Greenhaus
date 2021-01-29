//exporting database table for photos
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define("Image", {
    type: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    data: {
      type: DataTypes.BLOB("long"),
    },
  });

  Image.associate = (models) => {
    //We are saying that an Image should belong to a Plant
    //An image can't be created without a Plant due to the foreign key constraint
    Image.belongsTo(models.Plant, {
      foreignkey: {
        allowNull: false,
      },
    });
  };

  return Image;
};
