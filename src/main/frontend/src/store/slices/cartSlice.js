import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name:'cartData',
    initialState:{ itemCount:0,
                   totalPrice:0,
                   cartItems:{},
                   cartStatus:'payment-pending',
                   addressSelected :{}
                    },
    reducers:{


      addItemToCart : (state,action) => {
         const item = action.payload;
         state.totalPrice = state.totalPrice + item.productPrice;
         if(state.cartItems[item.productId]){
           state.cartItems[item.productId].productQuantity++
         }else{
            state.cartItems[item.productId] = {
              productId:item.productId, 
              productQuantity: 1, 
              productPrice: item.productPrice, 
              productName: item.productName};
         }
         state.itemCount++;
      },


      removeItemFromCart : (state,action) => {
        const item = action.payload;
        if(state.cartItems[item.productId] ){
          if(state.cartItems[item.productId].productQuantity === 1){
            delete state.cartItems[item.productId]
          }else{
            state.cartItems[item.productId].productQuantity--;
          }
          state.totalPrice = state.totalPrice - item.productPrice;
          state.itemCount--;
        }
     }
     
     ,
     selectCartAddress : (state,action) => {
      state.addressSelected = action.payload.addressSelected;
     },
     setCartStatus : (state, action) => {
      state.cartStatus = action.payload.cartStatus;
      if(action.payload.cartStatus === 'payment-complete'){
          state.itemCount = 0;
          state.totalPrice =0;
          state.cartItems ={};
          state.cartStatus='payment-pending';
          state.addressSelected ={};
      }
        
     }
      
    }
});

export const actions = cartSlice.actions;
export default cartSlice;