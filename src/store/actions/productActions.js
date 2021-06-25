export const createProduct = (product) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        firestore.collection('products').add({
            ...product,
            productName:'white t-shirt',
            productPrice: 22,
            author:'Abdul',
            autherId: '12345',
            createdAt: new Date()
        }).then(() => {
            dispatch({type: 'CREATE_PRODUCT', product});
        }).catch((err) => {
          dispatch({type: 'CREATE_PRODUCT_ERROR', err });
        })
       
    }
};
