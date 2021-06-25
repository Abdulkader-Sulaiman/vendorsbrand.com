const initState = {
    products: [ 
        {
            id:1, 
            product_title: 'White-t-shirt', 
            image: 'https://www.paffen-sport.com/896-3478-thickbox/logo-basic-t-shirt.jpg',
            productPrice: 22,
        },
        {
            id:2, 
            product_title: 'black-t-shirt', 
            image: 'https://i.pinimg.com/564x/31/66/42/316642cec41b96844d4230363541d0af.jpg',
            productPrice: 16,
        }
    ]
};
 
const productReducer = (state = initState, action) => {
   switch (action.type) {
       case 'CREATE_PRODUCT':
           console.log('Created product', action.product);
           return state;
        case 'CREATE_PRODUCT_ERROR':
            console.log('create product error', action.err);
            return state;
        default:
            return state;
   }
    return state
}
export default productReducer