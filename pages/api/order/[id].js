const Order = require('../../models/order')

export default async (req, res) => {
  if (req.method === 'GET') {
    res.json(await Order.findById(req.query.id))
  }
  else {
    res.status(405).end()
  }
}