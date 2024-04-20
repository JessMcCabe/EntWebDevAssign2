import React from "react";
import PageTemplate from "../components/templateTVShowListPage";
import { getTVShows } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import TVShowFilterUI, {
  nameFilter,
  genreFilter,
} from "../components/tvShowFilterUI";
import { DiscoverTVShows } from "../types/interfaces";
import { BaseTVShow } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavouriteTVShow'


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

const HomePage = (props: any) => {
  const { data, error, isLoading, isError } = useQuery<DiscoverTVShows, Error>("discover", getTVShows);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [nameFiltering, genreFiltering]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
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


  
  return (
    <>
      <PageTemplate
        title="Discover TV Shows"
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
export default HomePage;