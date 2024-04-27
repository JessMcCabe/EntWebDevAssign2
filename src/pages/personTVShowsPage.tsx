import React from "react";
import PageTemplate from "../components/templateTVShowPeopleListPage";
import { getTVShowsForPerson,getPerson } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import TVShowFilterUI, {
  nameFilter,
  genreFilter,
} from "../components/tvShowFilterUI";
import { DiscoverPersonTVShows,PersonT } from "../types/interfaces";
import { BaseTVShow } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavouriteTVShow'
import { useParams } from "react-router-dom";

const nameFiltering = {
  name: "name",
  value: "",
  condition: nameFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const PersonTVShowsPage :  React.FC = () => {
  const { id } = useParams();
  const { data, error, isLoading, isError } = useQuery<DiscoverPersonTVShows, Error>(["tvShowPerson", id],
  ()=> getTVShowsForPerson(id||""));
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [nameFiltering, genreFiltering]
  );
  const { data :personData, error: personError, isLoading: personIsLoading, isError:personIsError } = useQuery<PersonT, Error>(["personDetailsTV", id],
()=> getPerson(id||"")
);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  if (personIsLoading) {
    return <Spinner />;
  }

  if (personIsError) {
    return <h1>{personError.message}</h1>;
  }

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "name"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const tvShows = data ? data.cast : [];
  const displayedTVShows = filterFunction(tvShows);
  const person = personData as PersonT
  const name =`TV Shows starring ${person.name}`

  
  return (
    <>
      <PageTemplate
        title={name }
        tvShows={displayedTVShows}
        action={(tvshow: BaseTVShow) => {
          return <AddToFavouritesIcon {...tvshow} />
        }}
      />
      <TVShowFilterUI
        onFilterValuesChange={changeFilterValues}
        nameFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};
export default PersonTVShowsPage;