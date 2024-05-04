import React from "react";
import PageTemplate from "../components/templatePeopleListPage";
import { getCastOfMovie,getMovie } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import PersonFilterUI, {
  nameFilter
  
} from "../components/peopleFilterUI";
import {  ListedMovie } from "../types/interfaces";
import { BasePerson } from "../types/interfaces";
import { keepPreviousData,useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavouritePerson'
import { useParams } from "react-router-dom";

const nameFiltering = {
  name: "name",
  value: "",
  condition: nameFilter,
};


const MovieCastPage:  React.FC = () => {
  const { id } = useParams();
  
  /*const { data, error, isLoading, isError } = useQuery<DiscoverCredits, Error>(["movieCast", id],
  ()=> getCastOfMovie(id||""));
  const { data :movieData, error: movieError, isLoading: movieIsLoading, isError:movieIsError } = useQuery<ListedMovie, Error>(["movieCastDetails", id],
()=> getMovie(id||"")
);*/


const [page, setPage] = React.useState(1)


const { isPending, isError, error, data, isFetching } =
  useQuery({
    queryKey: ['movieCast', page],
    queryFn: () => getCastOfMovie(id||"",page),
    placeholderData: keepPreviousData,
  })



  const {  isError: isMovieError, error : movieError, data :movieData, isFetching: movieIsFetching} =
  useQuery({
    queryKey: ['movieCastDetails'],
    queryFn: () => getMovie(id||""),
    
  })

  const { filterValues, setFilterValues, filterFunction } = useFiltering(

    [nameFiltering]
  );

  if (isFetching) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  
  if (movieIsFetching) {
    return <Spinner />;
  }

  if (isMovieError) {
    return <h1>{movieError.message}</h1>;
  }

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "name"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const people = data ? data.cast : [];
  const displayedPeople = filterFunction(people);
  const movie = movieData as ListedMovie
  const movie_heading =`Cast of ${movie.title}`
  
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
        title={movie_heading}
        people={displayedPeople}
        action={(people: BasePerson) => {
          return <AddToFavouritesIcon {...people} />
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
      <PersonFilterUI
        onFilterValuesChange={changeFilterValues}
        nameFilter={filterValues[0].value}
        
      />
    </>
  );
};
export default MovieCastPage;