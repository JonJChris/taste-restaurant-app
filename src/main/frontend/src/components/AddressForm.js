import React, { useRef } from 'react'


const AddressForm = (props) => {

    const addressLine1Ref = useRef();
    const addressLine2Ref = useRef();
    const cityRef = useRef();
    const stateRef = useRef();
    const countryRef = useRef();
    const phoneNumberRef = useRef();

    const handleSubmit = (evt) => {
        evt.preventDefault();

        props.formSubmitCallback({
            addressLine1: addressLine1Ref.current.value,
            addressLine2: addressLine2Ref.current.value,
            city: cityRef.current.value,
            state: stateRef.current.value,
            country: countryRef.current.value,
            phoneNumber: phoneNumberRef.current.value,
        });
        cancelForm();
    }

    const cancelForm = () => {
        addressLine1Ref.current.value = '';
        addressLine2Ref.current.value = '';
        cityRef.current.value = '';
        stateRef.current.value = '';
        countryRef.current.value = '';
        phoneNumberRef.current.value = '';
        props.showAddressForm(false);

    }

    return (
        <section className='container '>
            <form className='row mb-3 col-6 border rounded p-4 mt-3' onSubmit={handleSubmit}>

                <p className='fw-bold col'>Add New Address:</p>

                <div className='row'>
                    <label className='form-label'>Address Line 1: </label>
                    <input ref={addressLine1Ref} className='form-control' type='text' name='addressLine1' required={true} />
                </div>
                <div className='row'>
                    <label className='form-label'>Address Line 2: </label>
                    <input ref={addressLine2Ref} className='form-control' type='text' name='addressLine2' />
                </div>
                <div className='row'>
                    <label className='form-label'>City: </label>
                    <input ref={cityRef} className=' form-control' type='text' name='city' required={true} />
                </div>
                <div className='row'>
                    <label className='form-label'>State: </label>
                    <input ref={stateRef} className=' form-control' type='text' name='state'required={true} />
                </div>
                <div className='row'>
                    <label className='form-label'>Country: </label>
                    <input ref={countryRef} className=' form-control' type='text' name='country' required={true} />
                </div>
                <div className='row'>
                    <label className='form-label'>Phone Number: </label>
                    <input ref={phoneNumberRef} className=' form-control' type='text' name='phoneNumber' required={true} /></div>
                <div className='row'>
                    <input type='button' className='col btn btn-primary m-3' value='cancel' name='buttonCancel' onClick={cancelForm} />
                    <input type='submit' className='m-3 col btn btn-primary' value='submit' name='buttonSubmit' />
                </div>
            </form>

        </section>
    )
}

export default AddressForm