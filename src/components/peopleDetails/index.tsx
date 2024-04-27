import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { PersonT } from "../../types/interfaces";
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

const PersonDetails: React.FC<PersonT> = (props) => {
  const person=props;
  
    return (
        <>
             <ThemeProvider theme={darkTheme}>
      <CssBaseline />
            <Typography variant="h5" component="h3">
                About
            </Typography>

            <Typography variant="body1" component="p">
                {person.biography}
            </Typography>

            
            <Paper component="ul" sx={styles.chipSet}>
                
                <Chip
                    icon={<StarRate />}
                    label={`${person.popularity} `}
                />
                <Chip label={`D.O.B: ${person.birthday}`} />
                <Chip label={`Departments: ${person.known_for_department}`} />
            </Paper>
            <Typography variant="h5" component="h3">
            <Link href={`/people/${person.id}/tvShows`}>View Movies starring {person.name}</Link>
            </Typography>
            <Typography variant="h5" component="h3">
            <Link href={`/people/${person.id}/movies`}>View TV Shows starring {person.name}</Link>
            </Typography>

            </ThemeProvider>
    
        </>
    );
};
export default PersonDetails;