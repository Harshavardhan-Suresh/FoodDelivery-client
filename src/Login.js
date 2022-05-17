
import Axios from 'axios';
import {useState} from 'react';
const HOMEURL=require('./Homeurl')
function Login(props) {
  function checkUser(){
    if(!username){
      return
    }
    if(props.user==='Customer'){
      Axios.get(`${HOMEURL}/customer/${username}`)
      .then((response)=>{
        if (response.data[0] && response.data[0].password === password) {
            props.setUsername(username)
            console.log('Successful login Customer')
        }
        else {
          console.log('Customer Login failed')
        }
    })
    }
    else{//Employee
      Axios.get(`${HOMEURL}/employee/${username}`)
      .then((response)=>{
        if(response.data[0] && response.data[0].password === password){
          props.setUsername(username)
          console.log('Successful Login Employee')
        }
        else{
          console.log('Employee Login failed')
        }
      })
    }
    
  }
 

  const [username, setUsername]=useState('');
  const [password, setPassword]=useState('');

  return (
    <div>
      <div onClick={()=>{
        props.setUser(prev=>prev==='Customer'?'Employee':'Customer')
      }}>{props.user}</div>
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
