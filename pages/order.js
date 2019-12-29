import React from 'react'
import Head from 'next/head'
import axios from 'axios'
import { useRouter } from 'next/router'
import Nav from '../components/nav'
import { countAndMergeItems } from '../util/merger'
import useField from '../hooks/useField'

const Order = () => {
  const [items, setItems] = React.useState([])

  const [recipient] = useField('text')
  const [address] = useField('text')

  const router = useRouter()

  React.useEffect(() => {
    const cartContents = JSON.parse(window.localStorage.getItem('eshop-cart')) || []
    setItems(cartContents)
  }, [])

  const backToIndex = () => {
    window.localStorage.removeItem('eshop-order')
    router.push('/')
  }

  const sendOrder = async () => {
    await axios.post('/api/order/new', {
      recipient: recipient.value,
      address: address.value,
      items: countAndMergeItems(items)
    })

    window.alert('Thank you! Order sent!')
    router.push('/')
  }

  return (
    <div>
      <Head>
        <title>Order</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <h2>Make order</h2>
      <form onSubmit={sendOrder}>
        <ul>
          {countAndMergeItems(items).map((item, idx) => <li key={idx}>{item.name} {item.price} €</li>)}
        </ul>
        <input {...recipient} placeholder='Recipient name' />
        <input {...address} placeholder='Recipient address' />
        <button type='submit'>Send the order</button>
      </form>
      <button onClick={backToIndex}>Cancel order and go back to home</button>
    </div>
  )
}

export default Order
