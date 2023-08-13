import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { actions as userDataActions } from './../store/slices/userDataSlice'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [loginForm, setLoginForm] = useState({ username: "", password: "" });
    const dispatch = useDispatch();
    const [showHint, setShowHint] = useState(false)
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const handleChange = (evt) => {
        setLoginForm((prevState) => {
            return {
                ...prevState,
                [evt.target.name]: evt.target.value
            }

        });
    }

    const loginCustomer1 = () => {
        const origin = window.location.origin;
        const reqUrl = `${origin}/customers/login';`
        const reqBody = {
            ...loginForm
        }


        fetch(reqUrl, {
            method: 'post',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
                if (!res.ok) {
                    return res.json().then(
                        text => { 
                            console.log(text.errorMessage);
                            setErrMsg(text.errorMessage);
                            throw new Error(text) 
                        }
                    )
                }
                else {


                    const loginData = res.json();

                    if (loginData) {
                        console.log('loginData : '+loginData);
                        const userData = {
                            currentUserId: loginData.userId,
                            currentUserName: loginData.username,
                            currentUserFirstName: loginData.firstName,
                            currentUserLastName: loginData.lastName,
                            userLoggedId: true
                        }

                        dispatch(userDataActions.loginUser(userData));
                        navigate('/');
                    }
                }
            })
            .catch(err => {
                console.log('caught it!' + errMsg, err);
                console.log('caught it!', err[0]);
                // setErrorMsg(Object.keys(err));
                // setErrMsg(JSON.stringify(err));
            });

    }





    const loginCustomer = async () => {
        const origin = window.location.origin;
        
        const reqUrl = `${origin}/customers/login`;
        const reqBody = {
            ...loginForm
        }

        let loginData = null;
        try {
            const resp = await fetch(reqUrl, {
                method: 'post',
                body: JSON.stringify(reqBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            });


            if (!resp.ok) {
                const err =  await resp.json();
                console.log(err.errorMessage);
                setErrMsg(err.errorMessage);
                throw new Error(err) 
            }

           const loginData = await resp.json();

            if (loginData) {
                setErrMsg('');
                const userData = {
                    currentUserId: loginData.userId,
                    currentUserName: loginData.username,
                    currentUserFirstName: loginData.firstName,
                    currentUserLastName: loginData.lastName,
                    userLoggedId: true
                }

                console.log("::: " + loginData);
                dispatch(userDataActions.loginUser(userData));
                navigate('/');
            } else {
                setErrMsg('Invalid username or password');
            }

        } catch (error) {
            console.log('error : ' + error);
        }

    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
        loginCustomer();

    }


    return (
        <div className="container-fluid">

            <div className='col d-flex justify-content-center align-items-center'>
                <form className="row rounded border mt-5" onSubmit={handleSubmit}>

                    <h3 className='text-align-center'>Welcome to Taste Restraunt</h3>

                    <div className="col">
                        <div className='mb-3'>
                            <label className='form-label' htmlFor='username'>Username</label>
                            <input className='form-control' type='text' name="username" onChange={handleChange} value={loginForm.username} placeholder='Enter your username' required={true} />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label' htmlFor='username'>Password</label>
                            <input className='form-control' type='password' name="password" onChange={handleChange} value={loginForm.password} placeholder='Enter your password' required={true} />
                        </div>
                        <div className='button-group p-0 text-danger' style={{ minHeight: '30px' }}>
                            <p>{errMsg}</p>
                        </div>
                        <div className='button-group row'>
                            <button type="submit" name="login" className="col-2 m-2 btn btn-primary">Login</button>
                            {/* <button type="button" name="signup" className="col-2 m-2 btn btn-primary">Signup</button> */}
                        </div>
                        <div className="button-link">
                            <a href="#" className="form-login-link" onClick={() => setShowHint(!showHint)}>Show hint?</a>
                        </div>
                        <div className='border rounded m-3' style={showHint ? { display: 'block' } : { display: 'none' }} >
                            <table className='table table-bordered' >
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