import React  from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./styles";
import { MovieSearch } from "../../types/interfaces";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const SearchFormMovies: React.FC = () => {
  const defaultValues = {
    defaultValues: {
      movieName: "",
     
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
  } = useForm<MovieSearch>(defaultValues);

  const navigate = useNavigate();

 
  



  const onSubmit: SubmitHandler<MovieSearch> = (query) => {
    const query_string = query.movieName
    console.log("query string var is");
    console.log(query);
    navigate(`/movies/search/${query_string}/results`);
  };

  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Box component="div" sx={styles.root}>
      <Typography component="h2" variant="h3">
        Search for Movie
      </Typography>

      <form style={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="movieName"
          control={control}
          rules={{ required: "Movie name is required" }}
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
              label="Movie Name"
              autoFocus
            />
          )}
        />
        {errors.movieName && (
          <Typography variant="h6" component="p">
            {errors.movieName.message}
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
                movieName: "",
               
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

export default SearchFormMovies;