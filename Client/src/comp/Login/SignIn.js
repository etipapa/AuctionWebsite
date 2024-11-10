import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { fetchUserByMail } from './loginSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserById, signInStatus, login } from '../slices/userSlice'

// const myTheme = createTheme({
//   palette: {
//     primary: {
//       main: '#a27c07', // צבע כפתור ראשי
//     },
//     secondary: {
//       main: '#920a0a', // צבע כפתור משני
//     },
//   },
// });
// TODO remove, this demo shouldn't need to reset the theme.


export default function SignIn() {
  const [email2, setEmail2] = React.useState();
  let navigate = useNavigate()
  const status = useSelector(state => state.user.status);
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch();
  // useEffect(() => {
  //   console.log('in useeffect');
  //   if (status != 'fulfilled')

  //       dispatch(fetchUser())
  // }, [])

  // React.useEffect(() => {
  //   if(status=='not found'){
  //     alert('לא נמצאה במערכת כתובת מייל זו');
  //     return
  //   }
  //   if (email2 == user.password) {
  //     dispatch(signInStatus())
  //   }
  //   else {
  //     alert('סיסמא שגויה')
  //   }
  // }, [status])
  const [errors, setErrors] = React.useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    if (!validateEmail(email)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        email: 'כתובת המייל אינה תקינה'
      }));
      return;
    }
    // Clear any previous errors if the email is valid
    setErrors(prevErrors => ({ ...prevErrors, email: '' }));
    const u = {
      email: email,
      password: password
    }
    console.log(u);
    dispatch(login(u)).then((res) => {
      console.log('ggg',status,res);
      if (res.payload=== undefined) {
        if (res.error) {
          console.error(res.error);
        }
        alert('מייל או סיסמא לא נכונים')
       
      } else {
        navigate('personal')
      }
     
    })
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };


  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };

  return (
    <Container component="main" maxWidth="xs" dir="rtl">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOpenIcon />
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">
          התחבר
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="כתובת מייל"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="סיסמא"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            התחבר
          </Button>
          <p></p>
        </Box>
      </Box>
      {/* <Copyright sx={{ mt: 5 }} /> */}
    </Container>
  );
}