import React, {useEffect, useState, createContext } from "react";
import firebase, { db } from "../firebase";
export const TestContext = createContext();


function FirestoreContext(props) {
    const [currentPost1, setCurrentPost] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await db
                    .collection("SignUp-data").doc('io8uR0PV6Yx6VcK9sym4')
                    .get();
                console.log('response', response);
                let data = { title: 'not found' };
                if (response.exists) {
                    data = response.data();
                }
                setCurrentPost(data);
                setLoading(false);
            } catch(err) {
                console.error(err);
            }
        };
    
        fetchData();
    }, []);
    const name = "Abdulkader Context"
    return (
        <div>
        <TestContext.Provider value={{ name, currentPost1 }}>
        {props.children}
      </TestContext.Provider>
            {!loading && currentPost1.title}
        </div>
    )
    

}

export default FirestoreContext
