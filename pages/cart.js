import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Nav from '../components/nav'
import { countAndMergeItems } from '../util/merger'

const Cart = () => {
  const [items, setItems] = React.useState([])
  const router = useRouter()

  React.useEffect(() => {
    const cartContents = JSON.parse(window.localStorage.getItem('eshop-cart')) || []
    setItems(cartContents)
  }, [])

  const backToIndex = () => {
    window.localStorage.removeItem('eshop-cart')
    router.push('/')
  }

  const toOrderPage = () => {
    router.push('/order')
  }

  return (
    <div>
      <Head>
        <title>Cart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <h2>Shopping cart</h2>
      <ul>
        {countAndMergeItems(items).map((item, idx) => <li key={idx}>{item.name} {item.price} €</li>)}
      </ul>
      <button onClick={toOrderPage}>Proceed with order</button>
      <button onClick={backToIndex}>Clear cart and go back to home</button>
    </div>
  )
}

export default Cart
