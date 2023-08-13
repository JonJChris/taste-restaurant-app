import React from 'react'

const AddressSecton = (props) => {
  const borderStyle = props.borderStyle ? props.borderStyle : 'row border rounded bg-white mb-4';
  return (
    <div className={borderStyle}>
    <div className='col'>
      <strong>Address:</strong>
      <h6>{props.address.addressLine1}<br />
        {props.address.addressLine2 && props.address.addressLine2 + '\n'}
        {props.address.city}<br /> {props.address.state}<br />
        {props.address.country}<br />
        {props.address.phoneNumber}</h6>
    </div>
  </div>
  )
}

export default AddressSecton