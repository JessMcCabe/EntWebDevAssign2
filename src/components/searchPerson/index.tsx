import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./styles";
import {  PersonSearch } from "../../types/interfaces";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const SearchFormPerson: React.FC = () => {
  const defaultValues = {
    defaultValues: {
      personName: "",
     
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
  } = useForm<PersonSearch>(defaultValues);

  const navigate = useNavigate();

 
  



  const onSubmit: SubmitHandler<PersonSearch> = (query) => {
  
    const query_string = query.personName;
    console.log("query string var is");
    console.log(query);
    navigate(`/people/search/${query_string}/results`);
    
 
   
  };

  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Box component="div" sx={styles.root}>
      <Typography component="h2" variant="h3">
        Search for Person
      </Typography>

      <form style={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="personName"
          control={control}
          rules={{ required: "Name is required" }}
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
              label="Name"
              autoFocus
            />
          )}
        />
        {errors.personName && (
          <Typography variant="h6" component="p">
            {errors.personName.message}
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
                personName: "",
               
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

export default SearchFormPerson;