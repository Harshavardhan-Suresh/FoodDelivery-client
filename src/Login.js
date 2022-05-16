
import Axios from 'axios';
import {useState} from 'react';
function Login(props) {

  function checkUser(){
    if(!username){
        return
    }
    Axios.get(`http://localhost:3001/getuser/${username}`).then((response)=>{
        if (response.data[0] && response.data[0].password === password) {
            props.setUsername(username)
            console.log('Succesfful login')
        }
        else console.log('Unsuccessful login');
    })
  }
    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');

  return (
    <div>
      <input type='text' placeholder='username' onChange={(e)=>{
          e.preventDefault()
          setUsername(e.target.value)}
          }></input>
      <input type='text' placeholder='password' onChange={(e)=>{
          e.preventDefault()
          setPassword(e.target.value)}
          }></input>
      <div onClick={checkUser}>login</div>
    </div>
  );
}
export default Login;
