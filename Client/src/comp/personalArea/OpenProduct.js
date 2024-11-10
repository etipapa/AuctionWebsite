import { Box, Typography, CardMedia, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { fetchProducts, removeProduct, fetchProductById, clearProduct } from "../Products/productSlice";
function OpenProduct(props) {
  const navigate = useNavigate()
  const id = props.number;
  const who = props.who
  const products = useSelector(state => state.products.products);
  const pro = products.find(o => o.id === id)
  const dispatch = useDispatch();
  const statusP = useSelector(state => state.products.statusP);
  const product = useSelector(state => state.products.selectP)
  const [meHigh, setMeHigh] = useState(false);
  const [otherHigh, setOtherHigh] = useState(false);
  const [theHigh, setTheHigh] = useState(false);
  const [noBids, setNoBids] = useState(false);
  const [bigBid, setBigBid] = useState(null)
  const [soldOut, setSoldOut] = useState(false)
  const user = useSelector(state => state.user.user)

  useEffect(() => {
    dispatch(clearProduct())
    dispatch(fetchProductById(id));
    console.log(product)
  }, [])
  useEffect(() => {
    setMeHigh(false)
    setOtherHigh(false)
    setNoBids(false)
    setTheHigh(false)
    setSoldOut(false)
    console.log("who", who);
    dispatch(clearProduct())
    dispatch(fetchProductById(id));
  }, [id])
  useEffect(() => {
    console.log("0bj", product);
    if (statusP === 'yes') {
      console.log(product.bids)
      if (product.bids.length > 0){ 
        const bids = product.bids;
        setBigBid(bids[bids.length -1].sum);
        console.log("bids[bids.length -1]",bids[bids.length -1]);
        if (who==3) {
          // console.log("pp",bigBid)
          if (bids[bids.length -1].userId == user.id) {
            setMeHigh(true)
            setOtherHigh(false)
            setNoBids(false)
            setTheHigh(false)
            setSoldOut(false)
          }
          else{
            setMeHigh(false)
            setOtherHigh(true)
            setNoBids(false)
            setTheHigh(false)
            setSoldOut(false)
          }
        }
        else{
          if(bigBid){
            setMeHigh(false)
            setOtherHigh(false)
            setNoBids(false)
            setTheHigh(true)
            setSoldOut(false)
          }
        
        }
       
      }
      else {
        setBigBid(product.price)
        setTheHigh(false)
        setOtherHigh(false)
        setMeHigh(false)
        setNoBids(true)
        setSoldOut(false)
      }
      if(product.isSold)
      {
        setTheHigh(false)
        setOtherHigh(false)
        setMeHigh(false)
        setNoBids(false)
        setSoldOut(true)
      }
    }
  }, [product])
  return (
    <Box sx={{ width: '50%', margin: '2%' }}>
      <div>
        <h4>{product.name}</h4>
        <Typography >{product.description}</Typography>
        <CardMedia
          component="img"
          height='400'
          alt={product.name}
          src={product.image}
          sx={{
            Padding: '10px' ,objectFit: 'contain',
          }}
        />
      </div>
      {theHigh && <Box sx={{fontSize:'22px',margin:'2%',color:'#a27c07'}}>ההצעה המובילה :{bigBid}$</Box>}
      {meHigh && <Box sx={{color:'white',fontSize:'22px',backgroundColor:'#a01b1b',margin:'2%'}}>הצעתך מובילה!!!</Box>}
      {otherHigh && <Box sx={{fontSize:'22px',margin:'2%',color:'#a27c07'}}>ההצעה המובילה :{bigBid}$</Box>}
      {noBids && <Box sx={{fontSize:'22px',margin:'2%',color:'#a27c07'}}>אין הצעות למוצר זה</Box>}
      {soldOut && <Box sx={{color:'white',fontSize:'22px',backgroundColor:'#a01b1b',margin:'2%'}}>המוצר נמכר ב:{bigBid}$</Box>}
      {!soldOut&&<Button variant="contained" onClick={() => { navigate('/product/' + product.id) }}>למכירת הפריט</Button>}
    </Box>
  )
}

export default OpenProduct