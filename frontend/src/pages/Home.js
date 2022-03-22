import React from 'react'
import NavBar from '../components/NavBar'
import TextEditor from '../components/TextEditor'

function Home() {
  return (
    <div>
      <NavBar/>
      <h1 className='text-center'>Home</h1>
      <TextEditor/>
    </div>
  )
}

export default Home