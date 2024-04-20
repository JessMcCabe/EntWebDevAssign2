import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import TVShowList from "../tvShowList";
import {  TVShowListPageTemplateProps} from "../../types/interfaces";

const styles = {
  root: { 
    backgroundColor: "#000000",
  }
};

const TVShowListPageTemplate: React.FC<TVShowListPageTemplateProps> = (props)=> {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={props.title} />
      </Grid>
      <Grid item container spacing={5} >
      <TVShowList action={props.action} tvShow={props.tvShows} />
      </Grid>
    </Grid>
  );
}
export default TVShowListPageTemplate;