import React from "react";
import { Review } from "../../types/interfaces";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const MovieReview: React.FC<Review> =  (props) => {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <p>Review By: {props.author} </p>
      <p>{props.content} </p>
      </ThemeProvider>
    </>
  );
};
export default MovieReview