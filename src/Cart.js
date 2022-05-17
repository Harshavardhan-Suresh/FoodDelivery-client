import Axios from 'axios'

const HOMEURL=require('./Homeurl')

function Cart({setPage, cart, setCart, customer_ID}){
    function updateQuantity(food_name){
        return (e)=>{
            const val=e.target.value
            if(val==0){//== works but === doesn't work
                Axios.delete(`${HOMEURL}/customer/cart/${customer_ID}/${food_name}`)
                .then((response)=>{
                    console.log(response.data)
                    setCart(prev=>prev.filter(item=>item.food_name!==food_name))
                })
                return
            }
            Axios.put(`${HOMEURL}/customer/cart/${customer_ID}/${food_name}`, {quantity:val})
            .then((response)=>{
                console.log(response.data)
                setCart(prev=>prev.map(item=>(item.food_name!==food_name?item:{...item, quantity:val})))  
            })
        }
    }

  
    return <div>
        {cart.map(({food_name, quantity})=>
             <div key={food_name}>{food_name}: <input type="number" value={quantity} onChange={updateQuantity(food_name)}></input></div>
        )}
        <div onClick={()=>{setPage('')}}>Back</div>
    </div>
}


export default Cart;