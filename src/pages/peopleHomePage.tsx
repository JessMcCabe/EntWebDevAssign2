import React from "react";
import PageTemplate from "../components/templatePeopleListPage";
import { getActors } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import PersonFilterUI, {
  nameFilter
  
} from "../components/peopleFilterUI";
//import { DiscoverPeople } from "../types/interfaces";
import { BasePerson } from "../types/interfaces";
import { keepPreviousData,useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavouritePerson'


const nameFiltering = {
  name: "name",
  value: "",
  condition: nameFilter,
};


const PeopleHomePage = () => {
  //const { data, error, isLoading, isError } = useQuery<DiscoverPeople, Error>("people", getActors);

  const [page, setPage] = React.useState(1)
  
  const { isPending, isError, error, data, isFetching } =
  useQuery({
    queryKey: ['people', page],
    queryFn: () => getActors(page),
    placeholderData: keepPreviousData,
  })


  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    
    [nameFiltering]
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

  const people = data ? data.results : [];
  const displayedPeople = filterFunction(people);


  
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
        title="Discover People"
        people={displayedPeople}
        action={(people: BasePerson) => {
          return <AddToFavouritesIcon {...people} />
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
      
      <PersonFilterUI
        onFilterValuesChange={changeFilterValues}
        nameFilter={filterValues[0].value}
        
      />
    </>
  );
};
export default PeopleHomePage;