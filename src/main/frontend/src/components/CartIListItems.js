import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useOutletContext, useNavigate } from 'react-router-dom';

const CartListItems = () => {
  const cart = useSelector(state => state.cartData);
  const navigate = useNavigate();
  const context = useOutletContext();

  useEffect(() => {
    context.setCurrentCartPage('cart-items-list')
  }, []);

  return (
    <div className='container-fluid body-content'>

      {Object.values(cart.cartItems).length === 0 &&
        <div className='border row bg-white rounded mb-5'>
          <div className='col-10'>
            <p className='fw-b'>You do not have any items in your cart!</p>
          </div>
        </div>
      }

      <div>

        {Object.values(cart.cartItems) && Object.values(cart.cartItems).map(item => (
          <div  key={item.productId} className='border row mb-3 bg-white rounded'>
            <div className='col-10'>
              <div className=' fw-bold text-dark'>{item.productName}</div>
              <div className=' m-2'>
                <span>{item.productQuantity}</span>
                <span> X </span>
                <span>${item.productPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className='col-2 fw-bold'>
              $ {(item.productQuantity * item.productPrice).toFixed(2)}
            </div>
          </div>

        ))}
        <div className='border row mb-3 bg-white rounded row'>
          <div className='col'>
            <div className='row'>

              <div className='col offset-8 fw-bold' ><p>Total Price: </p></div>
              <div className='col-2'>
                <p className='fw-bold'>$ {cart.totalPrice.toFixed(2)}</p>
              </div>
            </div>

            <div className='row pt-3 pb-2'>
              <div className='col'>
                <button className='btn btn-primary' onClick={() => { navigate('/') }}>Back to Menu</button>
              </div>
              <div className='col offset-8'>
                <button className='btn btn-primary' onClick={() => { navigate('/cart/cartselectaddress') }} disabled={!(Object.keys(cart.cartItems).length > 0) ? true : false}>Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CartListItems