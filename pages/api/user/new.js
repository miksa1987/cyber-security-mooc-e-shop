const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../../../models/user')

export default async (req, res) => {
  if (req.method === 'POST') {
    const user = new User({
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10)
    })

    res.json(await user.save())
  }
  else { 
    res.status(405).end()
  }
}