import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import {UpcomingMovies} from "../types/interfaces";
import {ListedMovie} from "../types/interfaces";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import { keepPreviousData,useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist'


const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const UpcomingMoviesPage = () => {
  //const { data, error, isLoading, isError } = useQuery<UpcomingMovies, Error>("upcoming", getUpcomingMovies);
  const [page, setPage] = React.useState(1)
  
  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
  useQuery({
    queryKey: ['upcoming', page],
    queryFn: () => getUpcomingMovies(page),
    placeholderData: keepPreviousData,
  })
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering]
  );

  if (isFetching) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }


  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const movies = data ? data.results : [];
  const displayedMovies = filterFunction(movies);


  
  return (
    <>
      <div>
    {isPending ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error}</div>
      ) : (
        <div>
      <PageTemplate
        title="Upcoming Movies"
        movies={displayedMovies}
        action={(movie: ListedMovie) => {
          return <AddToPlaylistIcon {...movie} />
        }}
      />
      </div>
      )}
      <span>Current Page: {page}</span>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 1}
      >
        Previous Page
      </button>{' '}
      <button
        onClick={() => {
          //if (!isPlaceholderData && data.hasMore) {
            setPage((old) => old + 1)
         // }
        }}
        // Disable the Next Page button until we know a next page is available
        disabled={page ===data?.total_pages}
      >
        Next Page
      </button>
      {isFetching ? <span> Loading...</span> : null}{' '}
      
    </div>
      
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};
export default UpcomingMoviesPage;