const Item = require('../../../models/item')

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      return res.json(await Item.findById(req.query.id))
    case 'DELETE':
      await Item.findByIdAndRemove(req.query.id)
      console.log(`delete ${req.query.id}`)
      return res.status(204).end()
    default:
      return res.status(405).end()
  }
}