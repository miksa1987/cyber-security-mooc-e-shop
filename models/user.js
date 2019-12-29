const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  orders: [{ type: mongoose.Types.ObjectId, ref: 'Order' }]
})

delete mongoose.connection.models['User']
module.exports = mongoose.model('User', userSchema)