import React from 'react'
import { CopyToClipboard } from "react-copy-to-clipboard";
import ClipboardIcon from 'react-clipboard-icon'
import { Button, Typography, Box, Container, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
    FacebookShareButton,
    WhatsappShareButton,
    EmailShareButton,
    WhatsappIcon,
    EmailIcon,
    FacebookIcon
} from 'react-share';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    shareIcon: {
        paddingRight: "15px",
    },
    share: {
        marginLeft: "-25px",
    }
});

const ShareComponents = () => {
    const classes = useStyles()
    const urls = useSelector(state => state.ur.urls);

    return (
        // <Box display='flex' flexDirection='row'>
        <>
            <Container maxWidth="sm">
                <Typography className={classes.share} variant="h6">
                    Share
                </Typography>
                <Grid container spacing={0}>
                    <Grid item className={classes.shareIcon}>
                        <CopyToClipboard text={urls[0] ? urls[0].shortenedUrl : null}>
                            <ClipboardIcon size={60}>
                                <Button onClick={(e) => { e.preventDefault() }}>
                                    Copy
                                </Button>
                            </ClipboardIcon>
                        </CopyToClipboard>
                    </Grid>

                    <Grid item className={classes.shareIcon}>
                        <FacebookShareButton url={urls[0] ? urls[0].shortenedUrl : null}>
                            <FacebookIcon round={true} />
                        </FacebookShareButton>
                    </Grid>

                    <Grid item className={classes.shareIcon}>
                        <EmailShareButton url={urls[0] ? urls[0].shortenedUrl : null}>
                            <EmailIcon round={true} />
                        </EmailShareButton>
                    </Grid>

                    <Grid item className={classes.shareIcon}>
                        <WhatsappShareButton url={urls[0] ? urls[0].shortenedUrl : null}>
                            <WhatsappIcon round={true} />
                        </WhatsappShareButton>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default ShareComponents
