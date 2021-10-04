import React, { useEffect, useState, useRef, memo} from 'react'
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
import { Redirect } from "react-router-dom";
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { clearData, getUserUrls } from './../../actions/urlActions';

const useStyles = makeStyles({
    padding: {
        paddingTop: '20px'
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


const MemoisedMyUrls = memo(function MyUrls(){
    const dispatch = useDispatch()
    const authState = useSelector(state => state.auth)
    const userUrls = useSelector(state => state.userUrl.userUrls)
    useEffect(() => {
        if (authState.isAuthenticated && authState.user !== null) {
            dispatch(getUserUrls(authState.user.email))
        } else {
            dispatch(clearData(userUrls))
        }
    }, [authState.isAuthenticated, userUrls])



    const classes = useStyles()
    return (
     
        <Container>

            {authState.isAuthenticated && userUrls[0] ? <div className={classes.padding}><TableContainer component={Paper}>
                <Table sx={{ minWidth: 200 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align='center'>ShortenedUrl</StyledTableCell>
                            <StyledTableCell align="center">Clicks</StyledTableCell>
                            <StyledTableCell align="center">User</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userUrls[0].map((i, j) => (
                            <StyledTableRow key={j}>
                                <StyledTableCell align="center"><Link href={i.shortenedUrl}>{i.shortenedUrl}</Link></StyledTableCell>
                                <StyledTableCell align="center">{i.clicks}</StyledTableCell>
                                <StyledTableCell align="center">{i.ownedBy}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer></div> : <Redirect to='/login'/>}
        </Container>

    )
})

export default MemoisedMyUrls;

