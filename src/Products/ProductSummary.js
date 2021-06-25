// we Use ProductSummary inside the ProductList
import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import '../css/ImageSlider.css';
import firebase, { db } from "../firebase";


function ProductSummary() {

    const [posts, SetPosts ] = useState([])
    const [loading, setLoading, ] = useState(false)
    
    const ref = firebase.firestore().collection('products');
   

//REALTIME GET FUNCTION
//REALTIME GET FUNCTION
function getSchools() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      SetPosts(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    getSchools();
    // eslint-disable-next-line
  }, []);

    // console.log(ref)
    if(loading){
        return <h1>Loading...</h1>;
    }

    return (
    <div className="">

   {
       posts.map((post) => {
           return(
       <h1>{post.Price}</h1> 
           )
       })
   }

</div>


    )
}

export default ProductSummary
