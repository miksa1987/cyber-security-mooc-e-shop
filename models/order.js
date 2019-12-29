const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  recipient: String,
  items: [{
    name: String,
    qty: Number,
    price: Number
  }],
  address: String,
  done: Boolean
})

delete mongoose.connection.models['Order']
module.exports = mongoose.model('Order', orderSchema)