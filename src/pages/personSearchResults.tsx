import React from "react";
import PageTemplate from "../components/templatePeopleListPage";
import { getPersonSearch } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import TVShowFilterUI, {
  nameFilter,
  
} from "../components/peopleFilterUI";
import { DiscoverPeople } from "../types/interfaces";
import { BasePerson } from "../types/interfaces";
import { useQuery } from "react-query";
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
  console.log("Query is in serach page:");
  console.log(query);
  const { data, error, isLoading, isError } = useQuery<DiscoverPeople, Error>(["searchPerson", query],
  ()=> getPersonSearch(query||""));
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [nameFiltering]
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

  const people = data ? data.results : [];
  const displayedPeople = filterFunction(people);
  
  const name =`Search Results For "${query}"`

  
  return (
    <>
      <PageTemplate
        title={name }
        people={displayedPeople}
        action={(person: BasePerson) => {
          return <AddToFavouritesIcon {...person} />
        }}
      />
      <TVShowFilterUI
        onFilterValuesChange={changeFilterValues}
        nameFilter={filterValues[0].value}
        
      />
    </>
  );
};
export default PersonSearchResultsPage;