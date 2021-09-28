import React, { useEffect, useState } from 'react'
import {
    Typography,
    Paper,
    Link,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { useSelector,useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { clearData } from './../../actions/urlActions';


const useStyles = makeStyles({
    padding:{
        paddingTop:'20px'
    }
});
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
   
}));


const MyUrls = () => {
    const dispatch = useDispatch()
    const authState = useSelector(state => state.auth)
    const userUrls = useSelector(state => state.userUrl.userUrls)
    const [data, setData] = useState([]);
    console.log(data)
    useEffect(() => {
        if (authState.isAuthenticated) {
            setData(userUrls)
            console.log(data)
            // if (localStorage.getItem("my-list") === null){
            //     localStorage.setItem("my-list", JSON.stringify(userUrls))
            // }
            // setData(localStorage.getItem('my-list'))
        } else {
            dispatch(clearData(userUrls))
                }
    }, [authState.isAuthenticated,authState.token])
    
const classes = useStyles()
    return (
        <Container>

            {authState.isAuthenticated && data[0] ? <div className={classes.padding}><TableContainer component={Paper}>
                <Table sx={{ minWidth: 200 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align='center'>ShortenedUrl</StyledTableCell>
                            <StyledTableCell align="center">Clicks</StyledTableCell>
                            <StyledTableCell align="center">User</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data[0].map((i, j) => (
                            <StyledTableRow key={j}>
                                <StyledTableCell align="center"><Link href={i.shortenedUrl}>{i.shortenedUrl}</Link></StyledTableCell>
                                <StyledTableCell align="center">{i.clicks}</StyledTableCell>
                                <StyledTableCell align="center">{i.ownedBy}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer></div> : <Typography variant='h5'><Link href='/login'>Please Log In</Link></Typography>}
        </Container>

    )
}

export default MyUrls

