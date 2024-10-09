import React from 'react'
import Layout from '../../Component/Layout/Layout'
import AdminMenu from '../../Component/Layout/AdminMenu'
import { useAuth } from '../../Context/Auth'

const AdminDashbored = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div style={{height:"536px"}}>
      <div className="m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu/>
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3> Admin Name : {auth?.user.name}</h3>
              <h3> Admin Email : {auth?.user.email}</h3>
              <h3> Admin Contact : 6263383394</h3>
            </div>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  )
}

export default AdminDashbored
