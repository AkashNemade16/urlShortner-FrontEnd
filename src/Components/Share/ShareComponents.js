import React from 'react'
import { CopyToClipboard } from "react-copy-to-clipboard";
import ClipboardIcon from 'react-clipboard-icon'
import { Button, Typography, Box, } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { 
     FacebookShareButton,
     WhatsappShareButton,
     EmailShareButton,
     WhatsappIcon,
     EmailIcon,
     FacebookIcon
    } from 'react-share'; 
const ShareComponents = () => {
    const urls = useSelector(state=>state.ur.urls);

    return (
        <Box display='flex' flexDirection='row'>
            <Box p={2}>
                <CopyToClipboard text={urls[0]?urls[0].shortenedUrl:null}>
                    <ClipboardIcon size={60}>
                        <Button onClick={(e)=>{e.preventDefault()}}>
                            Copy
                        </Button>
                    </ClipboardIcon>
                </CopyToClipboard>
            </Box>

            <Box p={2}>
                <FacebookShareButton url={urls[0] ? urls[0].shortenedUrl : null}>
                    <FacebookIcon round={true}/> 
                </FacebookShareButton>
            </Box>

            <Box p={2}>
                <EmailShareButton url={urls[0] ? urls[0].shortenedUrl : null}>
                    <EmailIcon round={true}/>
                </EmailShareButton>
            </Box>

            <Box p={2}>
                <WhatsappShareButton url={urls[0] ? urls[0].shortenedUrl : null}>
                    <WhatsappIcon round={true} />
                </WhatsappShareButton>
            </Box>
        </Box>
    )
}

export default ShareComponents
