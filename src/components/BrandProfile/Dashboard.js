import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
//import "../css/Header.css";
import BrandProfile from "./Profile_Page";
import Products from "../pages/Vendors_Page";
import ProductsPage from "./Products_Page";


function CenteredTabs() {

    const [SelectedTab, setSelectedTab] = React.useState(0);
    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <>
            <div className="header">

                <Tabs
                    value={SelectedTab}
                    onChange={handleChange}
                    // indicatorColor="primary"
                    // textColor="#55b1ff"
                    centered
                >
                    {/* <Route path="/News" exact={true} component={News} /> */}

                    <Tab label="Profile" style={{ outline: "none" }} />
                    {/* <Tab label="Products" style={{ outline: "none" }} />  */}
                </Tabs>
            </div>
            {SelectedTab === 0 && <BrandProfile />}
          {/* {SelectedTab === 1 && <ProductsPage />} */}
        </>
    );
}

export default CenteredTabs;
