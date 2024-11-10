// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import axios from 'axios'

// const initialState = {
  
//     selectU:{},
//     status: 'idle'
// }

// export const fetchUserByMail = createAsyncThunk(
//     'users/fetchUserByMail',
//     async (mail) => {
//         console.log('in fetchUser');
//         const response = await axios.get(`https://localhost:7165/api/User/user/${mail}`)
//          return response.data
//     },
// )

// // export const removeProduct = createAsyncThunk(
// //     'products/removeProduct',
// //     async (id) => {
// //         console.log('in removeProduct');
// //         const response = await axios.delete(`https://localhost:7165/api/Product/${id}`)
// //         console.log(response);
// //         return response.data
// //     },
// // )


// export const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
       
//     },
//     extraReducers: (builder) => {
//         builder.addCase(fetchUserByMail.fulfilled, (state, action) => {
//             state.status = 'fulfilled'
//             state.selectU = action.payload
//         })
//         // builder.addCase(removeProduct.pending, (state, action) => {
//         //     state.status = 'pending'
//         // })
//         // .addCase(removeProduct.fulfilled, (state, action) => {
//         //     state.status = 'fulfilled'
//         //     console.log('action.payload: ', action.payload);
//         //     state.products = state.products.filter(p => p.id != action.payload.id);
//         // })
//         // .addCase(removeProduct.rejected, (state, action) => {
//         //     state.status = 'rejected'
//         //     console.log(action);
//         // })
//     },
// })

// // Action creators are generated for each case reducer function
// export default userSlice.reducer