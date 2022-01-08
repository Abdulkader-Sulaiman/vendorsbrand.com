import React, { lazy, Suspense, useReducer, useState } from 'react';
import ProductData from './ProductPage'
import PageHeader from '../components/header/PageHeader'
const PageContent = React.lazy(() => {
    return new Promise(resolve => setTimeout(resolve, 1000)).then(
      () => import("./ProductPage")
    );
  });


function ProductDetailsPage() {

    return (
        <div className="">
   
      {/* <h1>World's Longest Rivers</h1> */}
      {/* <div><button onClick={toggle}>Toggle Details</button></div> */}
    
      <Suspense fallback={<h1>Lodaing Data ...</h1>}>
      <PageHeader/>
        <PageContent />
        
      </Suspense>

    </div>
    )
  } 
 

export default ProductDetailsPage
