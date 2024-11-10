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
import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete, Input } from '@mui/material';
import { addProduct } from '../Products/productSlice';
import { editProductToSale } from '../slices/userSlice'
import { useNavigate } from 'react-router-dom';




export default function Add2() {
    const [errors, setErrors] = React.useState({});
    const categories = useSelector(state => state.category.categories)
    const status = useSelector(state => state.category.status)
    const user = useSelector(state => state.user.user)
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [category1, setCategory1] = React.useState('');
    const [image, setImage] = React.useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result); // קביעת התמונה כ-base64
                setSelectedImage(URL.createObjectURL(file)); // הצגת תמונה מקומית
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = data.get('name');
        const description = data.get('description');
        const price = data.get('price');
        const date = data.get('date');
        const category = category1
        const image = data.get('image'); // שינוי: הוספת תמונה


        // Validate form fields
        let isValid = true;
        setErrors({}); // Clear previous errors

        if (!validateName(name)) {
            setErrors(prevErrors => ({ ...prevErrors, name: 'שם מוצר יכול להכיל רק אותיות' }));
            isValid = false;
        }

        if (description && description.length > 300) {
            setErrors(prevErrors => ({ ...prevErrors, description: 'תיאור יכול להיות עד 300 תווים' }));
            isValid = false;
        }

        if (!validatePrice(price)) {
            setErrors(prevErrors => ({ ...prevErrors, price: 'מחיר חייב להיות חיובי' }));
            isValid = false;
        }

        if (!category) {
            setErrors(prevErrors => ({ ...prevErrors, category: 'בחר קטגוריה' }));
            isValid = false;
        }

        if (!validateDate(date)) {
            setErrors(prevErrors => ({ ...prevErrors, date: 'תאריך חייב להיות היום ואילך' }));
            isValid = false;
        }

        if (isValid) {
            // Form is valid, send data to server
            console.log({
                name,
                description,
                price,
                date,
                category,
                selectedImage, // Assuming you have logic to handle the image data in FormData
            });
            try {
                dispatch(addProduct({name: name, description: description, price: price, productSellerID: user.id, categoryId: category1, fileImage: image, saleEndDate: date, isSold: false, bids: [] })).then((res) => {
                    console.log(res)
                    dispatch(editProductToSale(res.payload));
                });
                alert("המוצר התווסף בהצלחה!")
                navigate('/home')
            } catch (error) {
                console.error('Error adding bid:', error);
            }
        }
    };

    const validateName = (name) => {
        const re = /^[a-zA-Zא-ת ]*$/;
        return re.test(name);
    };

    const validatePrice = (price) => {
        return !isNaN(price) && parseFloat(price) > 0; // Check for a number and positive value
    };

    const validateDate = (date) => {
        const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
        return date >= today; // Check if selected date is after or equal to today
    };

    // const handleImageChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file && file.type.startsWith('image/')) {
    //         setSelectedImage(URL.createObjectURL(file));
    //     }
    // };
    const handelCategorySelect = (event, value) => {
        setCategory1(value.key);
        console.log(value.key);
    }
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
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField
                                autoComplete="given-name"
                                name="name"
                                required
                                fullWidth
                                id="name"
                                label="שם מוצר"
                                autoFocus
                                error={Boolean(errors.name)}
                                helperText={errors.name}
                                onChange={() => setErrors(prevErrors => ({ ...prevErrors, name: '' }))
                                }
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                required
                                fullWidth
                                id="description"
                                label="תאור מוצר"
                                name="description"
                                // autoComplete="family-name"
                                error={Boolean(errors.description)}
                                helperText={errors.description}
                                onChange={() => setErrors(prevErrors => ({ ...prevErrors, description: '' }))}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="price"
                                label="מחיר התחלתי בדולרים"
                                name="price"
                                autoComplete="price"
                                error={Boolean(errors.price)}
                                helperText={errors.price}
                                onChange={() => setErrors(prevErrors => ({ ...prevErrors, price: '' }))}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="date"
                                label="תאריך סיום המכירה"
                                type="date"
                                id="date"
                                autoComplete="date"
                                error={Boolean(errors.date)}
                                helperText={errors.date}
                                onChange={() => setErrors(prevErrors => ({ ...prevErrors, date: '' }))}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            {/* <Autocomplete required fullWidth
                            freeSolo
                            id="category"
                            disableClearable
                            options={categories.map((option) => option.name)}
                            renderInput={(params) => (
                                <TextField
                                    fullWidth
                                    error={Boolean(errors.price)}
                                    helperText={errors.category}
                                    {...params}
                                    label="בחר קטגוריה"
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />
                            )}
                        /> */}
                            <Autocomplete
                                required
                                fullWidth
                                freeSolo
                                id="category"
                                disableClearable
                                options={categories.map((m) => ({ key: m.id, label: m.name }))}
                                // value={category1}
                                onChange={handelCategorySelect}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="בחר קטגוריה"
                                        InputProps={{
                                            ...params.InputProps,
                                            type: 'search',
                                        }}
                                    />
                                )}
                            />
                            {/* <Autocomplete
                                required
                                fullWidth
                                freeSolo
                                id="category"
                                disableClearable
                                options={categories}
                                value={category1}
                                onChange={(event, value) => setCategory1(value.id)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="בחר קטגוריה"
                                        InputProps={{
                                            ...params.InputProps,
                                            type: 'search',
                                        }}
                                    />
                                )}
                                optionlabel="id"
                            /> */}
                        </Grid>
                        {/* <Grid item xs={12}>
                            <Input
                                type="file"
                                style={{ display: "none" }}
                                // onChange={handleImageUpload}
                                accept="image/*"
                                sx={{
                                    height: "100px",
                                    bgcolor: "transparent",
                                }}
                                id="image-upload"
                            />
                            <button onClick={() => document.getElementById('image-upload').click()}>Add Image</button>
                            {selectedImage && (
                                <img src={selectedImage} alt="Selected" style={{ maxWidth: '200px', marginTop: '10px' }} />
                            )}
                        </Grid> */}
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                העלאת תמונה
                            </Typography>
                            <input
                                accept="image/*"
                                id="image"
                                name="image"
                                type="file"
                                onChange={(e) => { setImage(e.target.files[0]); setSelectedImage(URL.createObjectURL(e.target.files[0])) }}
                            />
                            {selectedImage && (
                                <Box mt={2}>
                                    <img src={selectedImage} alt="תמונה נבחרה" width="200" />
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        העלה מוצר
                    </Button>

                    <Grid container justifyContent="flex-end">
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

