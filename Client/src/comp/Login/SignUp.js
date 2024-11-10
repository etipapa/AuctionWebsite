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
import{addUser} from '../slices/userSlice'
import { useDispatch } from 'react-redux';



export default function SignUp() {
  const [errors, setErrors] = React.useState({});
 const dispach=useDispatch();
  const handleSubmit = (event) => {
    
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const firstName = data.get('firstName');
    const lastName = data.get('lastName');

    // Validate first name
    if (!validateName(firstName)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        firstName: 'שם פרטי יכול להכיל רק אותיות'
      }));
      return;
    }

    // Clear any previous errors if the first name is valid
    setErrors(prevErrors => ({ ...prevErrors, firstName: '' }));

    // Validate last name
    if (!validateName(lastName)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        lastName: 'שם משפחה יכול להכיל רק אותיות'
      }));
      return;
    }

    // Clear any previous errors if the last name is valid
    setErrors(prevErrors => ({ ...prevErrors, lastName: '' }));

    // Validate email
    if (!validateEmail(email)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        email: 'כתובת המייל אינה תקינה'
      }));
      return;
    }
debugger
    // Clear any previous errors if the email is valid
    setErrors(prevErrors => ({ ...prevErrors, email: '' }));
   dispach(addUser({
    email: email,
    password: data.get('password'),
    firstName: firstName,
    lastName: lastName,
    bids:[]
  }))
    console.log({
      email: email,
      password: data.get('password'),
      firstName: firstName,
      lastName: lastName
    });
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validateName = (name) => {
    const re = /^[a-zA-Zא-ת]+$/;
    return re.test(name);
  };

  // const handleInputChange = (fieldName) => {
  //   setErrors(prevErrors => ({
  //     ...prevErrors,
  //     [fieldName]: ''
  //   }));
  // };

  return (
    
      <Container component="main" maxWidth="xs">
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            הרשם
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="שם פרטי"
                  autoFocus
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName}
                  onChange={() =>    setErrors(prevErrors => ({ ...prevErrors, firstName: '' }))
                }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="שם משפחה"
                  name="lastName"
                  autoComplete="family-name"
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName}
                  onChange={() =>  setErrors(prevErrors => ({ ...prevErrors, lastName: '' }))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="כתובת מייל"
                  name="email"
                  autoComplete="email"
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  onChange={() =>setErrors(prevErrors => ({ ...prevErrors, email: '' }))}
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
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="אני רוצה לקבל עדכונים במייל"
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              הרשם
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signIn" variant="body2">
                  כבר יש לך חשבון? התחבר
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

// export default function SignUp() {
//   const [errors, setErrors] = React.useState({});

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     const email = data.get('email');
//     const firstName = data.get('firstName');
//     const lastName = data.get('lastName');

//     // Validate first name
//     if (!validateName(firstName)) {
//       setErrors(prevErrors => ({
//         ...prevErrors,
//         firstName: 'שם פרטי יכול להכיל רק אותיות'
//       }));
//       return;
//     }

//     // Clear any previous errors if the first name is valid
//     setErrors(prevErrors => ({ ...prevErrors, firstName: '' }));

//     // Validate last name
//     if (!validateName(lastName)) {
//       setErrors(prevErrors => ({
//         ...prevErrors,
//         lastName: 'שם משפחה יכול להכיל רק אותיות'
//       }));
//       return;
//     }

//     // Clear any previous errors if the last name is valid
//     setErrors(prevErrors => ({ ...prevErrors, lastName: '' }));

//     // Validate email
//     if (!validateEmail(email)) {
//       setErrors(prevErrors => ({
//         ...prevErrors,
//         email: 'כתובת המייל אינה תקינה'
//       }));
//       return;
//     }

//     // Clear any previous errors if the email is valid
//     setErrors(prevErrors => ({ ...prevErrors, email: '' }));

//     console.log({
//       email: email,
//       password: data.get('password'),
//       firstName: firstName,
//       lastName: lastName
//     });
//   };

//   const validateEmail = (email) => {
//     const re = /\S+@\S+\.\S+/;
//     return re.test(email);
//   };

//   const validateName = (name) => {
//     const re = /^[a-zA-Zא-ת]+$/;
//     return re.test(name);
//   };

//   return (
//     <ThemeProvider theme={myTheme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             הרשם
//           </Typography>
//           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   autoComplete="given-name"
//                   name="firstName"
//                   required
//                   fullWidth
//                   id="firstName"
//                   label="שם פרטי"
//                   autoFocus
//                   error={Boolean(errors.firstName)}
//                   helperText={errors.firstName}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="lastName"
//                   label="שם משפחה"
//                   name="lastName"
//                   autoComplete="family-name"
//                   error={Boolean(errors.lastName)}
//                   helperText={errors.lastName}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="email"
//                   label="כתובת מייל"
//                   name="email"
//                   autoComplete="email"
//                   error={Boolean(errors.email)}
//                   helperText={errors.email}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   name="password"
//                   label="סיסמא"
//                   type="password"
//                   id="password"
//                   autoComplete="new-password"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControlLabel
//                   control={<Checkbox value="allowExtraEmails" color="primary" />}
//                   label="אני רוצה לקבל עדכונים במייל"
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               הרשם
//             </Button>
//             <Grid container justifyContent="flex-end">
//               <Grid item>
//                 <Link href="/signIn" variant="body2">
//                   כבר יש לך חשבון קים? התחבר
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// }

// export default function SignUp() {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//       firstName: data.get('firstName')
//     });
//   };

//   return (
//     <ThemeProvider theme={myTheme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             הרשם
//           </Typography>
//           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   autoComplete="given-name"
//                   name="firstName"
//                   required
//                   fullWidth
//                   id="firstName"
//                   label="שם פרטי"
//                   autoFocus
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="lastName"
//                   label="שם משפחה"
//                   name="lastName"
//                   autoComplete="family-name"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="email"
//                   label="כתובת מייל"
//                   name="email"
//                   autoComplete="email"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   name="password"
//                   label="סיסמא"
//                   type="password"
//                   id="password"
//                   autoComplete="new-password"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControlLabel
//                   control={<Checkbox value="allowExtraEmails" color="primary" />}
//                   label="אני רוצה לקבל עדכונים במייל"
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               הרשם
//             </Button>
//             <Grid container justifyContent="flex-end">
//               <Grid item>
//               {/* <Link to={'/details/'+p.id}> to the full post </Link> */}

//                 <Link href="/signIn" variant="body2">
//                   כבר יש לך חשבון קים? התחבר
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//         {/* <Copyright sx={{ mt: 5 }} /> */}
//       </Container>
//     </ThemeProvider>
//   );
// }