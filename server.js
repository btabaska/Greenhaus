const express = require('express')
const app = express()
const db = require('./models')
const connection = require('./config/connection')
const initRoutes = require('./routes/html-routes.js')
const plantRoutes = require('./routes/plant-api-routes.js')
const userRoutes = require('./routes/user-api-routes.js')
const imageRoutes = require('./routes/image-api-routes')

global.__basedir = __dirname

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
initRoutes(app)
plantRoutes(app)
userRoutes(app)
imageRoutes(app)

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static('public'))
db.sequelize.sync({ force: false })

//This is used in development to drop and re-sync the database, uncomment and run if you have DB issues

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`)
})
