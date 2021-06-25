import React from 'react';
import ProductSummary from '../Products/ProductSummary';
import '../css/ImageSlider.css';

function productList({products}) {
    return (
        <div>
    { products && products.map(product => {
        return (
        <ProductSummary product={product} key={product.id}/> 
        )
    })}
    </div>
    )
}

export default productList
