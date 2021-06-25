import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ImageSlider from '../../Products/ImageSlider';
import BrandProfile from '../BrandProfile/Profile_Page';
import ProductList from '../../Products/ProductList';
import Dashboard from '../Dashboard/Dashboard';
import firebase, { db } from "../../firebase";
import '../../css/ImageSlider.css';
import { useAuth } from "../../contexts/AuthContext"
import MenuItem from '../../Products/MenuItem'
import '../../css/delete_Product.css'


const mystyle = {
    color: "white",
    backgroundColor: "#1890ff",
    padding: "10px",
    fontFamily: "Arial",
    textAlign: "center",
    fontSize: "30px"
  };

 function Home() {
    const [posts, setPosts ] = useState([])   
    const { currentUser, logout } = useAuth()
    const [userId, setUserId] = useState('')
 
    useEffect(() => {
        db.collection("products")
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) =>
            setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data()})))
          );
        //   var userUid = firebase.auth().currentUser.uid;
        //   setUserId(userUid)
      }, []);
    const [loading, setLoading, ] = useState(false)
    
    if(loading){
        return <h1>Loading...</h1>;
    }
    
    return (
        <>
    {/* <h1 style={mystyle}>Here you will find Vendors Products</h1>  */}
    <div className="products">
   {
       posts.map(({id, post })=> (
        <ImageSlider 
            key={id}
            userId={post.userId}
            description={post.description} 
            price={post.Price} 
            productName={post.productName}
            imageUrl={post.images}
            docID={post.docID}
            Brandname={post.Brandname}
            />
            
       )) 
   }

</div>
</>
)}

export default Home