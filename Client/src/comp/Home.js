import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CardMedia } from '@mui/material';


const images = [
  {
    url: process.env.PUBLIC_URL + '49.jpg',
    title: 'כלי נגינה',
    number: 1,
    width: '30%',
  },
  {
    url: process.env.PUBLIC_URL + '20.jpg',
    title: 'יודאיקה',
    width: '30%',
  },
  {
    url: process.env.PUBLIC_URL + '40.jpg',
    title: 'כלי אוכל',
    width: '30%',
  },
  {
    url: process.env.PUBLIC_URL + '43.png',
    title: 'מגילות וכתבי יד ',
    width: '30%',
  },
  {
    // url:process.env.PUBLIC_URL + '61.webp',
    url: process.env.PUBLIC_URL + '60.jpg',

    title: 'תכשיטים',
    width: '30%',
  },
  {
    url: process.env.PUBLIC_URL + '65.jpg',
    title: ' מטבעות',
    width: '30%',
  }
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));


function Home() {
  // const categories = useSelector(state => state.category.categories)
  //   const images =categories.map(()=>{return
  //       {
  //         url: process.env.PUBLIC_URL + '20.jpg',
  //         title: 'כלי נגינה',
  //         number:1,
  //         width: '30%',
  //       },
  //  }) 

  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', minWidth: 300, width: '100%' }}>
        {images.map((image) => (
          <ImageButton onClick={() => { navigate('/productList') }}
            focusRipple
            key={image.title}
            style={{
              width: image.width, margin: '1%'
            }}
          >
            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={{
                  position: 'relative',
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}
              >
                {image.title}
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </ImageButton>
        ))}
      </Box>
      <img style={{width:'40vh'}} src={process.env.PUBLIC_URL + 'logo1.png'}></img>
      {/* <CardMedia 
        src={process.env.PUBLIC_URL + 'logo1.png'}
        sx={{objectFit: 'contain',
       height:"50px",
       width:'50px',
        Padding: '10px'
      }}
      ></CardMedia> */}
      <Box></Box>
    </>
  )
}
export default Home
//hookform