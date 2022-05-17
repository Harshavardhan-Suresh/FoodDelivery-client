
import Axios from 'axios';
import {useState, useEffect} from 'react';

const HOMEURL=require('./Homeurl')


function EmployeeHome(props) {
    function markComplete(order_ID){
        Axios.put(`${HOMEURL}/orders/${order_ID}`, {status:'delivered'})
        .then((response)=>{
            setOrders((prev)=>{
                return prev.map(order=>{
                    return order.order_ID!==order_ID?order:{...order, status:'delivered'}
                })
            })
        })
    }
    const [orders, setOrders]=useState([])

    useEffect(()=>{
        Axios.get(`${HOMEURL}/employee/orders/${props.username}`)
        .then((response)=>{
            setOrders(response.data)
        })
    }, [])


    return <div>
        <div> username: {props.username} </div>
        
        <div>Orders</div>
        {orders.map(({restaurant_ID, employee_ID, order_ID, status})=>
             <div key={order_ID} onClick={()=>{markComplete(order_ID)}}>{order_ID} : {restaurant_ID} : {employee_ID}: {status}</div>
        )}
        <div onClick={()=>props.setUsername('')}>Logout</div>

    </div>
    
}
export default EmployeeHome;
