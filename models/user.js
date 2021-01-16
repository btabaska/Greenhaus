module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    // Giving the User model a name of type STRING
    name: DataTypes.STRING,
  });

  User.associate = (models) => {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    User.hasMany(models.Plant, {
      onDelete: "cascade",
    });
  };

  return User;
};
