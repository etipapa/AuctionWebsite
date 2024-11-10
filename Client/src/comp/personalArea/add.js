// // setCurrProduct({
// //     name: name,
// //     price: price,
// //     description: description,
// //     categoryId: categoryId,
// //     fileImage: file.get('Image'),
// //     saleEndDate: saleEndDate,
// //     productSellerID: productSellerID
// // });
// // setToAdd(true);
// // useEffect(() => {
// //     if (toAdd) {
// //         dispatch(addProduct(currProduct))
// //     }
// // }, [toAdd]);
// import React, { useEffect, useState } from 'react';
// import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Input, IconButton, Box } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { addProduct } from './../Products/productSlice';
// import CloseIcon from '@mui/icons-material/Close';
// import { useParams } from 'react-router-dom';

// export default function AddProduct2() {
   
//     const dispatch = useDispatch();
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [price, setPrice] = useState(0);
//     const [saleEndDate, setSaleEndDate] = useState(null);
//     const [isOk, setIsOk] = useState(false);
//     const [file, setFile] = useState(null);
//     const [toAdd, setToAdd] = useState(false);
//     const [productSellerID, setProductSellerID] = useState();
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [categoryId, setCategoryId] = useState('');
//     const categories = useSelector(state => state.category.categories)
//     const status = useSelector(state => state.category.status)
//     const [currProduct, setCurrProduct] = useState({
//         name: "",
//         description: "",
//         price: 12,
//         productSellerID: 0,
//         categoryId: 0,
//         image: "",
//         fileImage: null,
//         saleEndDate: "2024-02-20T00:00:00",
//         isSold: false,
//         bids: []
//     });
//      const addProductToTheStore=()=>
//     {

//     }
    
 

//     const handleImageUpload = (e) => {
//         const selectedFile = e.target.files[0];
//         const formData = new FormData();
//         formData.append('Image', selectedFile);
//         setFile(formData);
//         // const file = e.target.files[0];
//         const reader = new FileReader();
//         reader.onload = () => {
//             setSelectedImage(reader.result);
//         };

//         if (selectedFile) {
//             reader.readAsDataURL(selectedFile);
//         }
//     };

   

//     return (
//         <>
//             <Box>
                
//                 <div style={{ marginBottom: '10px' }}>
//                     <TextField
//                         label="שם" InputLabelProps={{
//                             style: { fontSize: '1rem' }
//                         }}
//                         value={name} onChange={(e) => {
//                             setName(e.target.value);
//                             setIsOk(e.target.value?.trim() !== '');
//                         }}
//                         error={name?.trim() === ''}
//                         helperText={name?.trim() === '' ? 'שדה חובה' : ''}
//                     />
//                 </div>
//                 <div style={{ marginBottom: '10px' }}>
//                     <TextField
//                         label="תיאור מוצר" value={description}
//                         onChange={(e) => {
//                             setDescription(e.target.value);
//                             setIsOk(e.target.value?.trim() !== '');
//                         }}
//                         error={description?.trim() === ''}
//                         helperText={description?.trim() === '' ? 'שדה חובה' : ''}
//                     />
//                 </div>
//                 <div style={{ marginBottom: '10px' }}>
//                     <TextField
//                         inputProps={{ min: 0 }}
//                         label=" מחיר התחלתי"
//                         type="number"
//                         value={price}
//                         onChange={(e) => {
//                             setPrice(e.target.value);
//                             setIsOk(e.target.value.trim() !== '');
//                         }}
//                     />
//                 </div>
//                 <div style={{ marginBottom: '10px' }}>
//                 <label htmlFor="saleEndDate">תאריך סיום המכירה :</label>
//                 <br />
//                     <TextField id='saleEndDate'
//                     type='date' 
//                         value={saleEndDate}
//                         onChange={(e) => {
//                             setSaleEndDate(e.target.value);
//                             setIsOk(e.target.value?.trim() !== '');
//                         }}
//                         error={saleEndDate?.trim() === ''}
//                         helperText={saleEndDate?.trim() === '' ? 'שדה חובה' : ''}
//                     />
//                 </div>
//                 <label htmlFor="category">בחר קטגוריה:</label>
//                 <br />
//                 <select id="category" value={categoryId}>
//                     {categories.map(category => (
//                         <option key={category.id} value={category.id}>{category.name}</option>
//                     ))}
//                 </select>
//                 <div >
//                     <label htmlFor="image-upload"> :בחר תמונה</label>
//                     <br />
//                     <Input
//                         type="file"
//                         style={{ display: "none" }}
//                         onChange={handleImageUpload}
//                         accept="image/*"
//                         sx={{
//                             height: "100px",
//                             bgcolor: "transparent",
//                         }}
//                         id="image-upload"
//                     />
//                     <button onClick={() => document.getElementById('image-upload').click()}>Add Image</button>
//                     {selectedImage && (
//                         <img src={selectedImage} alt="Selected" style={{ maxWidth: '200px', marginTop: '10px' }} />
//                     )}
//                 </div>
//                 <Button type='submit' onClick={()=>{addProductToTheStore()}}></Button>
//             </Box>


//         </>
//     );
// }

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const AddProduct2 = () => {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: 'onChange',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAddProduct = (data) => {
    // ... קוד לטיפול בנתונים שהוזנו ...
    setIsSubmitted(true);
  };

  const handleClearErrors = (e) => {
    e.target.name && errors[e.target.name] && register(e.target.name);
  };

  return (
    <form onSubmit={handleSubmit(handleAddProduct)}>
      <div>
        <label htmlFor="name">שם:</label>
        <input
          id="name"
          name="name"
          ref={register({ required: true })}
          onFocus={handleClearErrors}
          className={errors.name && 'error'}
        />
        {errors.name && <p className="error-message">שדה חובה</p>}
      </div>
      <div>
        <label htmlFor="description">תיאור מוצר:</label>
        <textarea
          id="description"
          name="description"
          ref={register({ required: true })}
          onFocus={handleClearErrors}
          className={errors.description && 'error'}
        />
        {errors.description && <p className="error-message">שדה חובה</p>}
      </div>
      <div>
        <label htmlFor="price">מחיר התחלתי:</label>
        <input
          id="price"
          name="price"
          type="number"
          ref={register({ required: true, min: 1 })}
          onFocus={handleClearErrors}
          className={errors.price && 'error'}
        />
        {errors.price && <p className="error-message">המחיר חייב להיות מספר גדול מ-1</p>}
      </div>
      <div>
        <label htmlFor="saleEndDate">תאריך סיום המכירה:</label>
        <input
          id="saleEndDate"
          name="saleEndDate"
          type="date"
          ref={register({ required: true })}
          onFocus={handleClearErrors}
          className={errors.saleEndDate && 'error'}
        />
        {errors.saleEndDate && <p className="error-message">שדה חובה</p>}
      </div>
      <div>
        <label htmlFor="category">בחר קטגוריה:</label>
        <select id="category" name="category" ref={register}>
          <option value="">בחר...</option>
          {/* ... אפשרויות הקטגוריות ... */}
        </select>
      </div>
      <div>
        <label htmlFor="image-upload">בחר תמונה:</label>
        <input
          id="image-upload"
          name="image"
          type="file"
          ref={register}
          accept="image/*"
        />
      </div>
      <button type="submit" disabled={!formState.isValid || isSubmitted}>
        הוסף מוצר
      </button>
    </form>
  );
};

export default AddProduct2;
