import React from "react";
import PageTemplate from "../components/templatePeopleListPage";
import { getActors } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import PersonFilterUI, {
  nameFilter
  
} from "../components/peopleFilterUI";
import { DiscoverPeople } from "../types/interfaces";
import { BasePerson } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavouritePerson'


const nameFiltering = {
  name: "name",
  value: "",
  condition: nameFilter,
};


const PeopleHomePage = (props: any) => {
  const { data, error, isLoading, isError } = useQuery<DiscoverPeople, Error>("people", getActors);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [nameFiltering]
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

  const people = data ? data.results : [];
  const displayedPeople = filterFunction(people);


  
  return (
    <>
      <PageTemplate
        title="Discover People"
        people={displayedPeople}
        action={(people: BasePerson) => {
          return <AddToFavouritesIcon {...people} />
        }}
      />
      <PersonFilterUI
        onFilterValuesChange={changeFilterValues}
        nameFilter={filterValues[0].value}
        
      />
    </>
  );
};
export default PeopleHomePage;