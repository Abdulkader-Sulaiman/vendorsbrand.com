import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import Dashboard from '../Dashboard/Dashboard';
import Container from '@material-ui/core/Container';
import Avater from '../User_Avater';
import { Link } from "react-router-dom";
import firebase, { db } from "../../firebase";
import ImageSlider from '../../Products/ImageSlider';
import VendorsProfile from '../BrandProfile/VendorsProfile'
import {useParams} from 'react-router-dom'
import '../../css/Vendors_Page.css';
import ProductGrid from '../../Products/ProductGrid'
import { useTranslation } from "react-i18next";



    const mystyle = {
        color: "white",
        backgroundColor: "#1890ff",
        padding: "10px",
        fontFamily: "Arial",
        textAlign: "center",
        fontSize: "30px"
    };

 function Products() {
    const { uid } = useParams();
    const [Brands, SetBrands ] = useState([])
    const [loading, setLoading ] = useState(false)
    const ref = firebase.firestore().collection('Brands');
    var user = firebase.auth().currentUser;
    const { t } = useTranslation();

    
    //REALTIME GET FUNCTION
    function getBrand() {
        setLoading(true);
        ref.onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
            items.push(doc.data());
        });
        SetBrands(items);
        setLoading(false);
        });
    }

  useEffect(() => {
    getBrand();
    // eslint-disable-next-line
  }, []);

    // console.log(ref)
    if(loading){
        return <h1>Loading...</h1>
}

    return (
    <>
    {/* <h1 style={mystyle}>Here you will find Vendors and their Profiles</h1>  */}
<br />

    {/* <ProductGrid /> */}
    
   {
    Brands.map((Brand) => {
     return(
   <div key={Brand.id} className="profiles_Container" style={{top:'40px'}}>
  <div className="card" style={{width: "18rem"}}>
  <div className="card-body">
  <h4 className="card-title">{Brand.Brandname}</h4>
<Link to={Brand.Brandname} class="btn btn-primary">{t("View Store")}</Link>   
  </div>
</div>
</div>
           )
       })
   }
</>

)}
export default Products