import * as React from 'react';
import { ListItemIcon, Box, MenuItem, Button, Menu } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import {
    FacebookShareButton,
    WhatsappShareButton,
    EmailShareButton,
    WhatsappIcon,
    EmailIcon,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon
} from 'react-share';
import { useSelector } from "react-redux";
import { Typography } from '@mui/material';

export default function BasicMenu() {
    const urls = useSelector((state) => state.ur.urls);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box >
            <Button
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant='contained'
                endIcon={<FontAwesomeIcon icon={faCaretDown} />}
            >
                Share
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem >
                    <FacebookShareButton url={urls[0] ? urls[0].shortenedUrl : null}>
                        <ListItemIcon >
                            <Box display='flex' flexDirection='row'>
                                <Box>
                                    <FacebookIcon round={true} size={30} />
                                </Box>
                                <Box pb={1} pl={1}>
                                    <Typography>Facebook</Typography>
                                </Box>
                            </Box>
                        </ListItemIcon>
                    </FacebookShareButton>
                </MenuItem>

                <MenuItem>
                    <WhatsappShareButton url={urls[0] ? urls[0].shortenedUrl : null}>
                        <ListItemIcon>
                            <Box display='flex' flexDirection='row'>
                                <Box>
                                    <WhatsappIcon round={true} size={30} />
                                </Box>
                                <Box pb={1} pl={1}>
                                    <Typography>WhatsApp</Typography>
                                </Box>
                            </Box>
                        </ListItemIcon>        
                    </WhatsappShareButton>
                </MenuItem>

                <MenuItem>
                    <EmailShareButton url={urls[0] ? urls[0].shortenedUrl : null}>
                        <ListItemIcon>
                            <Box display='flex' flexDirection='row'>
                                <Box>
                                    <EmailIcon round={true} size={30} />
                                </Box>
                                <Box pb={1} pl={1}>
                                    <Typography>Email</Typography>
                                </Box>
                            </Box>
                        </ListItemIcon>
                    </EmailShareButton>
                </MenuItem>

            
                <MenuItem>
                    <TwitterShareButton url={urls[0] ? urls[0].shortenedUrl : null}>
                        <ListItemIcon>
                            <Box display='flex' flexDirection='row'>
                                <Box>
                                    <TwitterIcon round={true} size={30} />
                                </Box>
                                <Box pb={1} pl={1}>
                                    <Typography>Twitter</Typography>
                                </Box>
                            </Box>
                        </ListItemIcon>
                    </TwitterShareButton>
                </MenuItem>


                <MenuItem>
                    <LinkedinShareButton url={urls[0] ? urls[0].shortenedUrl : null}>
                        <ListItemIcon>
                            <Box display='flex' flexDirection='row'>
                                <Box>
                                    <LinkedinIcon round={true} size={30} />
                                </Box>
                                <Box pb={1} pl={1}>
                                    <Typography>LinkedIn</Typography>
                                </Box>
                            </Box>
                        </ListItemIcon>
                    </LinkedinShareButton>
                </MenuItem>
            </Menu>
        </Box>
    );
}