import React from 'react'
import vg from '../assets/derwater.mp4'
import Form from './CustomersScreen'
import ProductForm from './ProductForm'
import UserScreen from './UserScreen'

function Home() {
  return (
    <div className='main'>
      <div className='overlay'></div>
      <video src={vg} autoPlay loop muted />
      <div className='content'>
        <h1>Der Innovation</h1>
        <p><UserScreen/></p>
      </div>
    </div>
  )
}

export default Home