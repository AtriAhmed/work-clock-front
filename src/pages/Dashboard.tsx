import React from 'react'
import RenderIfAId from '../utils/RenderIfAId'
import { useAuthContext } from '../utils/contexts/AuthProvider'

export default function Dashboard() {
  const { user, setUser } = useAuthContext()



  return (
    <div className='text-center'>
      <h1 className='display-4'>Welcome {user.username}</h1>
      <h2>User-ID: {user._id}</h2>
      <h2>Access Type: {user.type}</h2>
      <h2>Access Level: {user.accessId}</h2>
      <p className='font-weight-bolder text-info'>
        Dashboard that requires User accessId &gt;= 1
      </p>

      <RenderIfAId aId={2}>
        <div className='border bg-dark my-3 py-2'>
          <h1>Manager Div header</h1>
          <p>
            this is a div that should only be viewable by Managers on the
            dashboard page.
          </p>
        </div>
      </RenderIfAId>

      <RenderIfAId aId={3}>
        <div className='border bg-dark my-3 py-3'>
          <h1>Admin Div header</h1>
          <p>
            this is a div that should only be viewable by Admins on the
            dashboard page.
          </p>
        </div>
      </RenderIfAId>
     
    </div>
  )

}