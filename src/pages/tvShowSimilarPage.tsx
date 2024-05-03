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
import { keepPreviousData,useQuery } from "@tanstack/react-query";
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
  /*const { data, error, isLoading, isError } = useQuery<DiscoverSimilarVShows, Error>(["tvShowSimilar", id],
  ()=> getTVShowSimilar(id||""));*/
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [nameFiltering, genreFiltering]
  );
  /*const { data :tvShowData, error: tvShowError, isLoading: tvShowIsLoading, isError:tvShowIsError } = useQuery<TVShowT, Error>(["TVShowSimilar", id],
()=> getTVShow(id||"")
);*/




const [page, setPage] = React.useState(1)


const { isPending, isError, error, data, isFetching, isPlaceholderData } =
  useQuery({
    queryKey: ['tvShowSimilar', page],
    queryFn: () => getTVShowSimilar(id||"",page),
    placeholderData: keepPreviousData,
  })



  const { isPending: tvShowIsPending, isError: tvShowIsError, error : tvShowError, data :tvShowData, isFetching: tvShowIsFetching, isPlaceholderData :tvShowPlacheHolderDate } =
  useQuery({
    queryKey: ['personDetails'],
    queryFn: () => getTVShow(id||""),
    
  })



  if (isFetching) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  if (tvShowIsFetching) {
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
    <div>
    {isPending ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error}</div>
      ) : (
        <div>
      <PageTemplate
        title={name }
        tvShows={displayedTVShows}
        action={(tvshow: BaseTVShow) => {
          return <AddToFavouritesIcon {...tvshow} />
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
export default PersonTVShowsPage;