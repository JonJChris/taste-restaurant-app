import React from 'react'
import foodIcon from './../images/food-icon.png'
import userIcon from './../images/user-icon.png'
import cartIcon from './../images/shopping-cart.png'
import { Link } from 'react-router-dom'
import { UseSelector, useSelector } from 'react-redux'

const HomeHeader = () => {

  const cartItemCount = useSelector( state => state.cartData.itemCount);
  const userFirstName = useSelector( state => state.userData.currentUserName);
  return (
    <header>
      <nav className='navbar navbar-light home-header'>
        <div className='row container'>

          <div className='col'>
            <Link to='/' className='navbar-brand'>
              <img src={foodIcon} alt="" width="50" height="50" />
            </Link>
           </div>
            <div className='col-7'>              
            <Link to='/' className='navbar-brand'>
              <strong><span className='fs-2 fw-bold '>Taste Restraunt</span></strong>
            </Link>
          </div>
          <div className='col-1 '>
          <div className="circle-singleline">{cartItemCount}</div> 
            <Link to="/cart">
              <img src={cartIcon} alt="" width="50" height="50" />
            </Link>
          </div>
          <div className='col-2'>
            <strong><span className='user-name'>Hi {userFirstName ? userFirstName : 'Guest'}!</span></strong>
          </div>
          <div className='col-1'>
            <Link to="/account">
              <img src={userIcon} alt="" width="50" height="50" />
            </Link>

          </div>
        </div>
      </nav>

    </header>
  )
}

export default HomeHeader