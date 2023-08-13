import React from 'react'
import {Link} from 'react-router-dom'

const AccountSidebar = () => {
  return (
    <article className='container p-0'>
        <section className=' d-flex flex-column flex-shrink-0 p-3 text-white bg-dark vh-100 overflow-hidden'>
        
                    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">

                        <span className="fs-4">Account</span>
                    </a>
                    <hr />
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item"><Link className="nav-link text-white" to='.'>Home</Link></li>
                        <li className="nav-item"><Link className="nav-link text-white" to='/account/orders'>Orders</Link></li>
                        <li className="nav-item"><Link className="nav-link text-white" to='/account/address'>Address</Link></li>
                        <li className="nav-item"><Link className="nav-link text-white" to='/account/feedback'>Feedback</Link></li>
                    </ul>
                    <hr />
        



        </section>
    </article>
  )
}

export default AccountSidebar