const db = require('../models');
const axios = require('axios');
const TREFLE_API_URL = 'https://trefle.io/api/v1/plants/search?token=hlXm0tZIyyX9DOk8D-9yiTodZaGNOaqqu8d7NP8T8kM'

module.exports = (app) => {
  app.get('/api/plants', (req, res) => {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Plant.findAll({
    }).then((dbPlant) => res.json(dbPlant));
  });

  app.get('/api/plants/:id', (req, res) => {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Plant.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Post],
    }).then((dbAuthor) => res.json(dbAuthor));
  });

  app.post('/api/plants', async (req, res) => {
    const { search } = req.body
    const url = `${TREFLE_API_URL}&q=${search}`
    console.log({url})
    const resp = (await axios.get(url)).data.data[0]
    console.log(resp)
    const plant = {
        name: search,
        commonName: resp.common_name,
        scientificName: resp.scientific_name,
        imageUrl: resp.image_url,
        yearDiscovered: resp.year
    }
    db.Plant.create(plant).then((dbPlant) => res.json(dbPlant));
    
  });

  app.delete('/api/plants/:id', (req, res) => {
    db.Plant.destroy({
      where: {
        id: req.params.id,
      },
    }).then((plantsdb) => res.json(plantsdb));
  });
};
