
import Axios from 'axios';
import {useState, useEffect} from 'react';
import RestaurantFoods from './RestaurantFoods'
import Cart from './Cart'
import CustomerOrders from './CustomerOrders'
const HOMEURL=require('./Homeurl')

function CustomerHome(props) {
    const [cart, setCart] = useState([])
    const [orders, setOrders]=useState([])
    const [restaurants, setRestaurants]=useState([])
    const [selectedRestaurant, setSelectedRestaurant]=useState(null)
    const [customer, setCustomer]=useState({})
    const [page, setPage]=useState('')


    useEffect(()=>{
        Axios.get(`${HOMEURL}/customer/${props.username}`).then((response)=>{
            setCustomer(response.data[0]);
        })
    },[])
    useEffect(()=>{
        Axios.get(`${HOMEURL}/customer/cart/${props.username}`).then((response)=>{
        setCart(response.data)
    })
    }, [])

    useEffect(()=>{
        Axios.get(`${HOMEURL}/customer/orders/${props.username}`).then((response)=>{
        setOrders(response.data)})
    }, [])
    useEffect(()=>{
        Axios.get(`${HOMEURL}/restaurants`).then((response)=>{
        setRestaurants(response.data)})
    }, [])

    // useEffect(()=>{
    //     console.log(customer);
    // }, [customer])



    function postorder(){
        if(!cart[0]){
            return
        }
        Axios.get(`${HOMEURL}/orders`)
        .then(response=>{
            const order_no=response.data.length
            Axios.post(`${HOMEURL}/customer/orders/${props.username}`, {order_ID:`O${order_no}`, status:"pending", customer_ID:props.username, restaurant_ID:'r1', employee_ID:'e1', details:cart})
            .then((response)=>{
                console.log(response.data)
                setOrders(prev=>[...prev, {order_ID:`O${order_no}`, status:"pending", customer_ID:  props.username, restaurant_ID:'r1', employee_ID:'e1', details:cart}])
                Axios.delete(`${HOMEURL}/customer/cart/${customer.customer_ID}`)
                .then((response)=>{
                    setCart([]);
                    Axios.put(`${HOMEURL}/customer/${customer.customer_ID}`, {restaurant_ID:null})
                    .then((response)=>{
                        setCustomer(prev=>({...prev, restaurant_ID:null}))
                    })
                })
            })
        })
        
        
    }


    if(page==='RestaurantFoods'){
        return <RestaurantFoods setPage={setPage} selectedRestaurant={selectedRestaurant} setSelectedRestaurant={setSelectedRestaurant} cart={cart} setCart={setCart} orders={orders} setOrders={setOrders} customer={customer} setCustomer={setCustomer}/>
    }
    else if(page==='Cart'){
        return <Cart setPage={setPage} cart={cart} setCart={setCart} customer_ID={customer.customer_ID}/>
    }
    else if(page==='CustomerOrders'){
        return <CustomerOrders setPage={setPage} orders={orders} setOrders={setOrders}/>
    }
    return <div>
        <div> username: {props.username} </div>
        <div>Restaurants</div>
        {restaurants.map((restaurant)=>
            <div key={restaurant.restaurant_ID} onClick={()=>{
                setSelectedRestaurant(restaurant.restaurant_ID)
                setPage('RestaurantFoods')
            }}>
                {restaurant.name}
            </div>
        )}

        <div onClick={()=>{setPage('Cart')}}>Cart</div>
        <div onClick={()=>{setPage('CustomerOrders')}}>Orders</div>
        <div onClick={postorder}> click here to place order</div>
        <div onClick={()=>{props.setUsername('')}}>logout</div>

    </div>
    
}
export default CustomerHome;
