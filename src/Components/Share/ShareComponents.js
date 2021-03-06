import React from 'react'
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopy from '@mui/icons-material/ContentCopy';
import { Button,  Container, Grid ,Link, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons'
import QrCodeIcon from '@mui/icons-material/QrCode';
import BasicMenu from './shareMenu';
import QRcode from "qrcode";
import { useHistory } from 'react-router';


const ShareComponents = () => {
    
    const urls = useSelector(state => state.ur.urls);
    let history = useHistory();
    const qrCode = (e) => {
        if(urls[0]){
            console.log(QRcode.toDataURL(urls[0].shortenedUrl));
        }
        
    }

    const myUrlSubmit = (e) => {
        e.preventDefault()
        history.push("/myurls");
    }

    const shortenAnother = (e) => {
        window.location.reload()
    }
    return (

        <Box >
            <Container maxWidth="lg" >
                <Grid container flexDirection='column' >
                    <Box p={1} >
                    <Grid container spacing={1} flexDirection='row' justifyContent='space-evenly' alignItems='center' >
                        <Grid item xs>
                            <Button fullWidth component={Link} href={urls[0] ? urls[0].shortenedUrl : null} variant='contained' startIcon={<FontAwesomeIcon icon={faShare} />}>
                                Visit
                            </Button>
                        </Grid>
                        <Grid item xs>
                            <BasicMenu />
                        </Grid>
                        <Grid item xs>
                            <CopyToClipboard text={urls[0] ? urls[0].shortenedUrl : null}>

                                    <Button fullWidth variant='contained' onClick={(e) => { e.preventDefault() }} endIcon={<ContentCopy />}>
                                    Copy
                                </Button>

                            </CopyToClipboard>
                        </Grid>
                        <Grid item xs>
                                <Button fullWidth onClick={qrCode} variant='contained' endIcon={<QrCodeIcon />}>QR</Button>
                        </Grid>
                    </Grid>
                    </Box>
                    <Box p={1}>
                    <Grid container spacing={1} justifyContent='space-evenly' alignItems='center'    >
                        <Grid item xs>
                            <Button onClick={myUrlSubmit} fullWidth variant='contained'>my urls</Button>
                        </Grid>
                        <Grid item xs>
                            <Button onClick={shortenAnother} fullWidth variant='contained'>shorten another</Button>
                        </Grid>
                    </Grid>
                    </Box>
               </Grid>
                
               
            </Container>
        </Box>
    )
}

export default ShareComponents
