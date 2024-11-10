import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './comp/Products/productSlice'
import userReducer from './comp/slices/userSlice'
import bidReducer from './comp/slices/bidSlice'
import categoryReducer from './comp/slices/categorySlice'
import messegeReducer from './comp/slices/messegeSlice'
export const store = configureStore({
  reducer: {
    //counter: counterReducer,
    //ניתן להוסיף עוד רדוסרים
    //posts: postsReducer
     products : productsReducer,
      user:userReducer,
      bid:bidReducer,
      category:categoryReducer,
      messege:messegeReducer,
  },
})