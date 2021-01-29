//Dependency
const axios = require('axios')
const db = require('../models')

const trefleUrl = `https://trefle.io/api/v1/plants/search?token=hlXm0tZIyyX9DOk8D-9yiTodZaGNOaqqu8d7NP8T8kM&q=`

//routes
module.exports = app => {
  app.get('/api/plants', (req, res) => {
    const query = {}
    if (req.query.user_id) {
      query.UserId = req.query.user_id
    }
    db.Plant.findAll({
      where: query,
      include: [db.User]
    }).then(dbPlant => res.json(dbPlant))
  })

  //get route for retrieving info from a single plant
  app.get('/api/plants/:id', (req, res) => {
    db.Plant.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(dbPlant => res.json(dbPlant))
  })

  //POST route for saving a new plant
  app.post('/api/plants', async (req, res) => {
    const { name } = req.body

    const resp = await axios.get(trefleUrl + name)
    const imageUrl = resp.data.data[0].image_url
    const dbPlant = await db.Plant.create(req.body)
    console.log({ dbPlant })
    console.log('dbPlant.id', dbPlant.id)
    const dbImage = await db.Image.create({ PlantId: dbPlant.id, url: imageUrl })
    res.json(dbPlant)
  })

  //DELETE route for deleting plants
  app.delete('/api/plants/:id', (req, res) => {
    db.Plant.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbPlant => res.json(dbPlant))
  })

  //PUT route for updating plants
  app.put('/api/plants', (req, res) => {
    db.Plant.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(dbPlant => res.json(dbPlant))
  })
}
