// import './Login.css';
import Axios from 'axios';
import {useState, useEffect} from 'react';

const HOMEURL=require('./Homeurl')


function Userhome(props) {
    const [cart, setCart] = useState([]);

    return <div> {props.username} </div>
    // useEffect(()=>{
    //     Axios.get(`${HOMEURL}/getcart/${username}`).then((response)=>{
    //     setCart(response)})
    // }, []);

//     const items = cart.map((item) => <div> {item.food_name} | {item.qty} </div>)

//   return (
//     <div>
//       {items}
//     </div>
//   );
}
export default Userhome;
