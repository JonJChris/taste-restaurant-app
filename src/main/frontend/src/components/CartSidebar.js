import React from 'react'

const CartSidebar = ( props ) => {
  
   
  return (

    <div className='container-fluid d-flex flex-column p-0 '>
        <div className='row flex-nowrap bg-dark vh-100'>
            <div className='col'>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
            <li className='nav-item'><a className='nav-link px-0 text-white fw-bold' href="#">Cart</a></li>
                    <li className='nav-item '>
                    <ul className="collapse show nav flex-column ms-2" >
                      
                        <li className='nav-item mb-2'><span className={ props.cartPage === 'cart-items-list'? 'text-warning fw-bold':'text-white' }  id='cart-items-list'>Cart Items</span></li>
                        <li className='nav-item mb-2'><span className={ props.cartPage === 'cart-select-address'? 'text-warning fw-bold':'text-white' } id='cart-select-address'>Select Address</span></li>
                        <li className='nav-item mb-2'><span className={ props.cartPage === 'cart-review-payment'? 'text-warning fw-bold':'text-white' }  id='cart-review-payment'> Review and Payment</span></li>
                        </ul>
                    </li>
                    
                </ul>
            </div>
        </div>

    </div>

  )
}

export default CartSidebar
