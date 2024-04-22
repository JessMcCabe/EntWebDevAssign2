import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { PersonT } from "../../types/interfaces";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";


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

const PersonDetails: React.FC<PersonT> = (props) => {
  const person=props;
  

    return (
        <>
            <Typography variant="h5" component="h3">
                About
            </Typography>

            <Typography variant="h6" component="p">
                {person.name}
            </Typography>

           
            <Paper component="ul" sx={styles.chipSet}>
                
                <Chip
                    icon={<StarRate />}
                    label={`${person.popularity} `}
                />
                <Chip label={`D.O.B: ${person.birthday}`} />
            </Paper>
            
    
        </>
    );
};
export default PersonDetails;