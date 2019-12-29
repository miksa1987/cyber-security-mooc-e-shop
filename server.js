require('dotenv').config()
const {createServer} = require('http')
const next = require('next')
const mongoose = require('mongoose')

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000

const createAndStartServer = async (port) => {
  await app.prepare()
  createServer((req, res) => handle(req, res))
    .listen(port, (err) => {
      if (err) throw err
      console.log(`Server ready at port ${port}`)
    })
}

const handleRequests = (req, res) => {
  console.log(req)
  handle(req, res)
}

const connectToMongo = () => {
  const mongoUrl = process.env.MONGODB_URL

  try {
    mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    console.log('Connected to MongoDB.')
  }
  catch (error) {
    console.log('Could not connect to MongoDB.')
  }
}


createAndStartServer(port)
connectToMongo()