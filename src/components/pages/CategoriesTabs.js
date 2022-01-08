import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { BiCar } from "react-icons/bi";
import { Button, Input } from "@material-ui/core";
import { VscVm  } from "react-icons/vsc";
import { BiRestaurant, BiHomeSmile} from "react-icons/bi";
import { FaBlackTie } from "react-icons/fa";

export default function ScrollableTabsButtonAuto() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <div 
       className="MenuContainer"

       >
    <Box sx={{ maxWidth:440, bgcolor: 'background.paper' ,
    }}
    className="MenuBox"
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        aria-label="scrollable auto tabs example"
        TabIndicatorProps={{style: {backgroundColor: "white"}}}
      >
       
       <Tab icon={<BiRestaurant style={{fontSize:'20px'}} />} 
        label="Food" 
        />

        <Tab label="Vehicles" 
        icon={<BiCar style={{fontSize:'20px'}} /> }
        /> 
 
        <Tab label="Real Estates" icon={<BiHomeSmile  style={{fontSize:'20px'}} />} />
        <Tab label="Electronics" icon={<VscVm  style={{fontSize:'20px'}} /> }/> 
        
        {/* <Tab label="Furniture" /> */}
        <Tab label="men's clothing" icon={<FaBlackTie style={{fontSize:'20px'}} />}/>
      </Tabs>
     
    </Box>
    </div>
  );
}
