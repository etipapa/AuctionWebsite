import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, removeProduct, fetchProductById, clearProduct } from "./productSlice";
import './product.css'
import AddIcon from '@mui/icons-material/Add';
import { Image, Padding, WidthFull } from '@mui/icons-material';
import { Box, CardMedia, CircularProgress, Fab, ImageListItem } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { addBid, addBidToTheStore } from './../slices/bidSlice'
import { useNavigate, useParams } from 'react-router-dom';
import { editProductIWant ,editMessegeIAsk} from '../slices/userSlice'
import _ from 'lodash';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import {addMessege} from '../slices/messegeSlice'



function Product() {
  const { id } = useParams();
  const products = useSelector(state => state.products.productsSale);
  const allProducts = useSelector(state => state.products.products);

  const status = useSelector(state => state.products.status);
  const select = useSelector(state => state.products.selectPIndex);
  const statusP = useSelector(state => state.products.statusP);
  const user = useSelector(state => state.user.user)
  const userStatus = useSelector(state => state.user.status)
  const selectObject = useSelector(state => state.products.selectP)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = React.useState({});
  const [bigBid, setBigBid] = useState(null)
  const [minSumToBid, setMinSumToBid] = useState(null)
  const [months, setMonths] = React.useState(null);
  const [remainingDays, setRemainingDays] = React.useState(null);
  const [response, setResponse] = useState(null)

  useEffect(() => {
     if(statusP==='no'){
       dispatch(fetchProductById(id));
     }
  }, []) 
  useEffect(() => {
    console.log(selectObject);
    if (selectObject) {
      if (selectObject.bids) {
        const bids = selectObject.bids;
        console.log(bids);
        setBigBid(bids[bids.length - 1]);
        console.log('bigbid');
        console.log(bigBid);
      }
      setMinSumToBid(bigBid ? bigBid.sum : selectObject.price)
      console.log('minsum');
      console.log(minSumToBid);
      const expirationDateTimestamp = new Date(selectObject.saleEndDate).getTime();
      const currentDateTimestamp = Date.now(); // Current date timestamp
      const timeDiff = expirationDateTimestamp - currentDateTimestamp;
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      setMonths(Math.floor(days / 30))
      setRemainingDays(days % 30);
      console.log(`${months} month(s) and ${remainingDays} day(s) left for the final sale.`);
    }
  }, [statusP, bigBid])
  
  const IWantBid = async (summ) => {
    debugger
    if(userStatus==='before'){
      alert('עליך להתחבר למערכת')
      navigate('/signUp');
      return
    }
    
    if(user.id==selectObject.productSellerID)
    {
      alert(' שגיאה !משתמש לא יכול להציע הצעת מחיר לעצמו!')
      handleClose()
      return;
    }
    console.log("i bid" + summ);
    console.log({ productId: selectObject.id, userId: user.id, sum: summ, dateTime: new Date().toDateString() });
    // dispatch(addBidToTheStore({ productId: selectObject.id, userId:user.id, sum: summ, dateTime: new Date().toDateString() }))
    try {
      dispatch(addBid({ productId: selectObject.id, userId: user.id, sum: summ, dateTime: new Date().toISOString() })).then((res) => {
        console.log(res)
        const { productId } = res.payload;
        const product = products.find(p => p.id == productId);
        if (product) {
          dispatch(editProductIWant(product));

        }
      });


    } catch (error) {
      console.error('Error adding bid:', error);
    }
    navigate('/success')
  }
  const IWantAsk = async (ask) => {
    if(userStatus==='before'){
      alert('עליך להתחבר למערכת')
      navigate('/signUp');
      return
    }
    if(user.id==selectObject.productSellerID)
    {
      alert(' שגיאה !משתמש לא יכול לשלוח הודעות לעצמו!')
      handleClose1()
      return;
    }
    console.log("i ask" + ask);
    // "id": 1,
    // "buyerId": 1,
    // "content": "string34567",
    // "returnContent": "",
    // "productId": 13,
    // "dateTime": "2024-03-10T23:41:11.052"
    console.log({ buyerId: user.id, content: ask, returnContent: '',productId:selectObject.id, dateTime: new Date().toDateString(),status:false });
   
      dispatch(addMessege({ buyerId: user.id, content: ask, returnContent: '',productId:selectObject.id, dateTime: new Date().toISOString() })).then((res) => {
      console.log(res);
      debugger
          dispatch(editMessegeIAsk( {"m":res.payload,"products":allProducts}));
      });
  }

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    setError(prevError => ({ ...prevError, sum: '', ask: '' }))
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [open1, setOpen1] = useState(false);
  const handleClickOpen1 = () => {
    setOpen1(true);
    setError(prevError => ({ ...prevError, sum: '', ask: '' }))
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const validateSum = (value) => {
    if (value < minSumToBid + 1) {
      return false;
    }
    return true;
  };
  return (
    <div>
      {!selectObject && <CircularProgress disableShrink />}
      {selectObject && <div>
        <Box sx={{ display: 'flex', flexDirection: 'row', padding: '5%' }}>
          <CardMedia
            component="img"
            alt={selectObject.name}
            src={selectObject.image}
            sx={{objectFit: 'contain',
              borderRadius: '6px',
             height:"500px",
             width:'500px',
              Padding: '10px'
            }}
          />
          <div className='textContain'><Box sx={{margin:'5%',fontSize:'20px',fontFamily:'unset'}}>
            <h3>{selectObject.name}</h3>
            <p>{selectObject.description}</p>
            <p>מחיר פתיחה :{selectObject.price}$</p>
            {bigBid && <Box sx={{color:'#a01b1b'}}><h3>מחיר ההצעה המובילה :{minSumToBid}$</h3></Box>}
            <div>נשארו עוד {months} חודשים ו{remainingDays} ימים לסיום המכירה
            </div>
            <React.Fragment>
              <Button sx={{margin:'5%'}} variant="outlined" onClick={handleClickOpen}>
                אני רוצה להציע
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                  component: 'form',
                  onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const sum = formJson.sum;
                    if (!validateSum(sum)) {
                      setError(prevError => ({
                        ...prevError,
                        sum: 'על סכום ההצעה להיות גבוה יותר מהסכום שהוצע עד כה'
                      }));
                      return;
                    }
                    console.log(sum);
                    IWantBid(sum)
                    handleClose();
                  },
                }}
              >
                <DialogTitle>הצעת מחיר ל{selectObject.name}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    הצעתך תתקבל במערכת. במידה ותתקבל במערכת הצעה עם סכום גבוה יותר תקבל הודעה על כך
                  </DialogContentText>
                  {/* <TextField
            id="outlined-uncontrolled"
            label="סכם ההצעה"
            defaultValue={bigBid.sum?bigBid.sum:products[select].price}
          /> */}

                  <TextField
                    // InputProps={{ inputProps: { min:{minSumToBid}, max: 100000000000000000 } }}
                    autoFocus
                    required
                    margin="dense" id="sum"
                    name="sum"
                    label="סכום ההצעה"
                    type="number"
                    // variant="standard"
                    defaultValue={minSumToBid + 1}
                    error={Boolean(error.sum)}
                    helperText={error.sum}
                    onChange={() => setError(prevError => ({ ...prevError, sum: '' }))}
                  />
                </DialogContent>
                <DialogActions>
                  <Button sx={{margin:'1%',width:'20%'}} variant="outlined" onClick={handleClose}>ביטול</Button>
                  <Button sx={{margin:'1%',width:'20%'}} variant="outlined" type="submit">הגש הצעה</Button>
                </DialogActions>
              </Dialog>
            </React.Fragment>
            <React.Fragment>
              <Fab  onClick={handleClickOpen1} color="primary" aria-label="add" sx={{ display: 'flow', float: "left", margin: '2%' }}>
                <ChatBubbleOutlineIcon />
              </Fab>
              <Dialog 
                open={open1}
                onClose={handleClose1}
                PaperProps={{
                  component: 'form',
                  onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const ask = formJson.ask;
                    console.log(ask);
                    IWantAsk(ask)
                    handleClose1();
                  },
                }}
                // PaperProps={{
                //   component: 'form',
                //   onSubmit: (event) => {
                //     handleClose1();
                //   },
                // }}
              >
                <DialogTitle>שאל את המוכר</DialogTitle>
                <DialogContent >
                <DialogContentText>
                  כתוב את שאלתך בצורה ברורה
                  </DialogContentText>
                  <TextField
                    multiline
                    rows={6}
                    autoFocus
                    required
                    id="ask"
                    name="ask"
                    label="שאלתך"
                    type="text"
                    error={Boolean(error.ask)}
                    helperText={error.ask}
                    onChange={() => setError(prevError => ({ ...prevError, ask: '' }))}
                  />
                </DialogContent>
                <DialogActions>
                  <Button sx={{margin:'1%'}} variant="outlined" onClick={handleClose1}>ביטול</Button>
                  <Button sx={{margin:'1%'}} variant="outlined" type="submit">שלח </Button>
                </DialogActions>
              </Dialog>
            </React.Fragment>
            </Box></div>
        </Box>
      </div>
      }
    </div>
  )
}
export default Product