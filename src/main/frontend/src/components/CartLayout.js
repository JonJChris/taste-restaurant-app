import React, { useState, useEffect } from 'react'
import CartSidebar from './CartSidebar'
import CartListItems from './CartIListItems'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CartLayout = () => {
  const [cartPage, setCartPage] = useState();
  const userStore = useSelector(state => state.userData)
  const navigate = useNavigate();

  const setCurrentCartPage = (cartPage) => {
    console.log('Hello >' +cartPage);
    setCartPage(cartPage);
  };
  useEffect(() => {
    console.log("ACCOUNT LAYOUT : "+userStore.currentUserId);
    if(userStore.currentUserId === 0){
      navigate('/login')
    }
    // else{
    //   navigate('/')
    // }
}, [])

  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-sm-2'><CartSidebar  cartPage={cartPage} /></div>
            <div className='col' ><Outlet context={{setCurrentCartPage}} /></div>
        </div>
    </div>
  )
}

export default CartLayout