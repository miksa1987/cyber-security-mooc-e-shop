import React from 'react'
import Head from 'next/head'
import axios from 'axios'
import Link from 'next/link'
import useField from '../hooks/useField'
import Nav from '../components/nav'

const Admin = () => {
  const [items, setItems] = React.useState([])
  const [itemName, setItemName] = useField('text')
  const [itemPrice, setItemPrice] = useField('number')

  React.useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    const response = await axios.get('/api/item/all')
    setItems(response.data)
    console.log(response.data)
  }

  const submitItem = async (event) => {
    event.preventDefault()
    const itemToAdd = { name: itemName.value, price: itemPrice.value }

    const response = await axios.post('/api/item/new', itemToAdd)
    setItems([...items, response.data])
  }

  const deleteItem = (id) => {
    axios.delete(`/api/item/${id}`)
  }

  return (
    <div>
      <Head>
        <title>Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <form onSubmit={submitItem}>
        <strong>Add new item to shop</strong><br/>
        <input {...itemName} placeholder='Item name' />
        <input {...itemPrice} placeholder='Item price' />
        <button type='submit'>Add</button>
      </form>

      <ul>
        {items.map((item, idx) => <li key={idx}>
          <strong>{item.name} {item.price} €</strong>
          <button onClick={() => deleteItem(item._id)}>DELETE ITEM</button>
        </li>)}
      </ul>
    </div>
  )
}

export default Admin
