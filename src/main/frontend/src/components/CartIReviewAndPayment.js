import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actions as cartActions } from './../store/slices/cartSlice'
import AddressSecton from './AddressSecton';
import {getRequestURL} from './../utils/connectionUtils'

const CarteviewAndPayment = () => {
  const cartStore = useSelector(state => state.cartData);
  const userStore = useSelector(state => state.userData);
  const context = useOutletContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [paymentText, setPaymentText] = useState();


  const placeOrder = async () => {



    dispatch(cartActions.setCartStatus({ cartStatus: 'payment-inprogress' }));
    setPaymentButtonText();

    const requestBody = {
      customerId: userStore.currentUserId,
      deliveryAddress: {
        ...cartStore.addressSelected
      },
      orderDate: null,
      orderStatus: 'PENDING',
      orderTotalPrice: cartStore.totalPrice,
      orderItems: [
        ...Object.values(cartStore.cartItems)
      ],
    }


    const reqBody = JSON.stringify(requestBody);

    const requestUrl = `${getRequestURL()}/customers/${userStore.currentUserId}/orders`

    try {
      const resp = await fetch(requestUrl, {
        method: 'post',
        body: reqBody,
        headers: { "Content-Type": "application/json" },
      });

      const respStatus = resp.status;
      
      const data = await resp.json();


      if (resp.status < 200 || resp.status >= 300) {
        console.log("Some error occured  "+JSON.stringify(data));
      }
      
      dispatch(cartActions.setCartStatus({ cartStatus: 'payment-complete' })); setPaymentButtonText();
      navigate(`/account/orders`);
    } catch (error) {
      console.log("Some error occured " + JSON.stringify(error));
    }

  }


  const setPaymentButtonText = () => {
    if (cartStore.cartStatus === 'payment-inprogress') {
      return 'Payment in Progress'
    } else if (cartStore.cartStatus === 'payment-complete') {
      return 'Payment Complete'
    } else {
      return 'Pay & Order'
    }
  }

  useEffect(() => {
    context.setCurrentCartPage('cart-review-payment')
    setPaymentText('Pay & Order');
  }, []);



  return (
    <div className='container-fluid  body-content'>

      {Object.values(cartStore.cartItems).length === 0 &&
        <section className='border row mb-3 mt-3 pt-3 pb-3 bg-white rounded'>
          <span className='col-10'>
            <p>You do not have any items in your cart!</p>
          </span>
        </section>
      }

      <div>

        {Object.values(cartStore.cartItems) && Object.values(cartStore.cartItems).map(item => (
          <section key={item.productId} className='border row mb-3 bg-white rounded'>
            <article className='col-10'>
              <div className='fw-bold text-dark'>{item.productName}</div>
              <div className='m-2'>
                <span>{item.productQuantity}</span>
                <span> X </span>
                <span>${item.productPrice.toFixed(2)}</span>
              </div>
            </article>

            <span className='col-2 fw-bold'>
              $ {(item.productQuantity * item.productPrice).toFixed(2)}
            </span>
          </section>

        ))}

        <AddressSecton address={cartStore.addressSelected} />

        <section className='border row mb-3 bg-white rounded row'>
          <article className='col'>
            <div className='row'>

              <div className='col offset-8 ' ><h4>Total Price: </h4></div>
              <div className='col-2'>
                <h4>$ {cartStore.totalPrice.toFixed(2)}</h4>
              </div>
            </div>

            <div className='row pt-3 pb-2'>
              <div className='col'>
                <button className='btn btn-primary nowrap' onClick={() => { navigate('/') }}>Main Menu</button>
              </div>
              <div className='col'>
                <button className='btn btn-primary' onClick={() => { navigate('/cart/cartselectaddress') }} disabled={!(Object.keys(cartStore.cartItems).length > 0) ? true : false}>Address Selection</button>
              </div>
              <div className='col offset-6'>
                <button className='btn btn-primary' onClick={placeOrder} disabled={(!(Object.keys(cartStore.cartItems).length > 0)) ? true : false}>{setPaymentButtonText()}</button>
              </div>
            </div>
          </article>
        </section>
      </div>
    </div>


  )
}

export default CarteviewAndPayment
