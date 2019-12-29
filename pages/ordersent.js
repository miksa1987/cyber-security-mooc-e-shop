import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/nav'

const Order = () => {
  const [items, setItems] = React.useState([])

  React.useEffect(() => {
    const cartContents = JSON.parse(window.localStorage.getItem('eshop-cart')) || []
    setItems(cartContents)
  }, [])

  return (
    <div>
      <Head>
        <title>Order sent!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <h2>Order sent!</h2>
      <ul>
        {items.map((item, idx) => <li key={idx}>{item.name} {item.price} €</li>)}
      </ul>
      <Link href='/'>Back to Home </Link>
    </div>
  )
}

export default Order
