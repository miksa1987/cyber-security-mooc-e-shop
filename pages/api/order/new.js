const Order = require('../../../models/order')

export default async (req, res) => {
  if (req.method === 'POST') {
    const order = new Order(req.body)
    res.status(201).json(await order.save())
  }
  else {
    res.status(405).end()
  }
}