import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UseDispatch, useDispatch } from 'react-redux'
import { editProductToSale } from '../slices/userSlice'
import axios from 'axios'

const initialState = {
    products: [],
    productsSale: [],
    selectPIndex: 0,
    selectP: {},
    status: 'idle',
    statusP: 'no'
}
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        console.log('in fetchProducts');
        const response = await axios.get('https://localhost:7165/api/Product')
        console.log(response);
        let pro = response.data

        // for (let i = 0; i < pro.length; i++) {
        //     let p = await axios.get(`https://localhost:7165/api/Product/getImage/${pro[i].image}`)
        //     pro[i] = { ...pro[i], pic: p.data }
        // }
        return pro;
    },
)
export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id) => {
        console.log('in fetchProductById'+id);
        const response = await axios.get(`https://localhost:7165/api/Product/${id}`)
        return response.data;;
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
export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (product) => {
        console.log('in addProduct', product);
        const fromData = new FormData();
        fromData.append("name", product.name)
        fromData.append("description", product.description)
        fromData.append("price", product.price)
        fromData.append("productSellerID", product.productSellerID)
        fromData.append("categoryId", product.categoryId)
        fromData.append("fileImage", product.fileImage)
        fromData.append("saleEndDate", product.saleEndDate)
        fromData.append("isSold", false)
        fromData.append("bids", product.bids)
        console.log(fromData);
        const response = await axios.post(`https://localhost:7165/api/Product`, fromData, { headers: { 'Content-Type': 'multipart/form-data' } })
        let pro = response.data
        let p = await axios.get(`https://localhost:7165/api/Product/getImage/${pro.image}`)
        pro = { ...pro, image: p.data }
        return pro;
    },
)


export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        selectProduct: (state, action) => {
            state.selectPIndex = action.payload
        },
        addBidForProduct: (state, action) => {
            state.selectP = { ...state.selectP, bids: [...state.selectP.bids, action.payload] }
        },
        clearProduct: (state, action) => {
            state.selectPIndex = -1;
            state.selectP = {};
            state.statusP = 'no';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.products = action.payload;
            const filteredProducts = state.products.filter(i => i.isSold === false);
            state.productsSale = filteredProducts;

        })
        builder.addCase(fetchProductById.fulfilled, (state, action) => {
            state.selectP = action.payload
            state.statusP = 'yes'
        })
        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.products = [...state.products, action.payload]
            state.productsSale = [...state.productsSale, action.payload]
            editProductToSale(action.payload)
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
export const { selectProduct, addBidForProduct, clearProduct } = productSlice.actions
export default productSlice.reducer