import React, { useState, useEffect } from 'react'
import { supabase } from './createClient'
import './App.css'

const App = () => {

  const [users, setUsers] = useState([])

  const [user, setUser] = useState({
    name: '', age: ''
  })

  const [user2, setUser2] = useState({
    id: '', name: '', age: ''
  })

  console.log(user2)

  useEffect(() => {
    fetchUsers()
  }, [])
  

  async function fetchUsers() {
    const {data} = await supabase
      .from('users')
      .select('*')
      setUsers(data)
  }

  function HandleChange(event) {
    setUser(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  }

  function HandleChange2(event) {
    setUser2(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  }

  async function createUser(event) {
    event.preventDefault();
    await supabase
    .from('users')
    .insert({ name: user.name, age: user.age })

    fetchUsers()

    setUser({ name: '', age: '' });
  }

  async function deleteUser(userId) {
     const { data, error } = await supabase
    .from('users')
    .delete()
    .eq('id', userId)

    fetchUsers()

    if (error) {
      console.log(error)
    }
    if (data) {
      console.log(data)
    }
  }

  function displayUser(userId) {
    users.map((user) => {
      if(user.id === userId) {
        setUser2({id: user.id, name: user.name, age: user.age})
      }      
    })
  }

  async function updateUser(event, userId) {
    event.preventDefault();
    const { data,error } = await supabase
    .from('users')
    .update({ id: user2.id, name: user2.name, age: user2.age })
    .eq('id', userId)

    fetchUsers()

    setUser2({ name: '', age: '' });

    if (error) {
      console.log(error)
    }
    if (data) {
      console.log(data)
    }
  }

  return (
    <div>

      {/* FORM 1 */}
      <form onSubmit={(event) => createUser(event)}>
        <input
          type  = "text"
          placeholder = "Name"
          name = "name"
          value={user.name}
          onChange = {HandleChange}
        />
        <input
          type  = "number"
          placeholder = "Age"
          name = "age"
          value={user.age}
          onChange = {HandleChange}
        />
        <button type='submit'>Create</button>
      </form>




      {/* FORM 2 */}
      <form onSubmit={(event) => updateUser(event, user2.id)}>
        <input
          type  = "text"
          name = "name"
          value={user2.name}
          onChange = {HandleChange2}
          defaultValue={user2.name}
        />
        <input
          type  = "number"
          name = "age"
          value={user2.age}
          onChange = {HandleChange2}
          defaultValue={user2.age}
        />
        <button type='submit'>Save Changes</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user)=>
            <tr key = {user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
                <button onClick={() => displayUser(user.id)}>Edit</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default App