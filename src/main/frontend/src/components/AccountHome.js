import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {actions as userActions} from './../store/slices/userDataSlice'
import { useNavigate } from 'react-router-dom';
const AccountHome = () => {
  const userData = useSelector(state => state.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutUser = () => {
      dispatch(userActions.logoutUser());
      navigate('/');
  }
  return (
    
    <div className='pt-3 container'>
        
        <div className="card" >
    
  <div className="card-body">
    <h5 className="card-title">Welcome {userData.currentUserFirstName} {userData.currentUserLastName}</h5>
    
    {/* <div className="col-sm-8">
        <label for="exampleFormControlInput1" className="form-label">Username</label>
        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
    </div> */}
    
    
    <div className="row mt-4">
    <div className="col-sm-2">
    <button className='btn btn-primary ml-2' onClick={logoutUser}>Logout</button>
    
          
    </div>
    <div className="col-sm-2">
      {/* <button className='btn btn-primary'>Change Password</button> */}
    </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default AccountHome