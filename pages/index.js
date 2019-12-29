import React from 'react'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/nav'

const Home = () => {
  const [items, setItems] = React.useState([])
  const [cart, setCart] = React.useState([]) 

  React.useEffect(() => {
    fetchItems()
    fetchCart() 
  }, [])

  const fetchItems = async () => {
    const response = await axios.get('/api/item/all')
    setItems(response.data)
  }

  const fetchCart = () => {
    const cartJSON = window.localStorage.getItem('eshop-cart')
    if (cartJSON) {
      setCart(JSON.parse(cartJSON))
    }
  }

  const addToCart = (name, price) => {
    const cart = JSON.parse(window.localStorage.getItem('eshop-cart')) || []
    console.log(cart)

    const itemToAdd = { name, price }
    window.localStorage.setItem('eshop-cart', JSON.stringify([ ...cart, itemToAdd]))
    fetchCart()
  }

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <h2>Shop items</h2>
      <ul>
        {items.map((item, idx) => <li key={idx}>
          <strong>{item.name} {item.price} €</strong>
          <button onClick={() => addToCart(item.name, item.price)}>Add to cart</button>
        </li>)}
      </ul>
      <p>{cart.length} items in cart.</p>
      <Link href='/cart'>To cart</Link>
    </div>
  )
}

export default Home
