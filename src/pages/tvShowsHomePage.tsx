import React from "react";
import PageTemplate from "../components/templateTVShowListPage";
import { getTVShows } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import TVShowFilterUI, {
  nameFilter,
  genreFilter,
} from "../components/tvShowFilterUI";
//import { DiscoverTVShows } from "../types/interfaces";
import { BaseTVShow } from "../types/interfaces";
import { keepPreviousData,useQuery } from "@tanstack/react-query";
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

const HomePage = () => {
  //const { data, error, isLoading, isError } = useQuery<DiscoverTVShows, Error>("tvhome", getTVShows);

  const [page, setPage] = React.useState(1)


  const { isPending, isError, error, data, isFetching} =
  useQuery({
    queryKey: ['tvhome', page],
    queryFn: () => getTVShows(page),
    placeholderData: keepPreviousData,
  })
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
 
    [nameFiltering, genreFiltering]
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
      type === "name"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const tvShows = data ? data.results : [];
  const displayedTVShows = filterFunction(tvShows);


  
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
        title="Discover TV Shows"
        tvShows={displayedTVShows}
        action={(tvshow: BaseTVShow) => {
          return <AddToFavouritesIcon genres={[]} {...tvshow} />
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
      <TVShowFilterUI
        onFilterValuesChange={changeFilterValues}
        nameFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};
export default HomePage;