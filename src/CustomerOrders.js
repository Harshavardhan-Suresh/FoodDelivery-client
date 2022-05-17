
function CustomerOrders({setPage, orders, setOrders}){
    return <div>
        {orders.map(({restaurant_ID, employee_ID, order_ID, status})=>
             <div key={order_ID}>{order_ID} : {restaurant_ID} : {employee_ID} : {status}</div>
        )}
        <div onClick={()=>{setPage('')}}>Back</div>

    </div>
}

export default CustomerOrders