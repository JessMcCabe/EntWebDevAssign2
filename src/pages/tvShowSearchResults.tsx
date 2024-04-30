import React from "react";
import PageTemplate from "../components/templateTVShowPeopleListPage";
import { getTVShowSearch } from "../api/tmdb-api";
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

const TVShowSearchResultsPage :  React.FC = () => {
  const { query } = useParams();
  console.log("Query is in serach page:");
  console.log(query);
  const { data, error, isLoading, isError } = useQuery<DiscoverTVShows, Error>(["searchTVShow", query],
  ()=> getTVShowSearch(query||""));
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [nameFiltering, genreFiltering]
  );
  
console.log("Query is:");
console.log(query);
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
  
  const name =`Search Results For "${query}"`

  
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
export default TVShowSearchResultsPage;