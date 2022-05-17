import Axios from 'axios'
import {useEffect, useState} from 'react'

const HOMEURL=require('./Homeurl')
function RestaurantFoods({setPage,selectedRestaurant, setSelectedRestaurant, cart, setCart, orders, setOrders, customer, setCustomer}){
    const [foods, setFoods]=useState([]);

    useEffect(()=>{
        Axios.get(`${HOMEURL}/foods/${selectedRestaurant}`).then((response)=>{
            setFoods(response.data)
        })
    }, [])

    function addFood(food_name){
        if(selectedRestaurant!==customer.restaurant_ID){
            Axios.delete(`${HOMEURL}/customer/cart/${customer.customer_ID}`)
            .then((response)=>{
                setCart([]);
                Axios.put(`${HOMEURL}/customer/${customer.customer_ID}`, {restaurant_ID:selectedRestaurant})
                .then((response)=>{
                    setCustomer(prev=>({...prev,restaurant_ID:selectedRestaurant}))

                    Axios.post(`${HOMEURL}/customer/cart/${customer.customer_ID}`, {quantity:1, food_name})
                    .then((response)=>{
                        setCart(prev=>[...prev, {quantity:1, customer_ID:customer.customer_ID, food_name}])
                        console.log(response.data)
                    })
                    .catch(error=>console.log("couldn't add to cart"))
                    console.log(response.data)
                })
            })
            .catch(error=>console.log(error))
        }
        else{
            if(cart.filter(item=>item.food_name===food_name).length){
                return
            }

            Axios.post(`${HOMEURL}/customer/cart/${customer.customer_ID}`, {quantity:1, food_name})
            .then((response)=>{
                setCart(prev=>[...prev, {quantity:1, customer_ID:customer.customer_ID, food_name}])
                console.log(response.data)
            })
            .catch(error=>console.log("couldn't add to cart"))
        }
    }

    return <div>
        <div>Items in cart: {cart.length}</div>
        <div>Restaurant id: {selectedRestaurant}</div>
        <div>Foods</div>
        {foods.map((food)=><div key={food.food_name} onClick={()=>{addFood(food.food_name)}}>
            {food.food_name} price: {food.price}
        </div>)}
        <div onClick={()=>{setPage('')}}>Back</div>

    </div>
}

export default RestaurantFoods