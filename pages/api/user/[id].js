const mongoose = require('mongoose')
const User = require('../../../models/user')

export default async (req, res) => {
  if (req.method === 'GET') {
    res.json(await User.findById(req.query.id))
  }
  else {
    res.status(405).end()
  }
}