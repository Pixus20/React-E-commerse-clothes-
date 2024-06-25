import React, { useEffect, useState } from 'react';

import remove_icon from '../../Assets/cross_icon.png';
import './ListProduct.css';


const ListProduct = () => {

   const [allproducts,setAllProducts]=useState([]);

   const fetchInfo = async ()=>{
      await fetch('http://localhost:4000/allproducts')
      .then((res)=>res.json())
      .then((data)=>{setAllProducts(data)})
   }

   useEffect(()=>{
      fetchInfo()
   },[])

   const removeProduct=async (id)=>{
      await fetch('http://localhost:4000/removeproduct',{
         method:'POST',
         headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
         },
         body:JSON.stringify({id:id})
      })
      await fetchInfo()
   }


   return (
      <div className='listproduct'>
         <h1>All products list</h1>
         <div className="listproduct_format_main">
            <p>Products</p>
            <p>Title</p>
            <p>Old price</p>
            <p>New price</p>
            <p>Category</p>
            <p>Remove</p>
         </div>
         <div className="listproduct_allproducts">
            <hr />
            {allproducts.map((product) => {
               return (
                  <React.Fragment key={product.id}>
                     <div className="listproduct_format_main listproduct_format">
                     <img src={product.image} className='listproduct_product_icon' alt="" />
                     <p>{product.name}</p>
                     <p>${product.old_price}</p>
                     <p>${product.new_price}</p>
                     <p>{product.category}</p>
                     <img src={remove_icon} onClick={() => { removeProduct(product.id) }} className='listproduct_remove_icon' alt="" />
                     </div>
                     <hr />
                  </React.Fragment>
                  );
               })}
         </div>
      </div>
   )
}

export default ListProduct