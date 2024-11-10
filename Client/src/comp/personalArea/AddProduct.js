// import React from 'react'

// function AddProduct() {
//   return (
//     <div>AddProduct</div>
//   )
// }

// export default AddProduct
import { addProduct } from './../Products/productSlice';
import { Box, Input } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { fetchCategories } from './../slices/categorySlice'
import { useDispatch, useSelector } from 'react-redux';
import { Add } from '@mui/icons-material';
import AddProduct2 from './add';
import Add2 from './add2';

function AddProduct() {
  const categoriesStatus = useSelector(state => state.category.status)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch()
  const categories = useSelector(state => state.category.categories)
  const status = useSelector(state => state.category.status)
  const user = useSelector(state => state.user.user)
  const [selectedImage, setSelectedImage] = useState()
  const [file, setFile] = useState()

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    
    const formData = new FormData();
    formData.append('Image', selectedFile);
    setFile(formData);
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };
  useState(() => {
    if(categoriesStatus!='fulfilled'){
      dispatch(fetchCategories())
    }
  }, [])
  useState(() => { console.log(categories); }, [status])
  const onSubmit = (data) => {
    // console.log({
    //   name: data.name, description: data.description, price: data.price
    //   , productSellerID: user.id, categoryId: data.category, fileImage: data.file, saleEndDate: data.date, isSold: false
    // });
    // dispatch(addProduct({
    //   name: data.name, description: data.description, price: data.price
    //   , productSellerID: user.id, categoryId: data.category, fileImage: file.get('Image'), saleEndDate: data.date, isSold: false
    // }))
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('productSellerID', user.id);
    formData.append('categoryId', data.category);
    formData.append('fileImage', file.get('Image'));
    formData.append('saleEndDate', data.date);
    formData.append('isSold', false);

    dispatch(addProduct(formData));
  }



  return (
    <>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <input type="text" placeholder=" שם מוצר" {...register("name", { required: true, min: 2 })} />
          <input type="text" placeholder="תיאור המוצר" {...register("description ", { required: true })} />
          <input type="number" placeholder="מחיר" {...register("price", { required: true, min: 1 })} />
          <input type="date" placeholder="תאריך לסיום המכירה" {...register("date", { required: true })} />
          <div>

            <select id="category"{...register("category", { required: true })}>
              <option value='-1'>בחר קטגוריה</option>

              {categories && categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div >

          <input type='file' onChange={handleImageUpload} placeholder='תמונת המוצר'  {...register("file", { required: true })} />
          {selectedImage && (
            <img src={selectedImage} alt="Selected" style={{ maxWidth: '200px', marginTop: '10px' }} />
          )}          <input type="submit" /></Box>
      </form> */}
      <Add2/>
    </>
  );
}

export default AddProduct