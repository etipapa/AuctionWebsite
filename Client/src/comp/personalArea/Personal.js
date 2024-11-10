import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddProduct from './AddProduct';
import MyProducts from './MyProducts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById,putProductsIWant } from './../slices/userSlice'
import {fetchProducts} from './../Products/productSlice'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Messeges from './Messeges';
import {clearProduct} from '../Products/productSlice'
import Hello from './Hello';

function Personal() {
  const [selectedIndex, setSelectedIndex] = React.useState(5);
  const dispatch = useDispatch()
  const statusUser = useSelector(state => state.user.status);
  const statusProducts=useSelector(state=> state.products.status) 
 
  const products = useSelector(state => state.products.products);
  const user=useSelector(state => state.user.user)
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  React.useState(() => {
    dispatch(clearProduct())
    // if (statusUser != 'sign') {
    //   dispatch(fetchUserById(
    //     1
    //   ))
    // }
    if (statusProducts != 'fulfilled')
    dispatch(fetchProducts())
  }, [])
 

  return (<Box sx={{ display: 'flex', flexDirection: 'row' }}>
    <Box sx={{ width: '100%', maxWidth: 260, bgcolor: 'background.paper', direction: 'rtl' }}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <AddCircleOutlineIcon />
            {/* <InboxIcon /> */}
          </ListItemIcon>
          <ListItemText primary="העלת מוצר חדש" />
        </ListItemButton>
      </List>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemIcon>
            <ChatBubbleOutlineIcon />
            {/* <InboxIcon /> */}
          </ListItemIcon>
          <ListItemText primary="הודעות" />
        </ListItemButton>
       
      </List>
      {/* <Divider /> */}
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event,3)}
        >
          <ListItemText primary="מוצרים שרציתי" />
        </ListItemButton>
       
      </List>
      <List component="nav" aria-label="secondary mailbox folder">
      
        <ListItemButton
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event,4)}
        >
          <ListItemText primary="מוצרים שהעלתי למכירה" />
        </ListItemButton>
      </List>
    </Box>
    {selectedIndex == 1 && <AddProduct />}
    {selectedIndex == 3 && <MyProducts index='3' />}
    {selectedIndex == 4 && <MyProducts index='4' />}
    {selectedIndex == 2 && <Messeges/>}
    {selectedIndex == 5&& <Hello/>}

  </Box>)
}

export default Personal