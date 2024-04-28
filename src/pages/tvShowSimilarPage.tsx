import React from "react";
import PageTemplate from "../components/templateTVShowPeopleListPage";
import { getTVShowSimilar,getTVShow } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import TVShowFilterUI, {
  nameFilter,
  genreFilter,
} from "../components/tvShowFilterUI";
import { PersonT,DiscoverSimilarVShows, TVShowReview, TVShowT } from "../types/interfaces";
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
  const { data, error, isLoading, isError } = useQuery<DiscoverSimilarVShows, Error>(["tvShowSimilar", id],
  ()=> getTVShowSimilar(id||""));
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [nameFiltering, genreFiltering]
  );
  const { data :tvShowData, error: tvShowError, isLoading: tvShowIsLoading, isError:tvShowIsError } = useQuery<TVShowT, Error>(["TVShowSimilar", id],
()=> getTVShow(id||"")
);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  if (tvShowIsLoading) {
    return <Spinner />;
  }

  if (tvShowIsError) {
    return <h1>{tvShowError.message}</h1>;
  }

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "name"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const tvShows = data ? data.results : [];
  const displayedTVShows = filterFunction(tvShows);
  const tvshow = tvShowData as TVShowT
  const name =`TV Shows Similar to  ${tvshow.name}`

  
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