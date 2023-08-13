import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AccountSidebar from './AccountSidebar'
import { useSelector} from 'react-redux'
const AccountLayout = () => {

    const userStore = useSelector(state => state.userData)
    const navigate = useNavigate();

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
        <div className='container-fluid p-0'>
            <div className='row'>
            <div className='col-2 sidebar'>
              <AccountSidebar />
            </div>
            <div className='col-10 p-0'>
                <Outlet />
            </div>
            </div>
        </div>
    )
}

export default AccountLayout