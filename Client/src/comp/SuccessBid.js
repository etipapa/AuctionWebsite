import { CircularProgress } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {clearProduct} from './Products/productSlice'


function SuccessBid() {
    const bid=useSelector(state=>state.bid.bid)
    const status=useSelector(state=>state.bid.status)
    const product =useSelector(state => state.products.selectP)
  

  return (
   <div>
  {status =='before' && <CircularProgress disableShrink />}
  {status=='after'&&(<div><h3>הצעתך ל{product.name} התקבלה!</h3>
  <p> במידה ותתקבל במערכת הצעה עם סכום גבוה יותר תקבל הודעה על כך</p></div>)
  }
   </div>
  )
}

export default SuccessBid