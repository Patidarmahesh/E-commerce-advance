import React from 'react'
import Layout from '../Component/Layout/Layout'

const PageNotFound = () => {
  return (
    <Layout>
      <div style={{width:"100%",height:"600px",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",color:"green",gap:"40px"}}>
        <div style={{marginTop:"-2.4rem"}}>
          <img src='/assets/download (2).jpg' style={{backgroundSize:"100% 100%"}}/>
        </div>
        <h1>Page Not Found Go To Home</h1>
      </div>
    </Layout>
  )
}

export default PageNotFound
