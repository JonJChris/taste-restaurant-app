import React from 'react'
import foodIcon from './../images/food-icon.png'
import userIcon from './../images/user-icon.png'
import cartIcon from './../images/shopping-cart.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const HomeHeader = () => {

  const cartItemCount = useSelector(state => state.cartData.itemCount);
  const userFirstName = useSelector(state => (state.userData.currentUserFirstName + ' ' + state.userData.currentUserLastName));
  return (
    <header>
      <nav className='navbar navbar-light home-header'>
        <div className='row container-fluid'>

          <div className='col-1'>
            <Link to='/' className='navbar-brand'>
              <img src={foodIcon} alt="" width="50" height="50" />
            </Link>
          </div>
          <div className='col-7'>
            <Link to='/' className='navbar-brand'>
              <strong><span className='fs-2 fw-bold '>Taste Restaurant</span></strong>
            </Link>
          </div>
          <div className='col-1 '>
            <div className="circle-singleline">{cartItemCount}</div>
            <Link to="/cart">
              <img src={cartIcon} alt="" width="40" height="40" />
            </Link>
          </div>
          <div className='col-sm-2'>
            <strong><span className='user-name'>Hi {userFirstName ? userFirstName : 'Guest'}!</span></strong>
          </div>
          <div className='col'>
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