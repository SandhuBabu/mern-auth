import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [user, setUser] = useState()

  useEffect(()=>{
    async function getUser() {
      try {
        const token = localStorage.getItem('token')
        let res = await axios.get("http://localhost:5000", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.warn(res)

        if(res.data.user)
          setUser(res.data.user)
      } catch(err) {
        return alert("No User")
      }
    }
    getUser();
  }, [])

  const handleSignup = async (e) => {
    e.preventDefault();
    const user = { username: 'sandhubabu', password: 'sandhu' };

    try {
      const res = await axios.post('http://localhost:5000/signup', user);
      if (res?.data?.token) {
        localStorage.setItem('token', res.data.token)
        console.warn("token : " + res.data.token)
        if (res.data.user)
          setUser(user)
      }
    } catch (err) {
      if (err?.response?.status === 409)
        return alert("User already exists with the username")
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = { username: 'sandhubabu', password: 'sandhu' }
    try {
      const res = await axios.post('http://localhost:5000/login', user)
      if (res?.data?.token) {
        console.warn(res);
        localStorage.setItem('token', res.data.token);
        if(res.data.user)
          setUser(res.data.user)
      }
    } catch (err) {
      if (err?.response?.status === 401)
        return alert("No user found for this credentials")
    }
  }

  const useProtected = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      console.warn(token)
      const res = await axios.get('http://localhost:5000/protected', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.warn(res);
    } catch (err) {
      if (err.response.status === 401) {
        return alert("Login again")
      }
    }
  }

  return (
    <div>


      <h1>User : {JSON.stringify(user)}</h1>

      <button onClick={handleSignup}>Sign up</button>

      <br />
      <br />

      <button onClick={handleLogin}>Login</button>

      <br />
      <br />

      <button onClick={useProtected}>Protected path</button>

      <br />
      <br />

      <button onClick={async (e) => {
        e.preventDefault();
        try {
          const res = await axios.get('http://localhost:5000')
          console.warn(res)
        } catch (err) {
          console.warn(err)
        }
      }}>Home</button>

      <br />
      <br />

      <button onClick={(e) => {
        e.preventDefault()
        localStorage.removeItem('token');
      }}>Logout</button>
    </div>
  )
}

export default App
