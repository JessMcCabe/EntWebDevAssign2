import React from "react"; // replace existing react import
import PageTemplate from "../components/templateMovieListPersonPage";
import { getMoviesForPerson,getPerson } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import { DiscoverPersonMovies, PersonT } from "../types/interfaces";
import { ListedMovie } from "../types/interfaces";
import { useQuery } from "react-query";
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
  
  const { data, error, isLoading, isError } = useQuery<DiscoverPersonMovies, Error>(["moviePerson", id],
  ()=> getMoviesForPerson(id||"")
);
const { data :personData, error: personError, isLoading: personIsLoading, isError:personIsError } = useQuery<PersonT, Error>(["personDetails", id],
()=> getPerson(id||"")
);
const { filterValues, setFilterValues, filterFunction } = useFiltering(
  [],
  [titleFiltering, genreFiltering]
);
  
  if (personIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (personIsError) {
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
      <PageTemplate
        title={name }
        movies={displayedMovies}
        action={(movie: ListedMovie) => {
          return <AddToFavouritesIcon {...movie} />
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
export default PersonMoviesPage;