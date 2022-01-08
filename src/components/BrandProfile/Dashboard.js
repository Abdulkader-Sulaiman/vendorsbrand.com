import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Profile_Page from './Profile_Page';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }} >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}
       style={{backgroundColor: 'white'}}
      >
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
        centered
        className="header"
        >
          <Tab label="store products" {...a11yProps(0)} />
          <Tab label="store profile" {...a11yProps(1)} />
          <Tab label="media" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        {/* Item Two */}
        <Profile_Page />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item One
      </TabPanel>
     
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
    
  );
}