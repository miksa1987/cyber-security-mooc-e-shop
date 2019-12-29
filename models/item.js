const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number
})

delete mongoose.connection.models['Item']
module.exports = mongoose.model('Item', itemSchema)