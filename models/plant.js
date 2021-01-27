module.exports = (sequelize, DataTypes) => {
    const Plant = sequelize.define('Plant', {
      // Giving the Plant model a name of type STRING
      name: DataTypes.STRING,
      scientificName: DataTypes.STRING,
      commonName: DataTypes.STRING,
      yearDiscovered: DataTypes.INTEGER,
      imageUrl: DataTypes.STRING,
      lastWaterered: DataTypes.DATE
    });
  
    return Plant;
  };
  