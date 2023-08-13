import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actions as cartActions } from '../store/slices/cartSlice'
import foodPlaceholderImage from './../images/food-image-placeholder.png'

const MenuContent = (props) => {


  const dispatch = useDispatch();

  const addItemToCart = (productId, productPrice, productName) => {
    console.log(productId);
    dispatch(cartActions.addItemToCart({ productId, productPrice, productName }));
  }

  const removeItemFromCart = (productId, productPrice, productName) => {
    dispatch(cartActions.removeItemFromCart({ productId, productPrice, productName }));
  }

  const cartItems = useSelector(state => state.cartData.cartItems);

  const GenerateAddToCartButton = ({ foodItem }) => {
    return (
      <article  >
        {!cartItems[foodItem.productId] &&
          <button className='btn btn-primary text-nowrap text-white'
            name={foodItem.productId} onClick={() => addItemToCart(foodItem.productId, foodItem.productPrice, foodItem.productName)}>Add to cart</button>}

        {
          cartItems[foodItem.productId] &&
          <span className='row'>
            <div className='col'> 
            <div className='row p-2 pb-0'>
              <button className='btn btn-primary col-1 ' name={foodItem.productId}
              onClick={() => addItemToCart(foodItem.productId, foodItem.productPrice, foodItem.productName)}>+</button>
  
  
            <p className='food-item-count text-primary text-sm col-1'>{cartItems[foodItem.productId].productQuantity}</p>

          <button className='btn btn-primary col-1'  name={foodItem.productId}
            onClick={() => removeItemFromCart(foodItem.productId, foodItem.productPrice, foodItem.productName)}>-</button>
            </div>
          
            
            </div>
            
          </span>
        }
      </article>
    )
  }

  return (
    <div className='container body-content overflow-auto  vh-100'>
      {

        props.foodItemsList && props.foodItemsList.map(item => {
          return (
            <section key={item.productId} className='row  '>
              <article className='col border rounded bg-white mb-2  pb-2'>
                <section className='row'>
                  <article className='col'>
                    <p className='fw-bold'>{item.productName}</p>
                    <p>{item.productDescription}</p>
                    <p className='food-item-name text-success fw-bold'>${item.productPrice}</p>
                    <GenerateAddToCartButton foodItem={item} />
                  </article>
                  <article className='col'>
                  <img className='food-thumbnail' src={foodPlaceholderImage} alt='food-placeholder' />
                  </article>
                </section>
              </article>
            </section>
          );
        })
      }

    </div>
  );
}

export default MenuContent