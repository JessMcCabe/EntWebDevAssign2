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
  /*const { data, error, isLoading, isError } = useQuery<DiscoverPersonTVShows, Error>(["tvShowPerson", id],
  ()=> getTVShowsForPerson(id||""));*/
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [nameFiltering, genreFiltering]
  );
 /* const { data :personData, error: personError, isLoading: personIsLoading, isError:personIsError } = useQuery<PersonT, Error>(["personDetailsTV", id],
()=> getPerson(id||"")
);
*/

const [page, setPage] = React.useState(1)


const { isPending, isError, error, data, isFetching, isPlaceholderData } =
  useQuery({
    queryKey: ['tvShowPerson', page],
    queryFn: () => getTVShowsForPerson(id||"",page),
    placeholderData: keepPreviousData,
  })



  const { isPending: personIsPending, isError: isPersonError, error : personError, data :personData, isFetching: personIsFetching, isPlaceholderData :personPlacheHolderDate } =
  useQuery({
    queryKey: ['personDetails'],
    queryFn: () => getPerson(id||""),
    
  })







  if (isFetching) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  if (personIsFetching) {
    return <Spinner />;
  }

  if (isPersonError) {
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