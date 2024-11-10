import { Box } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

function Hello() {
    const user = useSelector(state => state.user.user)

    return (
        <>
            <Box sx={{fontSize:'50px',margin:'5%',textAlign:"right",color:'#a27c07'}}>
                שלום {user.firstName}!
                <p>ברוך/ה הבא/ה לאזור האישי שלך</p>
           </Box>

        </>
    )
}

export default Hello