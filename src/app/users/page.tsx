import React from 'react'

type User = {
  id: number,
  name: string,
}

const Users = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const users: User[] = await res.json()

  return (
    <div>
      <div className='text-2xl font-bold mb-4'>Users</div>
      {users.map(user =>
        <div key={user.id} className='border-b py-2'>
          {user.name}
        </div>
      )}
    </div>
  )
}

export default Users