// import './Login.css';
import Axios from 'axios';
import {useState, useEffect} from 'react';

function Userhome(props) {
    const [cart, setCart] = useState([]);

    return <div> {props.username} </div>
    // useEffect(()=>{
    //     Axios.get(`http://localhost:3001/getcart/${username}`).then((response)=>{
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
