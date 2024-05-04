import React from "react"; // replace existing react import
import PageTemplate from "../components/templateMovieListPersonPage";
import { getMoviesForPerson,getPerson } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import {  PersonT } from "../types/interfaces";
import { ListedMovie } from "../types/interfaces";
import { keepPreviousData,useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
import { useParams } from "react-router-dom";

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

const PersonMoviesPage:  React.FC = () => {
  const { id } = useParams();
  
  /*const { data, error, isLoading, isError } = useQuery<DiscoverPersonMovies, Error>(["moviePerson", id],
  ()=> getMoviesForPerson(id||"")
);
const { data :personData, error: personError, isLoading: personIsLoading, isError:personIsError } = useQuery<PersonT, Error>(["personDetails", id],
()=> getPerson(id||"")
);*/

const [page, setPage] = React.useState(1)


const { isPending, isError, error, data, isFetching } =
  useQuery({
    queryKey: ['moviePerson', page],
    queryFn: () => getMoviesForPerson(id||"",page),
    placeholderData: keepPreviousData,
  })



  const {  isError: isPersonError, error : personError, data :personData, isFetching: personIsFetching } =
  useQuery({
    queryKey: ['personDetails'],
    queryFn: () => getPerson(id||""),
    
  })


const { filterValues, setFilterValues, filterFunction } = useFiltering(

  [titleFiltering, genreFiltering]
);
  
  if (personIsFetching) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if (isFetching) {
    return <Spinner />;
  }

  if (isPersonError) {
    return <h1>{personError.message}</h1>;
  }


  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const movies = data ? data.cast : [];
 
  const displayedMovies = filterFunction(movies);
  const person = personData as PersonT
  console.log("person data below")
  const name =`Movies starring ${person.name}`
console.log(person.name)
  
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
        title={name }
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
export default PersonMoviesPage;