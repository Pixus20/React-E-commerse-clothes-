import React, { useState } from 'react'

import './AddProduct.css'

import upload_area from '../../Assets/upload_area.svg'

const AddProduct = () => {

   const [image,setImage]=useState(false)
   const [productDetails, setProductDetails]=useState({
      name:'',
      image:'',
      category:'women',
      new_price:'',
      old_price:'',
   })

   const imageHandler= (e)=>{
      setImage(e.target.files[0]);
   }

   const changeHandler=(e)=>{
      setProductDetails({...productDetails,[e.target.name]:e.target.value})
   }

   const Add_Product = async () => {
      console.log(productDetails);
      let responceData;
      let product = productDetails;
      let formData = new FormData();
      formData.append('product', image);
      try {
         const response = await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
               Accept: 'application/json',
            },
            body: formData,
         });
         if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
         }
         responceData = await response.json();
         if (responceData.success) {
            product.image = responceData.image_url;
            console.log(product);
            await fetch ('http://localhost:4000/addproduct',{
               method:'POST',
               headers:{
                  Accept:'application.json',
                  'Content-Type':'application/json'
               },
               body:JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
               data.success?alert("Product added"):alert("Failed")
            })
         }
         } catch (error) {
         console.error('Error during fetch:', error);
         }
      };
      
   return (
      <div className='addproduct'>
         <div className="addproduct_itemfield">
            <p>Product title</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
         </div>
         <div className="addproduct_price">
            <div className="addproduct_itemfield">
               <p>Price</p>
               <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here' />
            </div>
            <div className="addproduct_itemfield">
               <p>Offer Price</p>
               <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here' />
            </div>
         </div>
         <div className="addproduct_itemfield">
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changeHandler} name="category" className='addproduct_selector'>
               <option value="women">Wonen</option>
               <option value="men">Men</option>
               <option value="kid">Kid</option>
            </select>
         </div>
         <div className="addproduct_itemfield">
            <label htmlFor="file_input">
               <img src={image? URL.createObjectURL(image):upload_area } alt=""  className='addproduct_thunmail_img'/>
            </label>
            <input  onChange={imageHandler} type="file" name='image' id='file_input' hidden/>
         </div>
         <button onClick={()=>{Add_Product()}} className="addproduct_btn">
            ADD
         </button>
      </div>
   )
}

export default AddProduct