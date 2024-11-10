import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, removeProduct, fetchProductById } from "./productSlice";
import { selectProduct, clearProduct } from "./productSlice"
import { useNavigate } from 'react-router-dom';
import { Autocomplete, Box, Button, Card, CardMedia, Chip, CircularProgress, TextField, Typography } from '@mui/material';
import { InfoRounded } from '@mui/icons-material';
import { hover } from '@testing-library/user-event/dist/hover';
import { fetchCategories } from './../slices/categorySlice'


const ProductList = () => {
  const [defaultCategory, setDefaultCategory] = React.useState('כל המוצרים');
  const categories = useSelector(state => state.category.categories)
  const categoriesStatus = useSelector(state => state.category.status)
  const [category1, setCategory1] = React.useState('');
  let navigate = useNavigate()
  const productsSale = useSelector(state => state.products.productsSale);
  const products = useSelector(s => s.products.products)
  const status = useSelector(state => state.products.status);
  const dispatch = useDispatch();
  const [productsAfterSerch, setProductsAfterSerch] = useState([]);
  const [selectCategory, setSelectCategory] = useState();

  useEffect(() => {
    if (categoriesStatus != 'fulfilled') {
      dispatch(fetchCategories())
    }
    dispatch(clearProduct())
    if (status != 'fulfilled'){
      dispatch(fetchProducts())
    }
    setProductsAfterSerch(productsSale)
  }, [])
  useEffect(() => {
    setProductsAfterSerch(productsSale)
  }, [productsSale])
  const forProductDetails = (id, i) => {
    console.log(id);
    navigate('/product/' + id);
    dispatch(selectProduct(i));
  }
  const handelCategorySelect = (event, value) => {
    setCategory1(value.key);
    console.log(value.key);
  }
  const selectCategoryForProducts = () => {
    if (category1 === '') {
      setProductsAfterSerch(productsSale);
    } else {
      setProductsAfterSerch(productsSale.filter(o => o.categoryId === category1));
    }
  }

  return (
    <div>
     
      <div className='productList'>
        {status == 'idle' && <CircularProgress disableShrink />}
        {status != 'idle' &&  <Box sx={{ display: 'flex', flexDirection: 'row', margin: '2%', justifyContent: 'center' }}>
        <Autocomplete
          sx={{ width: '40%' ,margin:'1%'}}
          freeSolo
          id="category"
          disableClearable
          options={[ { key: '', label: 'כל המוצרים' } ,...categories.map((m) => ({ key: m.id, label: m.name }))]}
          onChange={handelCategorySelect}
          renderInput={(params) => (
            <TextField
            defaultValue={defaultCategory}
              {...params}
              label="בחר קטגוריה לסינון"
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
            />
          )}
        />
        <Button sx={{width:'70px' ,margin:'1%'}} variant="contained" onClick={() => { selectCategoryForProducts() }}>סנן</Button>
      </Box>}
        <div className="product-container" >
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
            {productsAfterSerch.map((product, i) => (
              <div key={product.id} className="product-card">
                <Card
                  // variant="outlined"
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 1,
                    width: '300px',
                    height: '400px',
                    margin: '1%',
                    // borderStyle:'double'
                    border: '5px double'
                  }}
                >
                  <CardMedia
                    component="img"
                    width="100"
                    height="70"
                    alt={product.name}
                    src={product.image}
                    sx={{
                      borderRadius: '6px',
                      width: '100%', height: '60%'
                    }}
                  />
                  <Box sx={{ alignSelf: 'center', ml: 2 }}>
                    <Typography sx={{ fontSize: "30px", fontFamily: 'serif', fontStyle: 'oblique', textDecorationColor: 'peru', animation: 'backwards' }}> <h5>{product.name}</h5></Typography>

                    {/* <Typography variant="body2" color="text.secondary" fontWeight="regular"
                      sx={{ width: '170px', height:'50px' }}
                    >
                      {product.description}
                    </Typography> */}
                    {/* <Typography fontWeight="bold" noWrap gutterBottom>
                      ${product.price}
                    </Typography> */}
                    <Button sx={{ backgroundColor: 'rgb(146 10 10)' }} variant="contained" onClick={() => { forProductDetails(product.id, i) }}>למכירה</Button>
                  </Box>
                </Card>

              </div>
            ))}
            {productsSale.length == 0 && products.length > 0 && <p>אין מוצרים למכירה</p>}
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ProductList;