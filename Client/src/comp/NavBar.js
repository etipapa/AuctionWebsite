import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { CardMedia } from '@mui/material';
import { useSelector } from 'react-redux';
import { Margin } from '@mui/icons-material';

function NavBar() {


  const navigate = useNavigate();
  const statusUser = useSelector(state => state.user.status)
  const Home = () => { navigate('/home') }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar >
          <Button sx={{width:'10%',height:'100%' ,margin:'0.5%' ,borderColor:'red',borderWidth:'2px'}} variant="contained" onClick={() => { navigate('/signUp') }}>להרשמה</Button>
          <Button sx={{width:'10%',height:'100%' ,margin:'0.5%'}} variant="contained"  onClick={() => { navigate('/productList') }}>מוצרים</Button>
          <Button sx={{width:'10%',height:'100%' ,margin:'0.5%'}} variant="contained" onClick={() => {
            if (statusUser === "before") {
              navigate('/signUp')
            } else { navigate('/personal') }
          }}>לאזור האישי</Button>
          
          {/* <Typography onClick={() => { Home() }} variant="h4" component="div" sx={{ flexGrow: 2 }}>
            מכירה לעתיקות שלך
          </Typography> */}
           <CardMedia
            onClick={() => { Home() }}
            component="img"
            image={process.env.PUBLIC_URL + 'logo1.png'}
            alt="Logo"
            sx={{objectFit:'contain',height: '12vh' ,display:'flex'}}
          />
        </Toolbar>
      </AppBar>
    </Box>

  )
}

export default NavBar
