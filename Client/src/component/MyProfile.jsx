import React from 'react'

const MyProfile = ({ user }) => {
  return (
    <div className="profile">
      <h1>User Id: {user?._id}</h1>
      <br />
      <h1>Name: {user?.name}</h1>
      <br />
      <h1>Email: {user?.email}</h1>
    </div>
  )
}

export default MyProfile;