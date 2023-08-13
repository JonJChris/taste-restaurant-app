import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import AddressSecton from './AddressSecton';

const AccountOrderDetails = () => {

  const userStore = useSelector(state => state.userData);
  const [order, setOrder] = useState();
  const { orderId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const reqUrl = `http://localhost:8080/customers/${userStore.currentUserId}/orders/${orderId}`

      try {
        const resp = await fetch(reqUrl);
        const respStatus = resp.status;

        const orderDetail = await resp.json();

        if (respStatus < 200 || respStatus >= 300) {
          throw new Error('Some error occured : ' + JSON.stringify(orderDetail))
        }
        setOrder(orderDetail);

      } catch (error) {
        console.log(JSON.stringify(error))
      };



    }
    fetchData();


  }, []);

  const getOrderStatusStyleClass = (orderStatus) => {
    if (orderStatus === 'COMPLETED') {
      return 'text-success';
    } else if (orderStatus === 'CANCELLED') {
      return 'text-primary';
    }
  }


  return (

    <div className='container body-content overflow-auto  vh-100'>

      {order &&
        <div key={order.orderId} className="border bg-white rounded p-3 mb-2">
          <p className='fw-bold'><label>Order ID : </label>{order.orderId}</p>
          <span><label className='fw-bold'>Order Date : </label>{order.orderDate}</span><br />
          <span><label className='fw-bold'>Order Delivery Addreess : </label><br />{order.deliveryAddress.addressLine1},
            {order.deliveryAddress.addressLine2}, {order.deliveryAddress.city},{order.deliveryAddress.state},
            {order.deliveryAddress.country}</span><br />
          <div><label className='fw-bold'>Order Staus : </label><span className={`fw-bold  ${getOrderStatusStyleClass(order.orderStatus)}`}>{order.orderStatus}</span></div>
        </div>


      }

      {order && order.orderItems && order.orderItems.map(item => (
        <section key={item.productId} className="border bg-white rounded p-3 mb-2 row">
          <article className='col'>
            <div className='fw-bold'>{item.productName}</div>
            <div className=''>
              <span>{item.productQuantity}</span>
              <span> X </span>
              <span>${item.productPrice.toFixed(2)}</span>
            </div>
          </article>

          <span className='col-2 fw-bold'>
            $ {(item.productQuantity * item.productPrice).toFixed(2)}
          </span>
        </section>

      ))

      }

      {
        order && order.orderTotalPrice &&
        <div className='border row mb-3 bg-white rounded row'>
          <div className='col'>
            <div className='row'>

              <div className='col offset-8 fw-bold' ><p>Total Price: </p></div>
              <div className='col-2'>
                <p className='fw-bold'>$ {order.orderTotalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div></div>
      }

      <div className='col'>
        {order && order.deliveryAddress &&

          <section>
            <div className=''>
              <AddressSecton borderStyle='border mb-3 p-2 rounded p-1' address={order.deliveryAddress} />
            </div>
          </section>
        }
      </div>



    </div>



  )
}
export default AccountOrderDetails;