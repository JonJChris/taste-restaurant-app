import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { actions } from './../store/slices/staticDataSlice';


const AppDataLoader = () => {
    const dispatch = useDispatch();
    const foodCategoryList = useSelector((state) => state.staticData.foodMenuCategory);

    const getFoodCategory = (foodMenu) => {
        const foodCategory = foodMenu.map(menuCategory => ({
            id: menuCategory.id,
            name: menuCategory.name,
            position: menuCategory.position,
        }))
        return foodCategory;
    }

    const getFoodList = (foodMenu =>{
        const menuList = foodMenu.reduce((obj, currrentItem) => ({...obj, [currrentItem.id]:currrentItem["menu-items"]}), {});
        return menuList;
    });

    const getAllMenuItems = (foodMenu) => {
        //const itemsArr = foodMenu.flatMap( item => item['menu-items'][0]['sub-items']);
        // const itemsArrLvl1 = foodMenu.flatMap( (item, indx ,result) => item['menu-items'][1]['sub-items']);
        // console.log(JSON.stringify(itemsArrLvl1));
        //const itemsArrLvl2 = foodMenu.flatMap( item => item['menu-items']);
        
        //const itemsObjectsList = itemsArr.reduce( (obj, currentItem) => ({...obj, [currentItem.id] : currentItem}), {})
       // console.log(JSON.stringify(itemsObjectsList));
        return //itemsObjectsList;
    }
    useEffect(
        () => {
            
            
            const someData = async () =>{
                const resp = await fetch('http://localhost:8080/productCategory');
                const cat = await resp.json();
            }
            someData();
            if (foodCategoryList.length === 0) {

                const fetchFoodMenu = async () => {
                    const foodMenuPromise = await fetch('/api/foodmenu');
                    const foodMenu = await foodMenuPromise.json();
                    const foodCategory = getFoodCategory(foodMenu);
                    const foodMenuListGrouped = getFoodList(foodMenu);
                    // const foodMenuListDestrctured = getAllMenuItems(foodMenu);
                    getAllMenuItems(foodMenu);
                    dispatch(actions.refreshFoodCategory({ foodMenuCategory: foodCategory }));
                    dispatch(actions.foodMenuListGrouped({ foodMenuListGrouped: foodMenuListGrouped }));
                    //  dispatch(actions.foodMenuListDestrctured({ foodMenuListDestrctured: foodMenuListDestrctured }));
                }

                fetchFoodMenu();
            }
        }, []


    );

    return (
        <></>
    )
}

export default AppDataLoader
