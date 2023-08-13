import { createSlice } from "@reduxjs/toolkit";

const staticDataSlice = createSlice({
    name: "staticData",
    initialState:{ 
        loadData:true,
        foodCategory:[],
        foodItemsGroup:{},
        
    },
    reducers:{
        refreshFoodCategory : (state, action) => {
            state.foodCategory = action.payload.foodCategory
        },

        refreshFoodItemsGroup : (state, action) => {
            state.foodItemsGroup = action.payload.foodItemsGroup
        },

    }

});

export const actions = staticDataSlice.actions;
export default staticDataSlice;