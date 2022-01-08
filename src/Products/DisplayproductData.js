import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import ProductSummary from "./ProductSummary";
import firebase, { db } from "../firebase";
import MenuItem from "./MenuItem";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './styles';
import LocationOnTwoToneIcon from '@material-ui/icons/LocationOnTwoTone';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { Button } from '@material-ui/core';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { Carousel } from 'react-carousel-minimal';
import '../css/DisplayproductData.css' 
import Divider from '@mui/material/Divider';

const ImageSlider = ({
    Brandname,
    productName,
    price,
    description,
    imageUrl,
    userId,
    docID,
    product, 
    onAddToCart,
    BName,
    ProdctLocation, 
    profileUID,
    PageName,
    Location
}) => {
    const [posts, SetPosts] = useState([]);
    const [Brands, SetBrands] = useState([]);
    // const uid = firebase.auth().currentUser;
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const {uid} = useParams();
    {
        firebase.auth().currentUser !== null &&
            firebase.auth().currentUser.uid === userId &&
            posts.map(({ id, post }) => (
                <MenuItem key={id} docID={post.docID} />
            ));
    }

 const handleFocus = (event) => event.target.select();
    
        const settings = {
        //   dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
       
        };
   

    return (
        <div className="dsContainer">
 

     <div className="divImages" >
     <Slider {...settings} 
 className="divImages" 
     >
                {imageUrl.map((imageUrl, i) => (
                    <img
                    className="sliderImages"
                        key={i}
                        src={imageUrl}
                        alt="Product-Image"
                    />
                ))}

            </Slider>
            </div>
       
<div className="Productdetials">
<div className="divPageName">
<h4 style={{ textAlign: 'center'}} >

    <a href={`shops/${PageName}/${profileUID}`}>
 {PageName}
            </a>
      
            </h4>
</div>
            
 



          
           
           
            <div>
                {/* <CardMedia image={"image"} title={"Product Name"} /> */}
               
                <div style={{position: "relative",
                //  bottom:'30px', 
                 height: "200px",   
                 }}>
                    <div className="Productdetails"  >
                    <div calssName="divStoreLocation">
        <h6 className="divStoreLocation"
        style={{textAlign: 'center', color:'rgb(138, 141, 145)'}}

        > <LocationOnOutlinedIcon style={{fontSize:'28px'}} />
        {Location}
        </h6>
        </div>


                        <div className="productName">
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            style={{ position: "relative", marginTop: "50px"}}
                            id="productName"
                        >
                            {productName}

                        </Typography>
                        </div>





                     
                        

                        <Typography
                        className="price"
                            gutterBottom
                            variant="h5"
                            component="h2"
                            style={{ position: "relative", marginTop: "50px" }}
                            id="productPrice"
                        >
                            {price}
                        </Typography>
                       
                    </div>
                    <div className="description">
                        {description}
                    </div>
                    {/* <Typography
                    className="description"
                        dangerouslySetInnerHTML={{ __html: description }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        className=""
                    /> */}
                </div>  
           
            </div>
            </div>

        </div>
    );
};
export default ImageSlider;
