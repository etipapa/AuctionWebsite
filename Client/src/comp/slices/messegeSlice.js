import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    messeges: [],
    status: 'idle'
}

export const fetchMesseges = createAsyncThunk(
    'messeges/fetchMesseges',
    async () => {
        console.log('#########');
        console.log('in fetchMesseges');
        const response = await axios.get('https://localhost:7165/api/Message')
        return response.data;
    },
)
export const updateMessege = createAsyncThunk(
    'messeges/updateMessege',
    async (r) => {
        const t={ "id": r.messageId,
        "buyerId": 1,
        "content": "string34567",
        "returnContent": r.answer,
        "productId": 13,
        "dateTime": "2024-03-10T23:41:11.052",
        "status":false
      }
        const response = await axios.put(`https://localhost:7165/api/Message/${ r.messageId}`, t)
        return response.data;
    },
)
export const addMessege = createAsyncThunk(
    'messeges/addMessege',
    async (m) => {
       
        
        console.log(m);
        console.log('in addMessege ');
        console.log(m);
        try {
            const response = await axios.post(`https://localhost:7165/api/Message`, m)
            console.log(response.data);
            return response.data
        }
        catch (error) {
            console.log(error);;
        }
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


export const messegeSlice = createSlice({
    name: 'messege',
    initialState,
    reducers: {
        // selectProduct: (state, action) => {
        //     state.selectPIndex=action.payload
        //   },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMesseges.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.messeges = action.payload
        })
        builder.addCase(addMessege.fulfilled, (state, action) => {
            state.status = 'after'
        })
        builder.addCase(updateMessege.fulfilled, (state, action) => {
            
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
export const { } = messegeSlice.actions
export default messegeSlice.reducer