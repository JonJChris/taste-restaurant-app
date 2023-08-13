import React, { useEffect, useState } from 'react'
import HomeHeader from './HomeHeader'
import HomeFooter from './HomeFooter'
import { useDispatch, useSelector } from 'react-redux'

import { Outlet, useNavigate } from 'react-router-dom'


const HomeLayout = () => {
  
  const dispatch = useDispatch();
  const userStore = useSelector(state => state.userData)
  const navigate = useNavigate();
  useEffect(() => {
    console.log("HOME LAYOUT : "+userStore.currentUserId);
      if(userStore.currentUserId === 0){
        navigate('/login')
      }else{
        navigate('/')
      }
    // dispatch(useDataActions.loginUser({currentuserId:1001, currentUserName:'vankulas', userLoggedId:true}))
  }, []);

    return (
    <div className="container-fluid">
      <div className='row'>
        <div className='col'>
          <HomeHeader />
        </div>
      </div>
      <div>
        <Outlet  />
      </div>
      <div className='row'>
        <HomeFooter />
      </div>
    </div>
  )
}

export default HomeLayout
