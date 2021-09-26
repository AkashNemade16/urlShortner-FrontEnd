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
    fabClasses
} from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';


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
    const authState = useSelector(state => state.auth)
    const userUrls = useSelector(state => state.userUrl)
    const [data, setData] = useState([]);

    useEffect(() => {
        if (authState.isAuthenticated) {
            setData(userUrls.userUrls)
            console.log(data)
        } else {
            setData([])
                }
    }, [])
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

