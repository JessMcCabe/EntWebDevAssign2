
import type { Meta } from '@storybook/react';
import MovieListPeople from "../components/movieListPeople";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";

import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import Grid from "@mui/material/Grid";
import MoviesContextProvider from "../contexts/moviesContext";


const meta = {
  title: "People/MovieListPerson",
  component: MovieListPeople,
  decorators: [
      (Story) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
      (Story) => <MoviesContextProvider><Story /></MoviesContextProvider>,
    ],
    
} satisfies Meta<typeof MovieListPeople>;
export default meta;


export const Basic = () => {
  const movies = [
    { ...SampleMovie, id: 1 },
    { ...SampleMovie, id: 2 },
    { ...SampleMovie, id: 3 },
    { ...SampleMovie, id: 4 },
    { ...SampleMovie, id: 5 },
  ];
  return (
    <Grid container spacing={5} columns={16}>
  
      <MovieListPeople
        movies={movies}
        action={(movie) => <AddToFavouritesIcon {...movie} />}
      />
    </Grid>
  );
};
Basic.storyName = "Default";


