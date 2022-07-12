import '../styles/globals.css'
import React from 'react'
import {Layout} from '../components';
import {StateContext} from '../context/StateContext';
import {Toaster} from 'react-hot-toast';

//this file is to render the website
function MyApp({ Component, pageProps }) {
  return (
  // you have to wrap everything in statecontext to give the components access
  <StateContext>
    
    <Layout>
      <Toaster/>
      <Component {...pageProps} />
    </Layout>  

  </StateContext>
   
  )
  
}

export default MyApp
