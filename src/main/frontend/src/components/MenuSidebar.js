import React from 'react'
import { useEffect } from 'react'


const MenuSidebar = (props) => {



  useEffect(() => {
    props.selectFoodCategory(26576);
  }, []);

  return (
    <div className='container-fluid p-0'>
      <div className="flex-shrink-0 p-4 text-white bg-dark vh-100 ">
        <ul className="nav nav-pills flex-column mb-auto redpills">
          {
            props.foodCategoryList.map(category => {
              return (
                <li key={category.productCategoryId}>
                  <a href="#" onClick={() => props.selectFoodCategory(category.productCategoryId)} className={`nav-link text-white ${props.selectedMenuCategory === category.productCategoryId ? 'active' : ''}`} name={category.productCategoryId}>{category.productCategoryName}</a>
                </li>
              )
            })
          }
        </ul>
        <hr />
      </div>
    </div>


  )
}

export default MenuSidebar