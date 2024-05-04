import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
//import { DiscoverMovies } from "../types/interfaces";
import { ListedMovie } from "../types/interfaces";
import { keepPreviousData,useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'


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

const HomePage = () => {
  //const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>("discover", getMovies);
  const [page, setPage] = React.useState(1)
  
  const { isPending, isError, error, data, isFetching } =
  useQuery({
    queryKey: ['discover', page],
    queryFn: () => getMovies(page),
    placeholderData: keepPreviousData,
  })
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
 
    [titleFiltering, genreFiltering]
  );

  console.log("My page is set to" );

  console.log(page );

  if (isPending) {
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
        title="Discover Movies"
        movies={displayedMovies}
        action={(movie: ListedMovie) => {
          return <AddToFavouritesIcon {...movie} />
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
export default HomePage;