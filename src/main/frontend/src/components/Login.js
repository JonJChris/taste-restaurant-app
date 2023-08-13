import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { actions as userDataActions} from './../store/slices/userDataSlice'
import { json, useNavigate } from 'react-router-dom';

const Login = () => {

    const [loginForm, setLoginForm] = useState({ username: "", password: "" });
    const dispatch = useDispatch();
    const [showHint, setShowHint] = useState(false)
    const [erroMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    const handleChange = (evt) => {
        setLoginForm((prevState) => {
            return {
                ...prevState,
                [evt.target.name]: evt.target.value
            }

        });
    }
    const loginCustomer = async () => {
        const reqUrl = 'http://localhost:8080/customers/login';
        const reqBody = {
            ...loginForm
        }
        console.log("reqBody : "+JSON.stringify(reqBody));


        try{
            const resp = await fetch(reqUrl, {
                method:'post',
                body:JSON.stringify(reqBody),
                headers:{
                    'Content-Type' : 'application/json'
                }
            });
    
            const respStatus = resp.status;
            
            const data = await resp.json();
            
            if(respStatus === 200 && data){
                setErrorMsg('');
                const userData = {
                    currentUserId:data.userId, 
                    currentUserName:data.username, 
                    currentUserFirstName:data.firstName, 
                    currentUserLastName:data.lastName, 
                    userLoggedId:data.password,
                    userLoggedId:true}

                    dispatch(userDataActions.loginUser(userData));
                    navigate('/');
            }else{
                setErrorMsg('Invalid username or password');
            }
            
            
          
            
        }catch(error){
            console.log('error : ' +JSON.stringify(error));
           
        }
        
    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log('form submit '+evt.target.name)
        loginCustomer();
      
       
     
      
        // const currentUser = loginForm.username ? loginForm.username : 'jonsmith@gmail.com';
      
        // if (buttonClicked === 'login') {
        //     dispatch(actions.loginUser({ currentUser }));
        // } else {
        //     dispatch(actions.logoutUser());
        // }
    }


    return (
        <div className="container-fluid">
           
                <div className='col d-flex justify-content-center align-items-center'>
            <form className="row rounded border mt-5" onSubmit={handleSubmit}>
                    
                        <h3 className='text-align-center'>Welcome to Taste Restraunt</h3>
                        
                    <div className="col">
                        <div className='mb-3'>
                            <label className='form-label' htmlFor='username'>Username</label>
                            <input className='form-control' type='text' name="username" onChange={handleChange} value={loginForm.username} placeholder='Enter your username'  required={true}/>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label' htmlFor='username'>Password</label>
                            <input className='form-control' type='password' name="password" onChange={handleChange} value={loginForm.password} placeholder='Enter your password' required={true}/>
                        </div>
                        <div className='button-group p-0 text-danger' style={{minHeight:'30px'}}>
                                <p>{erroMsg}</p>
                        </div>
                        <div className='button-group row'>
                            <button type="submit" name ="login" className="col-2 m-2 btn btn-primary">Login</button>
                            {/* <button type="button" name="signup" className="col-2 m-2 btn btn-primary">Signup</button> */}
                        </div>
                        <div className="button-link">
                             <a href="#" className="form-login-link" onClick={() => setShowHint(!showHint)}>Show hint?</a>
                        </div>
                        <div className='border rounded m-3' style={ showHint?{display:'block'}: {display:'none'}} >
                            <table  className='table table-bordered' >
                                <thead className='fw-bold'><tr><td>Username</td><td >Password</td></tr></thead>
                                <tbody>
                                <tr><td>wadenader</td><td>password</td></tr>
                                <tr><td>andrehane</td><td>password</td></tr>
                                <tr><td>fridamoen</td><td>password</td></tr>
                                <tr><td>titokling</td><td>password</td></tr>
                                <tr><td>dinowiza</td><td>password</td></tr>
                                <tr><td>joelrandom</td><td>password</td></tr>
                                </tbody>
                           </table>
                        </div>

               </div>
            </form>
            </div>
           
        </div>
    )
}

export default Login