import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import {addBidForProduct} from './../Products/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import {editProductIWant} from '../slices/userSlice'


const initialState = {
   bid:{},
   status:"before"
}

// export const fetchProducts = createAsyncThunk(
//     'products/fetchProducts',
//     async () => {
//         console.log('in fetchProducts');
//         const response = await axios.get('https://localhost:7165/api/Product')
//         console.log(response);
//         let pro= response.data
        
//          for(let i=0;i<pro.length;i++)
//          {
//             let p=await axios.get(`https://localhost:7165/api/Product/getImage/${pro[i].image}`)
//             pro[i]={...pro[i],pic:p.data}
//          }
//          return pro;
//     },
// )
// export const fetchProductById = createAsyncThunk(
//     'products/fetchProductById',
//     async (id) => {
//         console.log('in fetchProductById');
//         const response = await axios.get(`https://localhost:7165/api/Product/${id}`)
//          return response.data;;
//     },
// )

export const addBid = createAsyncThunk(
    'bids/addBid',
    async (bid) => {
        console.log(bid);
       // const { bid } = getState().bid;
        console.log('in addBid ');
        const response = await axios.post(`https://localhost:7165/api/Bid`,bid)
        console.log(response.data);
        return response.data
    },
)


export const bidSlice = createSlice({
    name: 'bid',
    initialState,
    reducers: {
        statusToBefore:(state,action)=>{
            state.status='before'
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addBid.fulfilled, (state, action) => {
            state.bid =action.payload
            state.status='after'
        })
        // builder.addCase(fetchProductById.fulfilled, (state, action) => {
        //     state.selectP = action.payload
        // })
        // builder.addCase(removeProduct.pending, (state, action) => {
        //     state.status = 'pending'
        // })
        // .addCase(removeProduct.fulfilled, (state, action) => {
        //     state.status = 'fulfilled'
        //     console.log('action.payload: ', action.payload);
        //     state.products = state.products.filter(p => p.id != action.payload.id);
        // })
        // .addCase(removeProduct.rejected, (state, action) => {
        //     state.status = 'rejected'
        //     console.log(action);
        // })
    },
})

// Action creators are generated for each case reducer function
export const {addBidToTheStore,statusToBefore} = bidSlice.actions
export default bidSlice.reducer