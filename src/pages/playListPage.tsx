import React, { useContext } from "react"
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter
} from "../components/movieFilterUI";
import { MovieT } from "../types/interfaces";
import RemoveFromPlayList from "../components/cardIcons/removeFromPlayList";
import WriteReview from "../components/cardIcons/writeReview";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};

export const genreFiltering = {
  name: "genre",
  value: "0",
  condition: function (movie: MovieT, value: string) {
    // Is user selected genre in this movies's genre list? 
    // Always true if selected genre ia All (0).
    const genreId = Number(value);
    const genre_ids = movie.genres.map((g) => g.id);
    return genreId > 0 ? genre_ids.includes(genreId) : true;
  },
};

const PlayListMoviesPage: React.FC = () => {
  const { playList: movieIds } = useContext(MoviesContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
 
    [titleFiltering, genreFiltering]
  );

  // Create an array of queries and run them in parallel.
  /*const playListMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", movieId ],
        queryFn: () => getMovie(movieId.toString()),
      };
    })
  );*/


  const playListMovieQueries = useQueries({
    queries: movieIds.map((movieId) => ({
      queryKey: ['movie', movieId],
      queryFn: () => getMovie(movieId.toString()),
      staleTime: Infinity,
    })),
  })
   // Check if any of the parallel queries is still loading.
   const isLoading = playListMovieQueries.find((m) => m.isLoading === true);

   if (isLoading) {
    return <Spinner />;
  }

  const allPlayList = playListMovieQueries.map((q) => q.data);
  const displayMovies = allPlayList
  ? filterFunction(allPlayList)
  : [];

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title" ? [changedFilter, filterValues[1]] : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  return (
    <>
      <PageTemplate
        title="My PlayList Movies"
        movies={displayMovies}
        action={(movie) => {
          return (
            <>
              <RemoveFromPlayList {...movie} />
              <WriteReview {...movie} />
            </>
          );
        }}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default PlayListMoviesPage;