import React, { useState, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { NavLink } from 'react-router-dom'

const styles = {
  title: {
    flexGrow: 1,
  },
  appbar: {
    // background: 'none',
  },
  // offset: theme.mixins.toolbar,
};


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement|null>(null);
  const open = Boolean(anchorEl);
  const theme =darkTheme
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Upcoming Movies", path: "/movies/upcoming" },
    { label: "Favorites", path: "/movies/favourites" },
    { label: "My PlayList", path: "/movies/playlist" },
    { label: "Option 4", path: "/" },
  ];

  const handleMenuSelect = (pageURL: string) => {
    navigate(pageURL);
  };

  const handleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };


  
  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <AppBar sx={styles.appbar} position="fixed" elevation={10} color="primary">
        <Toolbar>
          <Typography variant="body1" sx={styles.title}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={styles.title}>
            Welcome to the home of YOUR Movies!
          </Typography>
          <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Movies
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
        <MenuItem onClick={handleClose} >
              <NavLink to="/"style={{color: 'white', textDecoration: 'none'}}>Movies Home </NavLink>
         </MenuItem>
        <MenuItem onClick={handleClose} >
              <NavLink to="/movies/upcoming"style={{color: 'white', textDecoration: 'none'}}>Upcoming Movies </NavLink>
         </MenuItem>
         <MenuItem onClick={handleClose} >
              <NavLink to="/movies/favourites"style={{color: 'white', textDecoration: 'none'}}>Favourite Movies </NavLink>
         </MenuItem>
      </Menu>
    </div>
        </Toolbar>
      </AppBar>
     <Offset/>

      {/* <div className={classes.offset} /> */}
      </ThemeProvider>
    </>
   
  );
};

export default SiteHeader;