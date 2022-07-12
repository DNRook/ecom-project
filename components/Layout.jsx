import React from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

const layout = ({children}) => {
  return (
    <div className='layout'>
      <Head>
          <title> My Store</title>
      </Head>
      <header>
        <Navbar/>
      </header>
      {/*the children here are the componenets from the _app file (toaster and componenet)*/}
      <main className='main-container'>
          {children}
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default layout