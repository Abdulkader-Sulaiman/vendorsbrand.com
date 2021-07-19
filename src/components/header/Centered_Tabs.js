import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Media from '../BrandProfile/Products_Page';
import Home from "../pages/Home__Page";
import Home2 from "../pages/Home";
import NavbarMenu from "./Navbar";
import Market from '../pages/Vendors_Page';
import "../../css/Centered_Tabs.css";
import { HomeTwoTone } from '@ant-design/icons';
import { ShopTwoTone} from '@ant-design/icons';
import  AppBar  from '../header/AppBar'
import AutoPlaySlider from './AutoPlaySlider';
import Searchbar from '../../Products/Searchbar'


function CenteredTabs() {
  const [SelectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  
  return (
    <>
  <div className='header'>
 
 
  <NavbarMenu />
 
        <Tabs
          value={SelectedTab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor='inherit'
          centered
        >
        <Tab label={<HomeTwoTone style={{fontSize:'30px'}}/>} style={{outline: "none", fontFamily:'initial' }} />
        <Tab label={<ShopTwoTone style={{fontSize:'30px'}}/>} style={{outline: "none", fontFamily:'initial' }} />
        {/* <Tab label="Media" style={{ outline: "none" }} /> */}
        </Tabs>

        </div>
        <br />
      {/* <AutoPlaySlider /> */}
      {/* <Searchbar />   */}


      {SelectedTab === 0 && <Home2 />}
      {SelectedTab === 1 && <Market />}
      {/* {SelectedTab === 2 && <Media />} */}
 
    </>
   
  );
}

export default CenteredTabs;
