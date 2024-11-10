import React, { useEffect } from 'react'
import { Box, Button, CardMedia, Divider, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMailGo, addImagesToMail } from '../slices/userSlice'

function MailGo() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user)
    const mailGo = useSelector(state => state.user.mailGo)
    const statusMailGo = useSelector(state => state.user.statusMailGo)
    useEffect(() => {
        if (statusMailGo === 'before') {
            dispatch(fetchMailGo(user.id))
        }
    }, [])
    const style = {
        py: 0,
        width: '100%',
        // borderRadius: 2,
        // border: '1px solid',
        borderColor: 'divider',
        backgroundColor: '#a60f0f1c',
        margin: '10px'
    };
    return (
        <div>
            {
                mailGo.map((m) => (
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
                                            <ListItemAvatar>שאלה למוכר ה{m.product.name}</ListItemAvatar>
                                            <CardMedia
                                                component="img"
                                                
                                                alt={m.pic}
                                                src={m.pic}
                                                sx={{
                                                    objectFit: 'contain',
                                                    width: '80px', height:'100px'
                                                }}
                                            />
                                        </>)
                                        }
                                    </ListItem>
                                    <Divider component="li" />
                                    <ListItem>
                                        <ListItemText sx={{ textAlign: 'right' }} primary={`אתה: ${m.content} `} />
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
                                            <ListItemAvatar> תשובה אודות ה{m.product.name}</ListItemAvatar>
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
                                    <ListItem sx={{flexDirection:'column'}}>
                                        <ListItem>
                                            <ListItemText sx={{ textAlign: 'right' }} primary={`הלקוח: ${m.content} `} />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText sx={{ textAlign: 'right' }} primary={`אתה: ${m.returnContent} `} />
                                        </ListItem>
                                    </ListItem>
                                </List>

                            </>
                        )}
                    </div>
                ))
            }
        </div>
    )
}

export default MailGo