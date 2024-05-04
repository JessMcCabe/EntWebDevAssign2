import React from "react";
import PageTemplate from "../components/templatePeopleListPage";
import { getPersonSearch } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import TVShowFilterUI, {
  nameFilter,
  
} from "../components/peopleFilterUI";
//import { DiscoverPeople } from "../types/interfaces";
import { BasePerson } from "../types/interfaces";
import { keepPreviousData,useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavouritePerson'
import { useParams } from "react-router-dom";

const nameFiltering = {
  name: "name",
  value: "",
  condition: nameFilter,
};


const PersonSearchResultsPage :  React.FC = () => {
  const { query } = useParams();
  console.log("Query is in search page:");
  console.log(query);
  //const { data, error, isLoading, isError } = useQuery<DiscoverPeople, Error>(["searchPerson", query],
  //()=> getPersonSearch(query||""));

  const [page, setPage] = React.useState(1)
  
  const { isPending, isError, error, data, isFetching } =
  useQuery({
    queryKey: ['searchPerson', page],
    queryFn: () => getPersonSearch(query||"", page),
    placeholderData: keepPreviousData,
    
  })




  const { filterValues, setFilterValues, filterFunction } = useFiltering(
 
    [nameFiltering]
  );
  
console.log("Query is:");
console.log(query);
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
  
  const name =`Search Results For "${query}"`

  
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
        people={displayedPeople}
        action={(person: BasePerson) => {
          return <AddToFavouritesIcon {...person} />
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
        
      />
    </>
  );
};
export default PersonSearchResultsPage;