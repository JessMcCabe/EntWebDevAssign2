import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { TVShowT } from "../../types/interfaces";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import TVShowReviews from '../tvShowReviews'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';



const styles = {
    chipSet: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: 1.5,
        margin: 0,
    },
    chipLabel: {
        margin: 0.5,
    },
    fab: { 
      position: "fixed",
      top: 50,
      right: 2,
    },
};
const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

const TVShowDetails: React.FC<TVShowT> = (props) => {
  const tvShow=props;
  const [drawerOpen, setDrawerOpen] = useState(false); // New

    return (
        <>
          <ThemeProvider theme={darkTheme}>
      <CssBaseline />
            <Typography variant="h5" component="h3">
                Overview
            </Typography>

            <Typography variant="body1" component="p">
                {tvShow.overview}
            </Typography>

            <Paper component="ul" sx={styles.chipSet}>
                <li>
                    <Chip label="Genres" sx={styles.chipLabel} color="primary" />
                </li>
                {tvShow.genres.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} />
                    </li>
                ))}
            </Paper>
            <Paper component="ul" sx={styles.chipSet}>
                
                <Chip
                    icon={<StarRate />}
                    label={`${tvShow.vote_average} (${tvShow.vote_count}`}
                />
                <Chip label={`Released: ${tvShow.first_air_date}`} />
            </Paper>
            <Typography variant="h5" component="h3">
            <Link href={`/tvShows/${tvShow.id}/similar`}>View Shows similar to {tvShow.name}</Link>
            </Typography>
            </ThemeProvider>
            <Fab    
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={styles.fab}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <TVShowReviews {...tvShow} />
      </Drawer>
        </>
    );
};
export default TVShowDetails;