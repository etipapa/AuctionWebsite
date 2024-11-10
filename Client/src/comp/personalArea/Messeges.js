import React, { useState } from 'react'
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import MailCome from './MailCome';
import MailGo from './MailGo';


function Messeges() {

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider',display:'flex',justifyContent:'space-evenly' }}>
          <TabList sx={{width:'100%',display:'flex',justifyContent:'center'}} onChange={handleChange} aria-label="lab API tabs example">
            <Tab sx={{width:'100%'}} label={true &&<p> <h4>הודעות נכנסות</h4> <Badge  color="primary">
              <MailIcon color="action" />
            </Badge></p>} value="1" />
            <Tab  sx={{width:'100%'}} label={true &&<p> <h4>הודעות יוצאות</h4> <Badge  color="primary">
              <MailIcon color="action" />
            </Badge></p>} value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><MailCome></MailCome></TabPanel>
        <TabPanel value="2"><MailGo></MailGo></TabPanel>
      </TabContext>
    </Box>
  )
}

export default Messeges