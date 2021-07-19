import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import firebase, { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext"
import ImageSlider from '../../Products/ImageSlider';
import '../../css/ImageSlider.css';

export default function ProductsPage() {
    const {uid} = useParams();
    const [products, setProduct ] = useState([])
    const { currentUser, logout } = useAuth()
    const [loading, setLoading, ] = useState(false)

    useEffect(() => {
    
        db.collection(uid)
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) =>
            setProduct(snapshot.docs.map((doc) => ({ id: doc.id, product: doc.data()})))
          );
      }, []);
    
    if(loading){
        return <h1>Loading...</h1>;
    }

  return (
      <div className="products">
          <h1>Products Page</h1>

          {
        products.map(({id, product })=> (
        
        <ImageSlider 
            key={id}
            postId={id}
            description={product.description} 
            price={product.Price} 
            imageUrl={product.imageUrl}/>
       ))
   }
      </div>
  )
}