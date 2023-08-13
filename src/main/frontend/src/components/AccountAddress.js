import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import AddressSecton from './AddressSecton';
import AddressForm from './AddressForm';
const AccountAddress = () => {

  const [addresses, setAddresses] = useState();
  const userData = useSelector(state => state.userData)
  const [showForm, setShowForm] = useState(false);
  
  const showAddressForm = (showform) => {
    setShowForm(showform)
  }

  useEffect(() => {

    fetch(`http://localhost:8080/customers/${userData.currentUserId}/addresses`)
      .then(resp => resp.json())
      .then(addresses => {
        setAddresses(addresses)
        console.log(addresses)
      })
      .catch(error => new Error({
        message: error.response,
        timestamp: new Date().toISOString
      }));

  }, []);

const formSubmitCallback = (formData) => {

  const reqUrl = `http://localhost:8080/customers/${userData.currentUserId}/addresses`
  const reqBody = JSON.stringify(formData);
  fetch(reqUrl, {
    method:'post',
    body: reqBody,
    headers: {
      'Content-type': 'application/json'
    }
  })
  .then(resp => resp.json())
  .then(data => {
    showAddressForm(false);
    setAddresses(data);
    
  })
  .catch(error => console.log("Some error occured : "+JSON.stringify(error)));
}
  return (
    <div className='container-fluid menu-list-container overflow-auto vh-100 pt-3 pl-2'>
      {
        addresses && addresses.map(address => (
            <AddressSecton address={address}  />
        ))
      }
      <button className='btn btn-primary' onClick={() => setShowForm(true)} disabled={showForm} >Add New Address</button>


      <div style={showForm ? { display: '' } : { display: 'none' }}>
         <AddressForm formSubmitCallback={formSubmitCallback} showAddressForm={showAddressForm} />
      </div>

    </div>
  )
}

export default AccountAddress