import React, { useContext, useState, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./styles";
import {  TVShowSearch } from "../../types/interfaces";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const SearchFormTVShow: React.FC = () => {
  const defaultValues = {
    defaultValues: {
      tvShowName: "",
     
    }
  };

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TVShowSearch>(defaultValues);

  const navigate = useNavigate();

 
  



  const onSubmit: SubmitHandler<TVShowSearch> = (query) => {
  
    const query_string = query.tvShowName;
    console.log("query string var is");
    console.log(query);
    navigate(`/tvShows/search/${query_string}/results`);
    
    //navigate(`/tvShows`);
   
  };

  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Box component="div" sx={styles.root}>
      <Typography component="h2" variant="h3">
        Search for TV Show
      </Typography>

      <form style={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="tvShowName"
          control={control}
          rules={{ required: "TV Show name is required" }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              sx={{ width: "40ch" }}
              variant="outlined"
              margin="normal"
              required
              onChange={onChange}
              value={value}
              id="query"
              label="TV Show Name"
              autoFocus
            />
          )}
        />
        {errors.tvShowName && (
          <Typography variant="h6" component="p">
            {errors.tvShowName.message}
          </Typography>
        )}
        
      

        <Box >
          <Button
          
            type="submit"
            variant="contained"
            color="primary"
            sx={styles.submit}
          >
            Submit
          </Button>
          <Button
            type="reset"
            variant="contained"
            color="secondary"
            sx={styles.submit}
            onClick={() => {
              reset({
                tvShowName: "",
               
              });
            }}
          >
            Reset
          </Button>
        </Box>
      </form>
    </Box>
    </ThemeProvider>
  );
};

export default SearchFormTVShow;