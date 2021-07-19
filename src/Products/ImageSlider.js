import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "../css/ImageSlider.css";
import ProductSummary from "../Products/ProductSummary";
import firebase, { db } from "../firebase";
import MenuItem from "../Products/MenuItem";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './styles';


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
    BName 
}) => {
    const [posts, SetPosts] = useState([]);
    const [Brands, SetBrands] = useState([]);
    const uid = firebase.auth().currentUser;
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    {
        firebase.auth().currentUser !== null &&
            firebase.auth().currentUser.uid === userId &&
            posts.map(({ id, post }) => (
                <MenuItem key={id} docID={post.docID} />
            ));
    }

    //REALTIME GET FUNCTION
    function getBrand() {
        Brandref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            SetBrands(items);
        });
    }

    const Brandref = firebase.firestore().collection(userId);
    useEffect(() => {
        getBrand();
        // eslint-disable-next-line
    }, []);

 






    
        const settings = {
        //   dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1
        };
   
    return (
        <div className="container">
        <div className="deleteBtn">
            {firebase.auth().currentUser !== null &&
                firebase.auth().currentUser.uid === userId && (
                    <MenuItem docID={docID} />
                )}
        </div>





            {Brands.map((Brand) => {
                return (
                    <div key={Brand.id} className="BrandName">
                   
                        <Link to={Brand.Brandname}>
                            <h4 style={{ fontFamily: "sans-serif" }}>
                                {Brand.Brandname}
                                
                            </h4>
                        </Link>
                    </div>
                );
            })}
            {/* <div>Test it</div> */}
            <Slider {...settings}>
                {imageUrl.map((imageUrl, i) => (
                    <img
                        key={i}
                        style={{ width: "500px" }}
                        src={imageUrl}
                        alt="Product-Image"
                    />
                ))}

                {/* <h3 className="description">{productName}</h3> 
    <p className="description">{description}</p>   
    <h1 className="price">{price}</h1> */}
            </Slider>
           
            <Card className={classes.root}  >
           
                <CardMedia image={"image"} title={"Product Name"} />

                <CardContent style={{height: "200px"}}>
                    <div className={classes.cardContent}  >
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            style={{ position: "relative", marginTop: "50px"}}
                        >
                            {productName}
                            
                        </Typography>

                        <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            style={{ position: "relative", marginTop: "50px" }}
                        >
                            ${price}
                        </Typography>
                    </div>
                    <Typography
                        dangerouslySetInnerHTML={{ __html: description }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    />
                </CardContent>
                <CardActions disableSpacing className={classes.cardActions}>
                    <IconButton aria-label="Add to Cart">
                        <AddShoppingCart />
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    );
};
export default ImageSlider;
