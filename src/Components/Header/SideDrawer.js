import {
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,

  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Menu } from "@material-ui/icons";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../actions/authActions";

const useStyles = makeStyles({
  list: {
    width: '250px',
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `black`,
  },
  button: {
    marginTop: '2px',
    marginBottom: '3px',
    marginLeft: '100px',
    // paddingTop: 10,
    fontSize: '15px',
  },
});

const SideDrawer = ({ navLinks }) => {
  const classes = useStyles();
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let history = useHistory();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  const handleMyurls = (e) => {
    e.preventDefault();
    history.push("/myurls");
  };

  const handleHome = (e) => {
    e.preventDefault();
    history.push("/");
  };
  const [state, setState] = useState({ right: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ [anchor]: open });
  };

  const sideDrawerList = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List component="nav">
        <ListItem button>
          <Button onClick={handleHome} color="inherit">
            Home
          </Button>
        </ListItem>
        <ListItem button>
          <Button onClick={handleMyurls} color="inherit">
            MyUrls
          </Button>
        </ListItem>

        {authState.isAuthenticated ? (
          <ListItem button>
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          </ListItem>
        ) : (
          <ListItem button>
            <Button href="/login" color="inherit">
              SignIn
            </Button>
          </ListItem>
        )}
        <ListItem button>
          <Button href="/register" color="inherit">
            SignUp
          </Button>
        </ListItem>
      </List>
    </div>
  );

  return (
    <React.Fragment>
      {/* <Link href="/"> */}
      <Typography color="white" variant="h3">
        TinyUrl
      </Typography>
      {/* </Link> */}
      <IconButton
        edge="start"
        aria-label="menu"
        onClick={toggleDrawer("left", true)}
      >
        <Menu fontSize="large" style={{ color: `white` }} />
      </IconButton>

      <Drawer
        anchor="left"
        open={state.left}
        onOpen={toggleDrawer("left", true)}
        onClose={toggleDrawer("left", false)}
      >
        {sideDrawerList("left")}
      </Drawer>
    </React.Fragment>
  );
};

export default SideDrawer;
