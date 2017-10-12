// import Packages
import React from 'react'

// import Components
import Header from 'Header'

const LayOut =({children, location})=>{
  location = location.pathname
  return(
    <section id='LayOut'>
      <Header location={location} />
      <div class='container'>
        {children}
      </div>
    </section>
  )
}

export default LayOut
