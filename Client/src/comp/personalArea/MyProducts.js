import { useParams } from 'react-router-dom';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { Box, Button, CardMedia } from '@mui/material'
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById, putProductsIWant, putProductsToSale } from './../slices/userSlice'
import { CheckBox } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import OpenProduct from './OpenProduct';
import moment from 'moment';
//import {jwtDecode} from 'jwt-decode';



function MyProducts(props) {
    const productsIWant = useSelector(state => state.user.productsIWant)
    const productsToSale = useSelector(state => state.user.productsToSale);
    const products = useSelector(state => state.products.products);
    const statusUser = useSelector(state => state.user.status);
    const statusProducts = useSelector(state => state.products.status)
    const statusProductsIWant = useSelector(state => state.user.statusProductsIWant);
    const statusProductsIToSale = useSelector(state => state.user.statusProductsIToSale);
    const [goodProductsToSale, setGoodProductsToSale] = React.useState();
    const [myProducts, setMyProducts] = React.useState();
    const dispatch = useDispatch()
    const index = props.index;
    const [idOpen, setIdOpen] = React.useState(0);
    const [openProduct, setOpenProduct] = React.useState(false)
    // const myProducts=index===3?productsIWant:productsToSale
    console.log(index);
    console.log("tosale", productsToSale)
    console.log("bids", productsIWant)
    const openMe = (id) => {
        setOpenProduct(false)
        setOpenProduct(true)
        setIdOpen(id)
    }
    React.useEffect(() => {
        if (statusProducts === 'fulfilled' && statusUser === 'sign') {
            if (statusProductsIWant === 'before') {
                dispatch(putProductsIWant(products))
                dispatch(putProductsToSale(products))
                console.log("bids", productsIWant)

            }
            if (statusProductsIToSale === 'before') {
                dispatch(putProductsToSale(products))
                console.log("tosale", productsToSale)
            }
        }
        setMyProducts(index == 3 ? productsIWant : productsToSale)
    }, [])
    React.useEffect(() => {
        if (statusProducts === 'fulfilled' && statusUser === 'sign') {
            if (statusProductsIWant === 'before') {
                dispatch(putProductsIWant(products))
                // dispatch(putProductsToSale(products))
                console.log("bids", productsIWant)
            }
            if (statusProductsIToSale === 'before') {
                dispatch(putProductsToSale(products))
                console.log("tosale", productsToSale)
            }
        }
        setMyProducts(index == 3 ? productsIWant : productsToSale)
    }, [statusProductsIWant || statusProductsIToSale])
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row',justifyContent:'space-between',scrollBehavior:'auto'}}>
            <Box sx={{overflowY:"auto",height:'90vh'}}>
            <TableContainer sx={{ }} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">תמונה</TableCell>
                            <TableCell align="right">שם</TableCell>
                            <TableCell align="right">תאור</TableCell>
                            <TableCell align="right">תאריך סיום מכירה</TableCell>
                            <TableCell align="right">נמכר?</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {myProducts && myProducts.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <CardMedia
                                    component="img"
                                    width="100"
                                    height="100"
                                    alt={row.name}
                                    src={row.image}
                                    sx={{
                                        objectFit: 'contain',
                                        // borderRadius: '6px',
                                        width: { xs: '100%', sm: 100 }, height:"100px"
                                    }}
                                />
                                <TableCell align="right" component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell sx={{ width: "20%" }} align="right">{row.description}</TableCell>
                                {/* <TableCell align="right">{moment(row.saleEndDate).format('MMMM Do YYYY')} {new Date().getUTCDate()}</TableCell> */}
                                <TableCell align="right">{new Date(row.saleEndDate) .toLocaleDateString()}</TableCell>
                                <TableCell align="right">{row.isSold && <CheckIcon />}</TableCell>
                                <TableCell align="right"><Button onClick={()=>{openMe(row.id)}}>פרטי המכירה</Button></TableCell>

                                {/* <TableCell align="right">{row.protein}</TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer></Box>
            {openProduct && <OpenProduct sx={{width:'50%',margin:'2%'}} number={idOpen} who={index}></OpenProduct>}
        </Box>
    )
}

export default MyProducts