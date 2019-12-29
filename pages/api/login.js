const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')

export default async (req, res) => {
  if (req.method === 'POST') {
    console.log('ping')
    const user = await User.findOne({ username: req.body.username })
    console.log('ping')
    console.log(user)
    if (user) {
      res.json({ token: await jwt.sign({ user: user.id }, 'VERYSEKRETKEY') })
    }
    else {
      res.status(401).end()
    }
  }
  else {
    res.status(405).end()
  }
}