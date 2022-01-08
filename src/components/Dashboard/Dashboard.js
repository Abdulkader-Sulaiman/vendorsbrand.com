// import React, { Component } from 'react'
// import ProductList from '../../Products/ProductList';
// import {connect} from 'react-redux';
// import ImageSlider from '../../Products/ImageSlider';
// import { CompareArrowsOutlined } from '@material-ui/icons';
// import { compose } from 'redux'
// import { firestoreConnect } from 'react-redux-firebase'
// import {db} from '../../firebase';

// export class Dashboard extends Component {
     
//     render() { 
       
//          const { products } = this.props;
//         //   console.log(products)

//                 // or get the single doc from the collection
//                 // db.collection("products")
//                 // .doc('1223tyEIXrGXuL5MhRtt')
//                 // .get()
//                 // .then(doc => {
//                 //   const data = doc.data();
//                 //   console.log(data); 
                 
//                 // });
                
//         return (
//             <div className="">
//                 <ProductList  products={products}/>
    
//             </div>
//         )
//     }
// }

//     const mapStateToProps = (state) => {
//         console.log(state)
//            db.collection("products")
//                   .doc('1223tyEIXrGXuL5MhRtt')
//                   .get()
//                   .then(doc => {
//                     const data = doc.data();
//                     console.log(data); 
                 
//                   });
//         return {
//             products: state.product.products
//         }
//     }

// export default compose(
 
//     connect(mapStateToProps)

// )(Dashboard)
