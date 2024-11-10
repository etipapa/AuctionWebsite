import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    categories: [],
    status: 'idle'
}

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
        console.log('in fetchCategories');
        const response = await axios.get('https://localhost:7165/api/Category')
         return response.data;
    },
)
// export const fetchProductById = createAsyncThunk(
//     'products/fetchProductById',
//     async (id) => {
//         console.log('in fetchProductById');
//         const response = await axios.get(`https://localhost:7165/api/Product/${id}`)
//          return response.data;;
//     },
// )

// export const removeProduct = createAsyncThunk(
//     'products/removeProduct',
//     async (id) => {
//         console.log('in removeProduct');
//         const response = await axios.delete(`https://localhost:7165/api/Product/${id}`)
//         console.log(response);
//         return response.data
//     },
// )


export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        // selectProduct: (state, action) => {
        //     state.selectPIndex=action.payload
        //   },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            console.log('#########');
            state.status = 'fulfilled'
            state.categories = action.payload
        })
        // builder.addCase(fetchProductById.fulfilled, (state, action) => {
        //     state.selectP = action.payload
        //     state.statusP='yes'
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
export const {} = categorySlice.actions
export default categorySlice.reducer