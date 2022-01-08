import React, {useEffect, useState, createContext } from "react";
import firebase, { db } from "../firebase";
export const TestContext1 = createContext("");


function SignupCollectionUsing_Where(props) {
    const [profileData, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(false);

    var item = document.location.pathname;
    var ProfileID = item.split("/").pop();
    console.log(ProfileID); // get the last item

    //aea
    useEffect(() => {
        const fetchData = () => {
            try {
            db.collection("SignUp-data")
              .where("profileUID", "==", ProfileID)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    let data = { title: 'not found' };
                   
                    if (doc.exists) {
                        data = doc.data();
                    }
                    setCurrentUser(data);
                    setLoading(false);

                });
            })
                    
       
            } catch(err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);
    const Username = "JOMA Context"
    return (
        <>
        <TestContext1.Provider value={{ Username, profileData}}>
        {props.children}
      </TestContext1.Provider>
            {!loading && profileData.title}
        </>
    )
    

}

export default SignupCollectionUsing_Where
