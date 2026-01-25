import React from 'react'
import NavBar from './NavBar'
import Page1Content from './Page1Content'

const Section1 = ({ users }) => {
  return (
    <section className='h-screen w-full bg-gradient-to-b from-green-100 to-blue-50'>
      <NavBar />
      <Page1Content users={users} />
    </section>
  )
}

export default Section1
