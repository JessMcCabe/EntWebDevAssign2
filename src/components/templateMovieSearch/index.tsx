import React from "react";
import Header from "../headerMovieSearch";
import Grid from "@mui/material/Grid";
import SearchMovies from "../searchMovies";



const styles = {
  root: { 
    backgroundColor: "#00000",
  }
};

interface TemplateMovieSearchProps {
    
    children: React.ReactElement;
}
const MovieSearchPageTemplate: React.FC<TemplateMovieSearchProps> = ()=> {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      
      <SearchMovies></SearchMovies>

    </Grid>
  );
}
export default MovieSearchPageTemplate;