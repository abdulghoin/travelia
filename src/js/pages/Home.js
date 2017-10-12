// import Packages
import React from 'react'
import Helmet from 'react-helmet'
import {Link} from 'react-router'

const Home = () =>{
  return(
    <section id='home'>
      <Helmet title='Travelia' />
      <h1 class='align-self-center'>Home</h1>
      <Link to='/register'>Register</Link>
    </section>
  )
}

export default Home
