import React, { useEffect } from 'react'
import HomeHeader from './HomeHeader'
import HomeFooter from './HomeFooter'
import { useDispatch, useSelector } from 'react-redux'

import { Outlet, useNavigate } from 'react-router-dom'


const HomeLayout = () => {


  const userStore = useSelector(state => state.userData)
  const navigate = useNavigate();
  useEffect(() => {
    if (userStore.currentUserId === 0) {
      navigate('/login')
    } else {
      navigate('/')
    }

  }, []);

  return (
    <div className="container-fluid">
      <div className='row'>
        <div className='col'>
          <HomeHeader />
        </div>
      </div>
      <div>
        <Outlet />
      </div>
      <div className='row'>
        <HomeFooter />
      </div>
    </div>
  )
}

export default HomeLayout
