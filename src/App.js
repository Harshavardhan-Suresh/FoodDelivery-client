import './App.css';
import Login from './Login';
import React, {useState} from 'react';
import Axios from 'axios';
import Userhome from './Userhome';

function App() {
  const [username, setUsername] = useState('');

  if (username) {
    return (
      <div>
        <Userhome username = {username} />
      </div>
    )
  }
  else {
    return (
      <div>
        <Login setUsername = {setUsername} />
      </div>
    )
  }
}

export default App;
