import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useState } from "react";
import firebase, { storage, db, auth } from "../firebase";
import "../css/UploadProduct.css";
import { formik, Field, Form } from "formik";
import Input from "@material-ui/core/Input";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { FcApproval } from "react-icons/fc";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


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


const steps = [
  "Step 1",
  "Step 2",
  "Step 3",
];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const { t } = useTranslation();

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
  const [currentBrandData, SetCurrentBrandData] = useState({});
  const [ProdctLocation, setProdctLocation] = useState({});
  const [currentPost, setCurrentPost] = useState({});
  const [selectedValue, setSelectedValue] = useState();
  const userID = firebase.auth().currentUser.uid;
  console.log("currentBrandData",
  currentBrandData
  )

//   function refrashPage() {
//     document.location.reload();
// }
 

const handleSelecteValue = (e) => {
  alert(e.target.value);
};



const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };




useEffect(() => {
    const fetchData = () => {
        try {
        db.collection("SignUp-data")
          .where("userId", "==", userID)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                let data = { title: 'not found' };
               
                if (doc.exists) {
                    data = doc.data();
                }
                SetCurrentBrandData(data);
                setLoading(false);

            });
        })
                
                // .doc('1p4PBe8nOHJ4zSOw3ZfH')
                // .get();
   
        } catch(err) {
            console.error(err);
        }
    };
    fetchData();
}, []);


const {
    register,
    handleSubmit,
    formState: { errors },
} = useForm();
const onSubmit = (data) => data;

const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
        const newImage = e.target.files[i];
        newImage["id"] = Math.random();
        setImages((prevState) => [...prevState, newImage]);
    }
};

const handleClose = () => {
    setOpen(false);
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
                    // BName: currentBrandData.Brandname,
                     location_Geohash: currentBrandData.location_Geohash,
                    Location: currentBrandData.Location,
                    PageName: currentBrandData.PageName,
                    // profileUID: currentBrandData.profileUID,
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
    // Promise.all(promises)
    //     .then((fileDownloadUrls) => {
    //         db.collection(userId).doc(docID).set({
    //             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //             images: fileDownloadUrls,
    //             userId: userId,
    //             docID: docID,
    //         });
    //     })
    //     .catch((err) => console.log(err));

  
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }
    
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
  
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
    // if (ProductName && productPrice && PrductDescription != "") {
    //     setOpen(false);
 
    // }
};

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div style={{ display:'grid', placeItems: 'center', }}>
    <Box sx={{ width: "70%",  marginTop:'20px'
    // display:'grid', placeItems: 'center',
    }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
          The Product has been Successfully uploaded
          </Typography>
          <FcApproval style={{fontSize:'50px'}}/>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {/* Step */}
            {/* {activeStep + 1} */}
            {activeStep + 1 == 1 && 
            
            <form
            className="formContainer"
            onSubmit={handleSubmit(onSubmit)}
            >
        
            <div className="">
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
       
                {errors.PrductDescription && (
                    <p>
                        {t(
                            "Product Description is required."
                        )}
                    </p>
                )}
            </div>
            {/* <Button
                type="submit"
                className="imageupload__button"
                onClick={handleUpload}
                className="uploadBtn"
            >
                {t("Upload")}
            </Button>
         */}
        </form>
             
            
            
            }
            {activeStep + 1 == 2 && 
            
            <form
            className="formContainer"
            onSubmit={handleSubmit(onSubmit)}
        >
        
            <div className="">

                <input
                    type="file"
                    id="uploadCaptureInputFile"
                    onChange={handleChange}
                    multiple
                    required
                    accept="image/png, image/jpeg"
                />
        
    
                {errors.ProductName && (
                    <p>{t("Product Name is required.")}</p>
                )}
        
         
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
        </form>

            }
            {activeStep + 1 == 3 &&
         <div style={{marginTop:'30px'}}>
             <h5>Please Select Category</h5>
            <FormControl sx={{ m: 1, minWidth: 300 }}>
            <InputLabel htmlFor="grouped-select">Grouping</InputLabel>
            <Select id="grouped-select" label="Grouping"
              onChange={handleSelecteValue}
              value=""
            >
              <MenuItem value="" 
              style={{minWidth: 400}}>
                <em>None</em>
              </MenuItem>
              <ListSubheader 
              style={{minWidth: 220}}
              >Food</ListSubheader>
              <MenuItem value={'Food, Option 1'}
              style={{minWidth: 220}}
              >Option 1</MenuItem>
              <MenuItem value={'Food, Option 2'}
              style={{minWidth: 220}}
              >Option 2</MenuItem>
              <ListSubheader
              style={{minWidth: 220}}
              >Cars</ListSubheader>
              <MenuItem value={'Cars, Option 1'}
              style={{minWidth: 220}}
              >Cars 1</MenuItem>
              <MenuItem value={'Cars, Option 2'}
              style={{minWidth: 220}}
              >Cars 2</MenuItem>
            </Select>
          </FormControl>
          </div>
          
            }
             { console.log(selectedValue)}
          {/* {  console.log(activeStep + 1)} */}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
    
            <Button 
             onClick={handleNext}
            type="submit"
            className="imageupload__button"
            //  onClick={handleUpload}
            className="uploadBtn"
            
            >
              {activeStep === steps.length - 1 ? "" : "Next"}
            </Button>

            <Button 
            // onClick={handleNext}
            type="submit"
            className="imageupload__button"
             onClick={handleUpload}
            className="uploadBtn"
            
            >
              {activeStep === steps.length - 1 ? "Finish88" : ""}
            </Button>
                

          </Box>
        </React.Fragment>
      )}
    </Box>
    </div>
  );
}
