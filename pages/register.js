import React from 'react'
import Head from 'next/head'
import axios from 'axios'
import Link from 'next/link'
import useField from '../hooks/useField'
import Nav from '../components/nav'

const Register = () => {
  const [username, setUsername] = useField('text')
  const [password, setPassword] = useField('password')

  const submit = async (event) => {
    event.preventDefault()

    const response = await axios.post('/api/user/new', {
      username: username.value, password: password.value
    })

    console.log(response.data)
  }

  return (
    <div>
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <form onSubmit={submit}>
        <input {...username} placeholder='Username' />
        <input {...password} placeholder='Password' />
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Register
