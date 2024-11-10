import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    categorys: [],
    selectC:0,
    status: 'idle'
}

export const fetchCategorys = createAsyncThunk(
    'products/fetchCategorys',
    async () => {
        console.log('in fetchProducts');
        const response = await axios.get('https://localhost:7165/api/Product')
        console.log(response);
        let pro= response.data
        
         for(let i=0;i<pro.length;i++)
         {
            let p=await axios.get(`https://localhost:7165/api/Product/getImage/${pro[i].image}`)
            pro[i]={...pro[i],pic:p.data}
         }
         return pro;
    },
)

export const removeProduct = createAsyncThunk(
    'products/removeProduct',
    async (id) => {
        console.log('in removeProduct');
        const response = await axios.delete(`https://localhost:7165/api/Product/${id}`)
        console.log(response);
        return response.data
    },
)


export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        selectProduct: (state, action) => {
            state.selectP=action.payload
          }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.products = action.payload
            // products[1]={...products[1],img:"dfnhg"}
        })
        builder.addCase(removeProduct.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(removeProduct.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            console.log('action.payload: ', action.payload);
            state.products = state.products.filter(p => p.id != action.payload.id);
        })
        .addCase(removeProduct.rejected, (state, action) => {
            state.status = 'rejected'
            console.log(action);
        })
    },
})

// Action creators are generated for each case reducer function
export const {selectProduct } = productSlice.actions
export default productSlice.reducer