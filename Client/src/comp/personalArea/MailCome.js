import React, { useEffect, useState } from 'react'
import { fetchMailCome ,addImagesToMail} from '../slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import { updateMessege } from '../slices/messegeSlice'
import { Box, Button, CardMedia, Divider, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material'

function MailCome() {
  const [errors, setErrors] = useState({});
  const products=useSelector(s=>s.products.products)
  const user = useSelector(state => state.user.user)
  const mailCome = useSelector(state => state.user.mailCome)
  const statusMailCome = useSelector(state => state.user.statusMailCome)
  const productsToSale = useSelector(state => state.user.productsToSale);
  const dispatch = useDispatch();
  const [myMail, setMyMail] = useState([]);
  const [answer, setAnswer] = useState('');
  const [openReplies, setOpenReplies] = useState({});

  useEffect(() => {
    if (statusMailCome ==='before') {
      dispatch(fetchMailCome(user.id))
    }
    else{
      dispatch( addImagesToMail(products))
      if (statusMailCome ==="after") {
        dispatch( addImagesToMail(products))
      }
    }
  }, [])
  useEffect(() => {
    if (statusMailCome ==='after') {
      dispatch( addImagesToMail(products))
    }
  }, [statusMailCome])
  // useEffect(() => {
  //   const returnMesseges = user.messeges.filter(l => l.returnContent != '')
  //   const returnMessegesNew = returnMesseges.map(message => {
  //     const product = products.find(product => product.id === message.productId);
  //     if (product) {
  //       return {
  //         ...message,
  //         nameP: product.name,
  //         productImage: product.pic,
  //       };
  //     } else {
  //       return message;
  //     }
  //   });
  //   console.log("returnMesseges", returnMesseges);
  //   const mailGood = mailCome.filter(o => o.returnContent === '')
  //   const mergedMesseges = returnMessegesNew.concat(mailGood);
  //   console.log('before', mergedMesseges);
  //   // mergedMesseges.sort((a, b) => a.dateTime - b.dateTime);
  //   mergedMesseges.sort((a, b) => {
  //     const dateA = new Date(a.dateTime);
  //     const dateB = new Date(b.dateTime);
  //     return dateB - dateA;
  //   });
  //   console.log("after", mergedMesseges);
  //   const mergedMessegesWithProductInfo = mergedMesseges.map(message => {
  //     const product = productsToSale.find(product => product.id === message.productId);
  //     if (product) {
  //       return {
  //         ...message,
  //         productImage: product.pic,
  //       };
  //     } else {
  //       return message;
  //     }
  //   });
  //   console.log("mergedMessegesWithProductInfo", mergedMessegesWithProductInfo);
  //   // setMyMail(mergedMessegesWithProductInfo)
  //   setMyMail(mergedMessegesWithProductInfo)
  //   console.log("myMail", myMail);
  //   console.log("productsToSale", productsToSale);
  // }, [mailCome])

  const style = {
    py: 0,
    width: '100%',
    // borderRadius: 2,
    // border: '1px solid',
    borderColor: 'divider',
    backgroundColor: '#a60f0f1c',
    margin: '10px'
  };
  const handleOpenReply = (messageId) => {
    setOpenReplies({ ...openReplies, [messageId]: !openReplies[messageId] });
  };
  const cancelAnswer = (messageId) => {
    setErrors(prevErrors => ({ ...prevErrors, answer: '' }))
    setOpenReplies({ ...openReplies, [messageId]: !openReplies[messageId] });
  };

  const sendAnswer = (messageId) => {
    if (answer == '') {
      setErrors(prevErrors => ({ ...prevErrors, answer: 'שדה חובה ' }));
      return
    }
    const r = { "answer": answer, "messageId": messageId }
    dispatch(updateMessege(r))
    setOpenReplies({ ...openReplies, [messageId]: !openReplies[messageId] });
    setAnswer('')
  };

  return (
    <div>
      {
        mailCome.map((m) => (
          <div key={m.id}> 
            {m.buyerId == user.id ? ( 
              <>
                <List sx={{
                  py: 0,
                  width: '100%',
                  borderColor: 'divider',
                  backgroundColor: '#a27c071c',
                  margin: '10px'
                }}>
                  <ListItem sx={{
                    display: 'flex', justifyContent: 'space-between'
                  }}>{true &&
                    (<>
                      <ListItemAvatar> תשובה ל{m.product.name}</ListItemAvatar>
                      <CardMedia
                        component="img"

                        alt={m.pic}
                        src={m.pic}
                        sx={{
                          objectFit: 'contain',
                          width: '80px', height:'100px'                        }}
                      />
                    </>)
                    }
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText sx={{ textAlign: 'right' }} primary={`אתה: ${m.content} `} />
                  </ListItem>
                  <ListItem>
                    <ListItemText sx={{ textAlign: 'right' }} primary={`המוכר: ${m.returnContent} `} />
                  </ListItem>
                </List>
              </>
            ) : (
              <>
                <List sx={style}>
                  <ListItem sx={{
                    display: 'flex', justifyContent: 'space-between'
                  }}>{m.product &&
                    (<>
                      <ListItemAvatar>שאלה אודות ה{m.product.name}</ListItemAvatar>
                      <CardMedia
                        component="img"
                        width="100"
                        height="100"
                        alt={m.pic}
                        src={m.pic}
                        sx={{
                          width: { xs: '100%', sm: 70 }, height: { xs: '100%' }
                        }}
                      />
                    </>)
                    }
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText sx={{ textAlign: 'right' }} primary={`הלקוח: ${m.content} `}/>
                    <Button onClick={() => handleOpenReply(m.id)} >לענות תשובה</Button>

                  </ListItem>
                  {openReplies[m.id] && (<>
                    <ListItem>
                      <TextField
                        required
                        fullWidth
                        id="answer"
                        label="תשובה "
                        name="answer"
                        onChange={(e) => { setAnswer(e.target.value); setErrors(prevErrors => ({ ...prevErrors, answer: '' })) }}
                        // register={register({ required: true })}
                        error={Boolean(errors.answer)}
                        helperText={errors.answer}
                      />
                      {/* {errors.answer && <p style={{ color: 'red' }}>{errors.answer.message}</p>} */}
                      <Box sx={{ display: "flex", flexDirection: "column" }}> <Button
                        onClick={() => { sendAnswer(m.id) }}
                      >שלח</Button>
                        <Button
                          onClick={() => { cancelAnswer(m.id) }}
                        >ביטול</Button></Box>

                    </ListItem>
                  </>)}

                </List>

              </>
            )}
          </div>
        ))
      }
    </div>
  )
}

export default MailCome