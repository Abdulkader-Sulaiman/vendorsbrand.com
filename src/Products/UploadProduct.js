import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Button } from "@material-ui/core";
import { useState } from "react";
import firebase, { storage, db, auth } from "../firebase";
import "../css/UploadProduct.css";
import { formik, Field, Form } from "formik";
import Input from "@material-ui/core/Input";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function UploadProduct() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [progress, setProgress] = useState(0);
    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const [productPrice, setPrductPrice] = useState("");
    const [PrductDescription, setPrductDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [posts, SetPosts] = useState([]);
    const [Brands, SetBrands] = useState([]);
    const [Brandname, setBrandname] = useState("");
    const [ProductName, setProductName] = useState("");
    const [BName, setBName] = useState("");
    const [currentBrandData, setCurrentBrandData] = useState({});
    const [ProdctLocation, setProdctLocation] = useState({});

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    function refrashPage() {
        document.location.reload();
    }

    const { t } = useTranslation();
    //   const ref = firebase.firestore().collection('user.uid');

    // //REALTIME GET FUNCTION
    // function getBrandData() {
    //     setLoading(true);
    //     ref.onSnapshot((querySnapshot) => {
    //       const items = [];
    //       querySnapshot.forEach((doc) => {
    //         items.push(doc.data());
    //       });
    //       SetPosts(items);
    //       setLoading(false);
    //     });
    //   }

    //   useEffect(() => {
    //     getBrandData();
    //     // eslint-disable-next-line
    //   }, []);

    var userID = firebase.auth().currentUser.uid;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await db.collection("users").doc(userID).get();

                console.log("response", response);
                let data = { title: "not found" };

                if (response.exists) {
                    data = response.data();
                }

                setCurrentBrandData(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    // get Store Location from DB
    // var x = currentBrandName.Brandname

    // useEffect(() => {

    //     const fetchData = async() => {
    //         try {
    //             const response = await db
    //                 .collection('ShopTeam')
    //                 .doc('userId')
    //                 .get();

    //             console.log('response', response);
    //             let data = { title: 'not found' };

    //             if (response.exists) {
    //                 data = response.data();
    //             }

    //             setCurrentBrandLocation(data);
    //             setLoading(false);

    //         } catch(err) {
    //             console.error(err);
    //         }
    //     };
    //     fetchData();
    // }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);

    const ref = firebase.firestore().collection("Brands");

    //REALTIME GET FUNCTION
    function getBrandData() {
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
        getBrandData();
        // eslint-disable-next-line
    }, []);

    const handleChange = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImages((prevState) => [...prevState, newImage]);
        }
    };

    const handleUpload = () => {
        const promises = images.map((file) => {
            const ref = firebase.storage().ref().child(`images/${file.name}`);
            return ref.put(file).then(() => ref.getDownloadURL());
        });
        let userId = firebase.auth().currentUser.uid;
        const docID = db.collection("products").doc().id;
        if (ProductName && productPrice && PrductDescription != "") {
            Promise.all(promises)
                .then((fileDownloadUrls) => {
                    db.collection("products").doc(docID).set({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        images: fileDownloadUrls,
                        BName: currentBrandData.Brandname,
                        location_Geohash: currentBrandData.location_Geohash,
                        ProdctLocation: currentBrandData.ProdctLocation,
                        userId: userId,
                        docID: docID,
                        productName: ProductName,
                        Price: productPrice,
                        description: PrductDescription,
                    });
                })
                .catch((err) => console.log(err));
        }
        // Every User get there Products in a uid Colection
        Promise.all(promises)
            .then((fileDownloadUrls) => {
                db.collection(userId).doc(docID).set({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    images: fileDownloadUrls,
                    userId: userId,
                    docID: docID,
                });
            })
            .catch((err) => console.log(err));

        {
            Brands.map((Brand) => {
                return (
                    <div key={Brand.id}>
                        <Link to={Brand.Brandname}>
                            <h4 style={{ fontFamily: "sans-serif" }}>
                                {Brand.Brandname}
                            </h4>
                        </Link>
                    </div>
                );
            });
        }

        // Every User get there Products in a uid Colection
        Promise.all(promises)
            .then((fileDownloadUrls) => {
                db.collection(Brandname).set({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    images: fileDownloadUrls,
                    userId: userId,
                    docID: docID,
                });
            })
            .catch((err) => console.log(err));
        if (ProductName && productPrice && PrductDescription != "") {
            setOpen(false);
            setInterval(function () {
                refrashPage();
            }, 20000);
        }
    };

    return (
        <div>
            <p type="button" onClick={handleOpen}>
                <CloudUploadIcon
                    style={{
                        position: "relative",
                        fontSize: "33px",
                        top: "10px",
                    }}
                />
            </p>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">
                            {t("Products upload Center")}
                        </h2>
                        <p id="transition-modal-description">
                            {t("Add a new Product.")}
                        </p>
                        <main>
                            <form
                                className="formContainer"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <progress
                                    className="imageupload__progress"
                                    value={progress}
                                    max="100"
                                />
                                <div className="">
                                    <h5>{t("Select Product Images")}</h5>
                                    <input
                                        type="file"
                                        id="uploadCaptureInputFile"
                                        onChange={handleChange}
                                        multiple
                                        required
                                        accept="image/png, image/jpeg"
                                    />

                                    {/* <input  type="text" onChange={(e) => setProductName(e.target.value)} value={ProductName} placeholder={t("Enter a Product Name")} />  
        <input type="text" onChange={(e) => setPrductPrice(e.target.value)} value={productPrice} placeholder={t("Enter a Product Price")} required />
        <textarea onChange={(e) => setPrductDescription(e.target.value)} value={PrductDescription} placeholder={t("Enter Product description")}  required/>   */}
                                    {/* {!loading && currentBrandName.Brandname} */}
                                    {/* {currentBrandLocation.Store_location} 
        {currentBrandName.Brandname} */}
                                    <input
                                        {...register("ProductName", {
                                            required: true,
                                        })}
                                        type="text"
                                        onChange={(e) =>
                                            setProductName(e.target.value)
                                        }
                                        value={ProductName}
                                        placeholder={t("Enter a Product Name")}
                                    />
                                    {errors.ProductName && (
                                        <p>{t("Product Name is required.")}</p>
                                    )}

                                    <input
                                        {...register("PrductPrice", {
                                            required: true,
                                        })}
                                        type="text"
                                        onChange={(e) =>
                                            setPrductPrice(e.target.value)
                                        }
                                        value={productPrice}
                                        placeholder={t("Enter a Product Price")}
                                    />
                                    {errors.PrductPrice && (
                                        <p>{t("Product Price is required.")}</p>
                                    )}

                                    <textarea
                                        {...register("PrductDescription", {
                                            required: true,
                                        })}
                                        type="text"
                                        value={PrductDescription}
                                        onChange={(e) =>
                                            setPrductDescription(e.target.value)
                                        }
                                        placeholder={t(
                                            t("Enter Product description")
                                        )}
                                    />
                                    {errors.PrductDescription && (
                                        <p>
                                            {t(
                                                "Product Description is required."
                                            )}
                                        </p>
                                    )}
                                </div>
                                <Button
                                    type="submit"
                                    className="imageupload__button"
                                    onClick={handleUpload}
                                    className="uploadBtn"
                                >
                                    {t("Upload")}
                                </Button>
                                <Button
                                    onClick={handleClose}
                                    className="cancelBtn"
                                >
                                    {t("Cancel")}
                                </Button>
                            </form>
                        </main>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default UploadProduct;
