const Item = require('../../../models/item')

export default async (req, res) => {
  if (req.method === 'GET') {
    res.json(await Item.find({}))
  }
  else {
    res.status(405).end()
  }
}