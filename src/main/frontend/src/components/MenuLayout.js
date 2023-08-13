import React from 'react'
import MenuSidebar from './MenuSidebar'
import FoodList from './MenuContent'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {actions as staticDataActions } from '../store/slices/staticDataSlice'
import { useEffect } from 'react'
import axios from 'axios';
import InfoModal from './InfoModal'
import { useNavigate } from 'react-router-dom'

const MenuLayout = () => {

  const dispatch = useDispatch();
  const staticData = useSelector( state => state.staticData);

  const [foodItemsList, setFoodItemsList] = useState([]);
  const [menuCategorySelceted, setMenuCategorySelcted] = useState(null);
  const [errorMsg, setErrorMsg] = useState();
  const [modalClass, setModalClass] = useState('modal-display-hide');
  const userStore = useSelector(state => state.userData);
  const navigate = useNavigate();

  const selectFoodCategory = (selectedCategoryId) => {
    setMenuCategorySelcted(selectedCategoryId);
    const items = staticData.foodItemsGroup[selectedCategoryId];
    setFoodItemsList(items);
  }
  

  const showHideModalContent= (showModal, modalMsg) => {
    // console.log(">>>> "+showModal + " , "+modalMsg);
    setErrorMsg(modalMsg);
    setModalClass(showModal? 'modal-display-show':'modal-display-hide')
    console.log(errorMsg)
  }

  useEffect(() => {
    console.log("MENU LAYOUT : "+userStore.currentUserId);
    if(userStore.currentUserId === 0){
      navigate('/login')
    }else{
      navigate('/')
    }

       axios.get('http://localhost:8080/productCategory')
        .then(resp => {
          showHideModalContent(false, '');
          dispatch(staticDataActions.refreshFoodCategory({foodCategory :resp.data}));
        }).catch( error => showHideModalContent(true, "Application not avaialble due to network error"));

        axios.get('http://localhost:8080/products')
        .then(resp => {
          showHideModalContent(false, '');
          dispatch(staticDataActions.refreshFoodItemsGroup({foodItemsGroup :resp.data}));
        }).catch( error => showHideModalContent(true, "Application not avaialble due to network error"));

    
      }, []);

  return (
    <div className='container-fluid overflow-auto '>

    <div className='row '>
        <div className='col-sm-2 g-0'>
          <MenuSidebar foodCategoryList={staticData.foodCategory} selectFoodCategory={selectFoodCategory} selectedMenuCategory={menuCategorySelceted} />
        </div>
        <div className='col-sm g-0'>
          <FoodList  foodItemsList={foodItemsList} />
        </div>
      </div>

    
      <InfoModal modalDisplayStyle={modalClass}>
        <p className='fw-bold fs-5' style={{paddingTop:'20vh'}}  >{errorMsg}</p>
      </InfoModal>

    </div>
  )
}

export default MenuLayout