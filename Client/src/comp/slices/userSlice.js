import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode';



const initialState = {
 
  messeges: [],
  user:{},
  status: "before",
  productsIWant: [],
  productsToSale: [],
  statusProductsIWant: 'before',
  statusProductsIToSale: 'before',
  mailCome: [],
  statusMailCome: "before",
  mailGo: [],
  statusMailGo: 'before'
}

export const addUser = createAsyncThunk(
  'users/addUser',
  async (user) => {
    debugger
    console.log(user);
    const u={
      "id": 0,
      "firstName":user.firstName,
      "lastName": user.lastName,
      "email": user.email,
      "password": user.password,
      "bids": [
       
      ],
      "messeges": [
       
      ]
    }
    // const { bid } = getState().bid;
    console.log('in addUser ');
    const response = await axios.post(`https://localhost:7165/api/User`, u)
    return response.data
  },
)

export const fetchMailCome = createAsyncThunk(
  'users/fetchMailCome',
  async (id) => {
    console.log('in fetchMailCome');
    const response = await axios.get(`https://localhost:7165/api/User/user/GetMessegeByUser/${id}`)
    let pro = response.data
    console.log("@@@", pro);
    for (let i = 0; i < pro.length; i++) {
      let p = await axios.get(`https://localhost:7165/api/Product/getImage/${pro[i].product.image}`)
      pro[i] = { ...pro[i], pic: p.data }
    }
    return pro;
  },
)
export const login = createAsyncThunk(
  'users/login',
  async (u) => {
    try {

      const user = {
        "id": 0,
        "firstName": "string",
        "lastName": "string",
        "email": u.email,
        "password": u.password,
        "bids": [],
        "messeges": []
      }
      const response = await axios.post("https://localhost:7165/login", user);
      alert(`התחברת בהצלחה!`)
      sessionStorage.setItem('isLoggedIn', 'true');
      const token = response.data;
      sessionStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      const JSONdecoder = JSON.parse(JSON.stringify(decoded));
      console.log("JSONdecoder:", JSONdecoder);
      let id;
      let bids;
      let firstName;
      for (const key in JSONdecoder) {
        if (key === "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname") {
          firstName = JSONdecoder[key];
        } else if (key === "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier") {
          id = JSONdecoder[key];
        }
        else if (key === "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid") {
          bids = JSONdecoder[key];
        }
      }
      console.log(bids);

      // const bidsJson = JSON.parse(bids);
      const bidsJson = JSON.parse(bids, (key, value) => {
        // החלפת תווים מיוחדים
        if (typeof value === "string") {
          return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
        }
        return value;
      });

      // בדיקת סוג האובייקט
      if (!Array.isArray(bidsJson)) {
        console.error("Error: bids is not an array");
        return;
      }

      // מיפוי נתוני ההצעות
      const bidsData = bidsJson.map(bid => {
        // גישה לתכונות ספציפיות של BidDto
        const bidId = bid.Id;
        const bidProductId = bid.ProductId;
        const bidUserId = bid.UserId;
        const bidSum = bid.Sum;
        const bidDateTime = bid.DateTime;
        // יצירת אובייקט חדש עם נתוני ההצעה
        return {
          id: bidId,
          productId: bidProductId,
          userId: bidUserId,
          sum: bidSum,
          dateTime: bidDateTime
        };
      });


      sessionStorage.setItem('userId', id);
      sessionStorage.setItem('userName', firstName);
      sessionStorage.setItem('userBids', bidsData);
      console.log("in try:", response);
      console.log({ 'id': id, 'firstName': firstName, 'bids': bidsData });
      return { 'id': id, 'firstName': firstName, 'bids': bidsData }
    } catch (error) {
      console.log('err',);
      return undefined;
    }

  }
)
export const fetchMailGo = createAsyncThunk(
  'users/fetchMailGo',
  async (id) => {
    console.log('in fetchMailGo');
    const response = await axios.get(`https://localhost:7165/api/User/user/getMessegeSendUser/${id}`)
    let pro = response.data
    console.log("@@@", pro);
    for (let i = 0; i < pro.length; i++) {
      let p = await axios.get(`https://localhost:7165/api/Product/getImage/${pro[i].product.image}`)
      pro[i] = { ...pro[i], pic: p.data }
    }
    return pro;
  },
)
export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (id) => {
    const id1=id;
    console.log('in fetchUserById');

    try {
      const response = await axios.get(`https://localhost:7165/api/User/${id1}`);
      sessionStorage.setItem('isLoggedIn', 'true');
      const token = response.data;
      const decoded = jwtDecode(token);
      const JSONdecoder = JSON.parse(JSON.stringify(decoded));
      console.log("JSONdecoder:", JSONdecoder);
      let id;
      let bids;
      let firstName;
      for (const key in JSONdecoder) {
        if (key === "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname") {
          firstName = JSONdecoder[key];
        } else if (key === "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier") {
          id = JSONdecoder[key];
        }
        else if (key === "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid") {
          bids = JSONdecoder[key];
        }
      }
      console.log(bids);
      const bidsJson = JSON.parse(bids, (key, value) => {
        if (typeof value === "string") {
          return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
        }
        return value;
      });
      if (!Array.isArray(bidsJson)) {
        console.error("Error: bids is not an array");
        return;
      }
      const bidsData = bidsJson.map(bid => {
        const bidId = bid.Id;
        const bidProductId = bid.ProductId;
        const bidUserId = bid.UserId;
        const bidSum = bid.Sum;
        const bidDateTime = bid.DateTime;
        return {
          id: bidId,
          productId: bidProductId,
          userId: bidUserId,
          sum: bidSum,
          dateTime: bidDateTime
        };
      });
      sessionStorage.setItem('userId', id);
      // sessionStorage.setItem('userName', firstName);
      // sessionStorage.setItem('userBids', bidsData);
      console.log("in try:", response);
      console.log({ 'id': id, 'firstName': firstName, 'bids': bidsData });
      return { 'id': id, 'firstName': firstName, 'bids': bidsData }
    } catch (error) {
      console.log('err',);
      return undefined;
    }
  },
);
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    putProductsIWant: (state, action) => {
      state.productsIWant = action.payload.filter(product => state.user.bids.some(bid => bid.productId == product.id))
      state.statusProductsIWant = 'after'
    },
    putProductsToSale: (state, action) => {
      state.productsToSale = action.payload.filter(p => p.productSellerID == state.user.id)
      state.statusProductsIToSale = 'after'
    },
    signInStatus: (state, action) => {
      state.status = 'sign';
    }
    , editProductToSale: (state, action) => {
      state.productsToSale = [...state.productsToSale, action.payload]
    }
    , editProductIWant: (state, action) => {
      const p = state.productsIWant.find(m => m.id == action.payload.id)
      if (p) {
        return
      }
      state.productsIWant = [...state.productsIWant, action.payload]
    }
    , editMessegeIAsk: (state, action) => {
      debugger
      const {m,products}=action.payload
      let mes=m;
      console.log(m,products);
      mes.product=products.find(o=>o.id==m.productId)
      state.mailGo = [...state.mailGo,m]
    },
    addImagesToMail: (state, action) => {
      if (state.user.mailCome) {
        state.user.mailCome = state.user.mailCome.map(obj => {
          const p = action.payload.find(p => p.id === obj.productId);
          return {
            ...obj,
            image: p?.image // Use optional chaining for safety
          };
        });
        state.statusMailCome = "afterImages";
        console.log("@@@@@@", state.user.mailCome);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.user = action.payload
      state.status = 'sign'
    }).addCase(fetchUserById.rejected, (state, action) => {
      state.status = action.payload;
    })
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.user = action.payload
      state.status = 'sign'
      sessionStorage.setItem('userId', state.user.id);

    })
    builder.addCase(fetchMailCome.fulfilled, (state, action) => {
      state.mailCome = action.payload;
      state.statusMailCome = "after"
    })
    builder.addCase(fetchMailGo.fulfilled, (state, action) => {
      state.mailGo = action.payload;
      state.statusMailGo = "after"
    })
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload != undefined) {
        state.user = action.payload;
        state.status = 'sign'
      }
    })
  },
})

export const { addImagesToMail, putProductsIWant, putProductsToSale, signInStatus, editProductToSale, editProductIWant, editMessegeIAsk, } = userSlice.actions
export default userSlice.reducer