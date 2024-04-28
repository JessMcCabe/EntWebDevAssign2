import React from "react";
import PageTemplate from "../components/templatePeopleListPage";
import { getCastOfMovie,getMovie } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import PersonFilterUI, {
  nameFilter
  
} from "../components/peopleFilterUI";
import { DiscoverCredits, ListedMovie } from "../types/interfaces";
import { BasePerson } from "../types/interfaces";
import { useQuery } from "react-query";
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
  
  const { data, error, isLoading, isError } = useQuery<DiscoverCredits, Error>(["movieCast", id],
  ()=> getCastOfMovie(id||""));
  const { data :movieData, error: movieError, isLoading: movieIsLoading, isError:movieIsError } = useQuery<ListedMovie, Error>(["movieCastDetails", id],
()=> getMovie(id||"")
);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [nameFiltering]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  
  if (movieIsLoading) {
    return <Spinner />;
  }

  if (movieIsError) {
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
      <PageTemplate
        title={movie_heading}
        people={displayedPeople}
        action={(people: BasePerson) => {
          return <AddToFavouritesIcon {...people} />
        }}
      />
      <PersonFilterUI
        onFilterValuesChange={changeFilterValues}
        nameFilter={filterValues[0].value}
        
      />
    </>
  );
};
export default MovieCastPage;