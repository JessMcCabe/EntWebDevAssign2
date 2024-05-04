import React, { ChangeEvent } from "react";
import { FilterOption } from "../../types/interfaces"
import { SelectChangeEvent } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import { getGenres } from "../../api/tmdb-api";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { keepPreviousData,useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'
import { GenreData } from "../../types/interfaces";

const styles = {
  root: {
    maxWidth: 345,
  },
  media: { height: 300 },
 
  formControl: {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
  },
};

interface FilterMoviesCardProps {
  onUserInput: (f: FilterOption, s: string)  => void; 
  titleFilter: string;
  genreFilter: string;
}
const FilterMoviesCard: React.FC<FilterMoviesCardProps> = (props) => {
  //const { data, error, isLoading, isError } = useQuery<GenreData, Error>("genres", getGenres);

  const {  isError, error, data, isFetching } =
  useQuery({
    queryKey: ['genres'],
    queryFn: () => getGenres(),
    placeholderData: keepPreviousData,
  })

  if (isFetching) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }
  const genres = data?.genres || [];
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e: SelectChangeEvent, type: FilterOption, value: string) => {
    e.preventDefault()
    props.onUserInput(type, value)
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e, "title", e.target.value)
  }

  const handleGenreChange = (e: SelectChangeEvent) => {
    handleChange(e, "genre", e.target.value)
  };

  return (
    <>
    <Card sx={styles.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <FilterAltIcon fontSize="large" />
          Filter the movies.
        </Typography>
        <TextField
      sx={styles.formControl}
      id="filled-search"
      label="Search field"
      type="search"
      value={props.titleFilter}
      variant="filled"
      onChange={handleTextChange}
    />
        <FormControl sx={styles.formControl}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
      labelId="genre-label"
      id="genre-select"
      value={props.genreFilter}
      onChange={handleGenreChange}
    >
            {genres.map((genre :GenreData) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </CardContent>
    </Card>
    <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <SortIcon fontSize="large" />
            Sort the movies.
          </Typography>
        </CardContent>
      </Card>
      </>
  );
}

export default FilterMoviesCard;