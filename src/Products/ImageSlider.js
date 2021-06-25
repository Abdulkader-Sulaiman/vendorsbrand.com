import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "../css/ImageSlider.css";
import ProductSummary from "../Products/ProductSummary";
import firebase, { db } from "../firebase";
import MenuItem from "../Products/MenuItem";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const ImageSlider = ({
    Brandname,
    productName,
    price,
    description,
    imageUrl,
    userId,
    docID,
}) => {
    const [posts, SetPosts] = useState([]);
    const [Brands, SetBrands] = useState([]);
    const uid = firebase.auth().currentUser;

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


   
    return (
        <div className="container">
            {firebase.auth().currentUser !== null &&
                firebase.auth().currentUser.uid === userId && (
                    <MenuItem docID={docID} />
                )}

            {Brands.map((Brand) => {
                return (
                    <div key={Brand.id}>
                        <Link to={Brand.Brandname}>
                            <h4 style={{ fontFamily: "sans-serif" }}>
                                {Brand.Brandname}
                            </h4>
                        </Link>
                    </div>
                );
            })}

            <Slider  >
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
        </div>
    );
};
export default ImageSlider;
