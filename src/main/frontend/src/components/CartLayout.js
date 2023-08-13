import React, { useState, useEffect } from 'react'
import CartSidebar from './CartSidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CartLayout = () => {
  const [cartPage, setCartPage] = useState();
  const userStore = useSelector(state => state.userData)
  const navigate = useNavigate();

  const setCurrentCartPage = (cartPage) => {
    setCartPage(cartPage);
  };
  useEffect(() => {
    if (userStore.currentUserId === 0) {
      navigate('/login')
    }

  }, [])

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-sm-2'><CartSidebar cartPage={cartPage} /></div>
        <div className='col' ><Outlet context={{ setCurrentCartPage }} /></div>
      </div>
    </div>
  )
}

export default CartLayout