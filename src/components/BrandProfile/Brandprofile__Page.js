import React, { ref, useEffect, useState } from "react";
import "../../css/profile__Header.css";
import EmojiFlagsIcon from "@material-ui/icons/EmojiFlags";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import HomeTabs from "./Dashboard";
import firebase, { db, auth } from "../../firebase";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Brandprofile__Page() {
    const { uid } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [Brandname, setBrandname] = useState("");
    var user = firebase.auth().currentUser;
    const ref = firebase.firestore().collection("user.uid");
    const [Brands, SetBrands] = useState([]);
    const [currentPost, setCurrentPost] = useState({});
    const { t } = useTranslation();

    // let userId = firebase.auth().currentUser.uid;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await db.collection(uid).doc("userId").get();

                console.log("UID IS " + uid);

                console.log("response", response);

                let data = { title: "not found" };

                if (response.exists) {
                    data = response.data();
                }

                setCurrentPost(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <div className="storebody">
                <div className="site__header">
                    <div className="brand__Info">
                        <IconButton style={{ outline: "none" }}>
                            <EmojiFlagsIcon
                                fontSize="large"
                                style={{ color: "#459FEE" }}
                            />
                        </IconButton>
                        <h1
                            style={{
                                fontFamily: "Arial, Helvetica, sans-serif",
                                color: "red",
                            }}
                        >
                            {uid}
                        </h1>

                        {/* <h1 style={{color:'red'}}>{!loading && currentPost.Brandname}</h1> */}
                    </div>
                    {
                        ({
                            /* !loading && currentPost.Brandname */
                        },
                        (
                            <h3
                                style={{
                                    top: "10px",
                                    fontFamily: "Arial, Helvetica, sans-serif",
                                }}
                            >
                                {t(!loading && currentPost.Store_type)}
                            </h3>
                        ))
                    }
                </div>
                <div className="tabs">
                    <HomeTabs />
                </div>
            </div>
        </>
    );
}

export default Brandprofile__Page;
