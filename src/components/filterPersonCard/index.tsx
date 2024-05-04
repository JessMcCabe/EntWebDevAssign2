import React, {   ChangeEvent } from "react";
import { FilterOptionPerson } from "../../types/interfaces"
import { SelectChangeEvent } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
//import InputLabel from "@mui/material/InputLabel";
//import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import { getActors } from "../../api/tmdb-api";

//import FormControl from "@mui/material/FormControl";
//import Select from "@mui/material/Select";
import { keepPreviousData,useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'

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

interface FilterPersonCardProps {
  onUserInput: (f: FilterOptionPerson, s: string)  => void; 
  nameFilter: string;
  //genderFilter: string;
}
const FilterPersonCard: React.FC<FilterPersonCardProps> = (props) => {
  //const { data, error, isLoading, isError } = useQuery<DiscoverPeople, Error>("people", getActors);
  const [page, /*setPage*/] = React.useState(1)
  const {  isError, error,  isFetching,  } =
  useQuery({
    queryKey: ['people',page],
    queryFn: () => getActors(page),
    placeholderData: keepPreviousData,
  })
  if (isFetching) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }
  

  const handleChange = (e: SelectChangeEvent, type: FilterOptionPerson, value: string) => {
    e.preventDefault()
    props.onUserInput(type, value)
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e, "name", e.target.value)
  }

 

  return (
    <>
    <Card sx={styles.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <FilterAltIcon fontSize="large" />
          Filter People.
        </Typography>
        <TextField
      sx={styles.formControl}
      id="filled-search"
      label="Search field"
      type="search"
      value={props.nameFilter}
      variant="filled"
      onChange={handleTextChange}
    />
 
      </CardContent>
    </Card>
    <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <SortIcon fontSize="large" />
            Sort People.
          </Typography>
        </CardContent>
      </Card>
      </>
  );
}

export default FilterPersonCard;