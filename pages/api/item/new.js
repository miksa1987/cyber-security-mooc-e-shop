const Item = require('../../../models/item')

export default async (req, res) => {
  if (req.method === 'POST') {
    const item = new Item(req.body)
    res.status(201).json(await item.save())
  }
  else {
    res.status(405).end()
  }
}