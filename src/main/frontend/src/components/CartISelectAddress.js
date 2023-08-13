import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { json, useNavigate, useOutletContext } from 'react-router-dom';
import { actions as cartDataActions } from './../store/slices/cartSlice'
import AddressSecton from './AddressSecton';
import AddressForm from './AddressForm';
const CartSelectAddress = () => {

  const cart = useSelector(state => state.cartData);
  const userData = useSelector(state => state.userData);
  const context = useOutletContext();
  const [addresses, setAddresses] = useState();
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState();

  const updateAddressSelectionInStore = (allAddresses ,selectedAddreessId) => {
    const selectedAddress = allAddresses && allAddresses.filter(item => item.addressId === selectedAddreessId)
    dispatch(cartDataActions.selectCartAddress({
      addressSelected: {
        ...selectedAddress[0]
      }
    }));
  }

  const proceedToPayment = () => {

    if(!cart.addressSelected || Object.keys(cart.addressSelected).length === 0){
      setErrorMsg('Please select an address for delivery');
    }else{
      setErrorMsg('');
    }
    navigate('/cart/cartrevieandpayment');
  }

  useEffect(() => {
    context.setCurrentCartPage('cart-select-address')

    const fetchCustomerAddress = async () => {
      const customerId = userData.currentUserId;
      console.log('customerId : ' + customerId);
      try {
        const resp = await axios.get(`http://localhost:8080/customers/${customerId}/addresses`);
        const customerAddress = await resp.data;
        setAddresses(customerAddress);
        console.log("ADD : "+customerAddress);
        // const addressSelection = customerAddress.filter(item => item.isDefault);
        // if (addressSelection.length > 0) {
        //    updateAddressSelectionInStore(customerAddress, addressSelection[0].addressId);
        // }

      } catch (error) {
        throw new Error({ errormessage: error });
      }

    }


    fetchCustomerAddress();


  }, []);


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
    <div className='container-fluid  body-content'>
      <div className='row'>
        <h4>Select Address</h4>

      <div className='col'>

          {
            addresses &&  addresses.map(item => (

              <section className='row ' style={{ cursor: 'pointer' }} onClick={() => updateAddressSelectionInStore(addresses , item.addressId)}>
                  <div className=''>
                      <AddressSecton borderStyle={`border mb-3 p-2 ${cart.addressSelected.addressId === item.addressId ? 'border-success' : ''} rounded p-1`} address = {item}/>
                    </div>
              </section>
            ))
          }
        
      </div>

      <div className='row pb-4'>
        <div className='col-2'>
        <button className='btn btn-primary' onClick={() => setShowForm(true)} disabled={showForm} >Add New Address</button>
        <div style={showForm ? { display: '' } : { display: 'none' }}>
         <AddressForm formSubmitCallback={formSubmitCallback} showAddressForm={showAddressForm} />
        </div>
        </div>
        <div className='col-4'>
          <p className='text-danger'>{errorMsg}</p>
        </div>
      </div>


      <section className='row p-0'>
        <div className='col-8' ><button className='btn btn-primary' onClick={() => { navigate('/') }}>Back to Menu</button></div>
        <div className='col-2'>
          <button className='btn btn-primary mb-3' onClick={() => { navigate('/cart') }} disabled={cart.CartSelectAddress ? true : false} >Back to Cart Items</button>
        </div>
        <div className='col-2'>
          <button className='btn btn-primary mb-3' onClick={proceedToPayment} disabled={cart.CartSelectAddress ? true : false} >Proceed to Payment</button>
        </div>
      </section>
    </div>
    </div>
  )
}

export default CartSelectAddress