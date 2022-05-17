import Login from './Login'
import React, {useState} from 'react'
import Axios from 'axios'
import CustomerHome from './CustomerHome'
import EmployeeHome from './EmployeeHome'


function App() {
  const [username, setUsername] = useState('')
  const [user, setUser] = useState('Customer')
  if (username) {
    if(user==='Customer')
    return (
      <div>
        <CustomerHome username = {username} setUsername={setUsername}/>
      </div>
    )
    else{
      return(
        <div>
          <EmployeeHome username = {username} setUsername={setUsername}/>
        </div>
      )
    }
  }
  else {
    return (
      <div>
        <Login setUsername = {setUsername} user={user} setUser={setUser}/>
      </div>
    )
  }
}

export default App;
