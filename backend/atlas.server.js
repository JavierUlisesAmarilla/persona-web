const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb')


const uri = 'mongodb+srv://personaWebappUser:wWHDZE9OcqID13e1@cluster0.30jw4wc.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})
const app = express()
const PORT = 4000

app.use(cors())
app.use(bodyParser.json({ limit: '50mb', extended: true }))

// mainRoute is an instance of the express router
// We use it to define our routes
// The router will be added as a middleware and will take control of requests starting with path /main
// eslint-disable-next-line new-cap
const mainRoute = express.Router()
app.use('/main', mainRoute)

client.connect((connErr) => {
  if (connErr) {
    client.close()
    throw connErr
  }

  console.log('MongoDB connected')

  // This help convert the id from string to ObjectId for the _id
  const objectId = require('mongodb').ObjectId
  const mainCollection = client.db('persona').collection('main')

  // This section will help you get a list of all the main
  mainRoute.route('/').get((req, res) => {
    mainCollection.find({}).toArray((err, result) => {
      if (err) {
        throw err
      }
      res.json(result)
    })
  })

  // This section will help you get a single data by id
  mainRoute.route('/:id').get((req, res) => {
    const myQuery = { _id: objectId(req.params.id) }
    mainCollection.findOne(myQuery, (err, result) => {
      if (err) {
        throw err
      }
      res.json(result)
    })
  })

  // This section will help you create a new data
  mainRoute.route('/add').post((req, response) => {
    mainCollection.insertOne(req.body, (err, res) => {
      if (err) {
        throw err
      }
      response.json(res)
    })
  })

  // This section will help you update a data by id
  mainRoute.route('/update/:id').post((req, response) => {
    const myQuery = { _id: objectId(req.params.id) }
    const newValues = {
      $set: req.body,
    }
    mainCollection.updateOne(myQuery, newValues, (err, res) => {
      if (err) {
        throw err
      }
      response.json(res)
    })
  })

  // This section will help you delete a data
  mainRoute.route('/remove/:id').post((req, response) => {
    const myQuery = { _id: objectId(req.params.id) }
    mainCollection.deleteOne(myQuery, (err, obj) => {
      if (err) {
        throw err
      }
      response.json(obj)
    })
  })

  // This section will help you get data list by email
  mainRoute.route('/getemaildata/:email').get((req, res) => {
    mainCollection.find({ email: req.params.email }).toArray((err, result) => {
      if (err) {
        throw err
      }
      res.json(result)
    })
  })
})

app.listen(PORT, () => {
  console.log(`Atlas server is running on port: ${PORT}`)
})