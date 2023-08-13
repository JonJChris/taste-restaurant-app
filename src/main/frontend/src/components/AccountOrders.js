import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Orders = () => {

  const userData = useSelector(state => state.userData)
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/customers/${userData.currentUserId}/orders`)
      .then(resp => resp.json())
      .then(orders => {
        setOrders(orders)
      })
      .catch(error => new Error({
        message: error.response,
        timestamp: new Date().toISOString
      }));

  }, []);

  const getOrderStatusStyleClass = (orderStatus) => {
    if (orderStatus === 'COMPLETED') {
      return 'text-success';
    } else if (orderStatus === 'CANCELLED') {
      return 'text-primary';
    }
  }


  return (

    <div className='container overflow-auto mt-3 pl-0 ml-0 vh-100'>

      {orders && orders.length === 0 &&
        <div className='border row bg-white rounded mb-5'>
          <div className='col-10'>
            <p className='fw-b'>You do not any order in your account!</p>
          </div>
        </div>
      }


      {
        orders && orders.sort((a, b) => b.orderId - a.orderId).map(order => (
          <div key={order.orderId} className="border p-3 mb-2 bg-white rounded">
            <p className='fw-bold'><label>Order ID : </label>{order.orderId}</p>
            <span><label className='fw-bold'>Order Date : </label>{order.orderDate}</span><br />
            <span><label className='fw-bold'>Order Delivery Addreess : </label><br />{order.deliveryAddress.addressLine1},
              {order.deliveryAddress.addressLine2}, {order.deliveryAddress.city},{order.deliveryAddress.state},
              {order.deliveryAddress.country}</span><br />
            <div><label className='fw-bold'>Order Staus : </label><span className={`fw-bold  ${getOrderStatusStyleClass(order.orderStatus)}`}>{order.orderStatus}</span></div>
            <Link to={`/account/orderDetails/${order.orderId}`}>Go to order</Link>
          </div>

        ))
      }



    </div>

  )
}

export default Orders